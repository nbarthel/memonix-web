# External Context Integration Architecture

## Overview

This document outlines the technical architecture for adding context7-like features to Memoist, enabling documentation indexing, codebase semantic search, and reference management alongside the existing memory graph.

**Goal**: Expand Memoist from "memory-only" to "memory + external context" while maintaining universal AI tool compatibility and privacy-first approach.

---

## Phase 2 Feature Set

### 1. Documentation Indexing
Index external documentation (React docs, Tailwind, company wikis) for semantic search alongside memories.

### 2. Codebase Semantic Search
Create semantic index of user's codebase to find similar code patterns and provide context-aware suggestions.

### 3. Reference Management
Lightweight bookmark system with context snippets and semantic search across saved URLs.

---

## Architecture Principles

1. **Unified Query Interface**: Single MCP query returns results from memories, docs, codebase, and references
2. **Pluggable Backends**: Same backend architecture (SQLite/Kuzu/Supabase) supports all content types
3. **Privacy-First**: Free tier keeps everything local, Pro tier optional cloud sync
4. **Token Budget Aware**: Automatically optimize results to fit within AI context windows
5. **Incremental Indexing**: Background processes, non-blocking UI, graceful degradation

---

## Data Model Extensions

### Current MemoryNode Schema

```python
@dataclass
class MemoryNode:
    id: str
    content: str
    node_type: Literal["fact", "procedure", "preference", "pattern"]
    embedding: np.ndarray
    importance: float
    created_at: datetime
    updated_at: datetime
    access_count: int
    metadata: Dict[str, Any]
```

### Extended Schema (Phase 2)

```python
@dataclass
class MemoryNode:
    id: str
    content: str
    node_type: Literal[
        "fact", "procedure", "preference", "pattern",
        "doc_section",      # NEW: Documentation section
        "code_block",       # NEW: Code from codebase index
        "reference"         # NEW: Saved URL/bookmark
    ]
    embedding: np.ndarray
    importance: float
    created_at: datetime
    updated_at: datetime
    access_count: int

    # NEW: Source metadata
    source_type: Optional[Literal["memory", "documentation", "codebase", "reference"]]
    source_url: Optional[str]           # URL for docs/references
    source_file_path: Optional[str]     # File path for code blocks
    source_line_range: Optional[Tuple[int, int]]  # Line numbers for code

    # NEW: Indexing metadata
    indexed_at: Optional[datetime]
    last_refreshed: Optional[datetime]
    refresh_interval: Optional[Literal["never", "daily", "weekly", "monthly"]]

    # NEW: Documentation-specific
    doc_source_name: Optional[str]      # "React Docs", "Tailwind CSS", etc.
    doc_section_hierarchy: Optional[List[str]]  # ["Hooks", "useEffect"]

    # NEW: Code-specific
    code_language: Optional[str]        # "typescript", "python", etc.
    code_ast_type: Optional[str]        # "function", "class", "component"
    code_function_name: Optional[str]

    # Existing
    metadata: Dict[str, Any]
```

### Database Schema (SQLite)

```sql
-- Existing memories table (unchanged)
CREATE TABLE IF NOT EXISTS memories (
    id TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    node_type TEXT NOT NULL,
    embedding BLOB NOT NULL,
    importance REAL NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    access_count INTEGER DEFAULT 0,
    metadata TEXT  -- JSON
);

-- NEW: Extended source metadata table
CREATE TABLE IF NOT EXISTS memory_sources (
    memory_id TEXT PRIMARY KEY REFERENCES memories(id) ON DELETE CASCADE,
    source_type TEXT,  -- memory, documentation, codebase, reference
    source_url TEXT,
    source_file_path TEXT,
    source_line_start INTEGER,
    source_line_end INTEGER,
    indexed_at TIMESTAMP,
    last_refreshed TIMESTAMP,
    refresh_interval TEXT,
    doc_source_name TEXT,
    doc_section_hierarchy TEXT,  -- JSON array
    code_language TEXT,
    code_ast_type TEXT,
    code_function_name TEXT
);

CREATE INDEX IF NOT EXISTS idx_source_type ON memory_sources(source_type);
CREATE INDEX IF NOT EXISTS idx_source_url ON memory_sources(source_url);
CREATE INDEX IF NOT EXISTS idx_source_file_path ON memory_sources(source_file_path);
CREATE INDEX IF NOT EXISTS idx_doc_source_name ON memory_sources(doc_source_name);

-- NEW: Documentation sources registry
CREATE TABLE IF NOT EXISTS documentation_sources (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,              -- "React Docs"
    url TEXT NOT NULL,                -- "https://react.dev"
    enabled BOOLEAN DEFAULT TRUE,
    last_indexed TIMESTAMP,
    refresh_interval TEXT DEFAULT 'never',
    max_depth INTEGER DEFAULT 3,
    include_code_examples BOOLEAN DEFAULT TRUE,
    total_sections INTEGER DEFAULT 0,
    total_size_bytes INTEGER DEFAULT 0
);

-- NEW: Codebase index registry
CREATE TABLE IF NOT EXISTS codebase_indices (
    id TEXT PRIMARY KEY,
    workspace_path TEXT NOT NULL,
    enabled BOOLEAN DEFAULT TRUE,
    last_indexed TIMESTAMP,
    total_files INTEGER DEFAULT 0,
    total_code_blocks INTEGER DEFAULT 0,
    excluded_patterns TEXT,          -- JSON array of glob patterns
    file_types TEXT                  -- JSON array of extensions
);

-- NEW: Reference bookmarks
CREATE TABLE IF NOT EXISTS references (
    id TEXT PRIMARY KEY,
    url TEXT NOT NULL,
    title TEXT,
    description TEXT,
    tags TEXT,                       -- JSON array
    context_note TEXT,               -- User's note about why this is important
    favicon_url TEXT,
    created_at TIMESTAMP NOT NULL,
    accessed_count INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_reference_url ON references(url);
CREATE INDEX IF NOT EXISTS idx_reference_tags ON references(tags);
```

---

## MCP API Extensions

### New MCP Methods

```typescript
// ============================================
// Documentation Indexing
// ============================================

interface IndexDocsRequest {
    source: "url" | "local";
    path: string;                    // URL or local file path
    options?: {
        name?: string;               // Display name (auto-detected if not provided)
        refresh_interval?: "never" | "daily" | "weekly" | "monthly";
        max_depth?: number;          // How deep to crawl (default: 3)
        include_code_examples?: boolean;
        exclude_patterns?: string[]; // URL patterns to skip
    };
}

interface IndexDocsResponse {
    source_id: string;
    name: string;
    sections_indexed: number;
    total_size_bytes: number;
    indexing_duration_ms: number;
}

/**
 * Index external documentation for semantic search.
 *
 * Example:
 *   memory_index_docs({
 *     source: "url",
 *     path: "https://react.dev",
 *     options: { name: "React Docs", refresh_interval: "weekly" }
 *   })
 */
async memory_index_docs(request: IndexDocsRequest): Promise<IndexDocsResponse>;

/**
 * Query indexed documentation alongside memories.
 *
 * Returns unified results from both memory graph and documentation indices.
 */
interface QueryDocsRequest {
    query: string;
    sources?: string[];              // Filter by doc source names
    k?: number;                      // Max results per source (default: 5)
    include_memories?: boolean;      // Also search memories (default: true)
}

interface QueryDocsResult {
    memories: Array<{
        node: MemoryNode;
        relevance: number;
    }>;
    docs: Array<{
        content: string;
        source_name: string;
        url: string;
        section_hierarchy: string[];
        relevance: number;
    }>;
    total_results: number;
    query_duration_ms: number;
}

async memory_query_docs(request: QueryDocsRequest): Promise<QueryDocsResult>;

/**
 * List all indexed documentation sources.
 */
interface ListDocsSourcesResponse {
    sources: Array<{
        id: string;
        name: string;
        url: string;
        enabled: boolean;
        last_indexed: string | null;
        total_sections: number;
    }>;
}

async memory_list_doc_sources(): Promise<ListDocsSourcesResponse>;

/**
 * Remove a documentation source and all its indexed sections.
 */
async memory_remove_doc_source(source_id: string): Promise<{ success: boolean }>;

/**
 * Refresh an indexed documentation source.
 */
async memory_refresh_doc_source(source_id: string): Promise<IndexDocsResponse>;

// ============================================
// Codebase Semantic Indexing
// ============================================

interface IndexCodebaseRequest {
    workspace_path: string;
    options?: {
        exclude?: string[];          // Glob patterns (node_modules, .git, etc.)
        file_types?: string[];       // [".ts", ".tsx", ".py", etc.]
        max_file_size?: number;      // Bytes (default: 1MB)
    };
}

interface IndexCodebaseResponse {
    index_id: string;
    workspace_path: string;
    files_indexed: number;
    code_blocks_indexed: number;
    indexing_duration_ms: number;
}

/**
 * Index current workspace codebase for semantic search.
 *
 * Extracts functions, classes, components and creates embeddings.
 * Runs in background, returns immediately with index_id.
 */
async memory_index_codebase(request: IndexCodebaseRequest): Promise<IndexCodebaseResponse>;

/**
 * Find similar code blocks in indexed codebase.
 */
interface FindSimilarCodeRequest {
    code_snippet: string;
    file_types?: string[];           // Filter by language
    k?: number;                      // Max results (default: 5)
    min_similarity?: number;         // 0-1 threshold (default: 0.7)
}

interface SimilarCodeResult {
    file_path: string;
    line_range: [number, number];
    code_content: string;
    function_name?: string;
    language: string;
    ast_type: string;                // "function", "class", "component"
    similarity: number;
}

async memory_find_similar_code(request: FindSimilarCodeRequest): Promise<SimilarCodeResult[]>;

/**
 * Get code context for a specific file/location.
 *
 * Returns relevant code blocks from the same file and related files.
 */
interface GetCodeContextRequest {
    file_path: string;
    line_range?: [number, number];
    context_lines?: number;          // Lines before/after (default: 10)
}

interface CodeContextResult {
    current_file: {
        path: string;
        content: string;
        related_functions: Array<{
            name: string;
            line_range: [number, number];
        }>;
    };
    related_files: Array<{
        path: string;
        reason: string;              // Why this file is related
        relevance: number;
    }>;
}

async memory_get_code_context(request: GetCodeContextRequest): Promise<CodeContextResult>;

/**
 * Update codebase index incrementally (on file save).
 */
async memory_update_code_file(file_path: string): Promise<{ updated: boolean }>;

// ============================================
// Reference Management
// ============================================

interface AddReferenceRequest {
    url: string;
    options?: {
        title?: string;              // Auto-fetched if not provided
        context?: string;            // User's note about why this matters
        tags?: string[];
    };
}

interface ReferenceNode {
    id: string;
    url: string;
    title: string;
    description?: string;
    tags: string[];
    context_note?: string;
    favicon_url?: string;
    created_at: string;
    accessed_count: number;
}

async memory_add_reference(request: AddReferenceRequest): Promise<ReferenceNode>;

/**
 * Query saved references semantically.
 */
interface QueryReferencesRequest {
    query: string;
    tags?: string[];                 // Filter by tags
    k?: number;                      // Max results (default: 10)
}

async memory_query_references(request: QueryReferencesRequest): Promise<ReferenceNode[]>;

/**
 * Link a reference to a memory node.
 */
async memory_link_reference(reference_id: string, memory_id: string): Promise<{ success: boolean }>;

// ============================================
// Unified Context Assembly (Phase 3)
// ============================================

interface AssembleContextRequest {
    task: string;                    // Description of what user is doing
    options?: {
        max_tokens?: number;         // Budget (default: 4000)
        sources?: Array<"memories" | "docs" | "codebase" | "references">;
        prioritize?: "recency" | "importance" | "relevance";
    };
}

interface ContextBundle {
    memories: Array<{
        node: MemoryNode;
        relevance: number;
        token_count: number;
    }>;
    docs: Array<{
        content: string;
        source_name: string;
        url: string;
        relevance: number;
        token_count: number;
    }>;
    code: Array<{
        file_path: string;
        line_range: [number, number];
        content: string;
        relevance: number;
        token_count: number;
    }>;
    references: Array<{
        url: string;
        title: string;
        snippet: string;
        relevance: number;
        token_count: number;
    }>;
    total_tokens: number;
    assembly_strategy: string;
    sources_queried: string[];
}

/**
 * Automatically assemble optimal context from all sources.
 *
 * Pro-only feature. Queries memories, docs, codebase, and references
 * in parallel, ranks by relevance, deduplicates, and optimizes for
 * token budget.
 */
async memory_assemble_context(request: AssembleContextRequest): Promise<ContextBundle>;
```

---

## Implementation Architecture

### Component Structure

```
memoist-cloud/
├── memoist/
│   ├── graph/
│   │   ├── backend_base.py           # Existing
│   │   ├── backends/
│   │   │   ├── sqlite_backend.py     # Extended for new tables
│   │   │   ├── kuzu_backend.py       # Extended for new node types
│   │   │   └── supabase_backend.py   # Extended for cloud sync
│   │   └── memory_node.py            # Extended MemoryNode dataclass
│   │
│   ├── indexing/                     # NEW: Indexing subsystem
│   │   ├── __init__.py
│   │   ├── docs/
│   │   │   ├── crawler.py            # Web crawler for documentation
│   │   │   ├── parser.py             # HTML → Markdown + chunking
│   │   │   └── indexer.py            # Create embeddings, store in DB
│   │   ├── codebase/
│   │   │   ├── scanner.py            # File system scanner
│   │   │   ├── ast_parser.py         # Language-specific AST parsing
│   │   │   ├── embedder.py           # Code → embeddings
│   │   │   └── indexer.py            # Store code blocks in DB
│   │   └── references/
│   │       ├── fetcher.py            # Fetch URL metadata (title, OG)
│   │       └── manager.py            # CRUD for references
│   │
│   ├── query/                        # NEW: Unified query layer
│   │   ├── __init__.py
│   │   ├── unified_search.py         # Query across all sources
│   │   ├── relevance_scorer.py       # Rank and deduplicate results
│   │   ├── token_optimizer.py        # Fit results within budget
│   │   └── context_assembler.py      # Phase 3: Smart assembly
│   │
│   └── mcp/
│       ├── server.py                 # Extended with new MCP methods
│       └── handlers/                 # NEW: Method handlers
│           ├── docs_handlers.py
│           ├── codebase_handlers.py
│           ├── reference_handlers.py
│           └── context_handlers.py
```

### Indexing Pipeline

```
Documentation Indexing Flow:
1. User triggers: memory_index_docs("https://react.dev")
2. Crawler fetches pages (respect robots.txt, rate limits)
3. Parser converts HTML → clean Markdown
4. Chunker splits into sections (respecting hierarchy)
5. Embedder generates vectors for each section
6. Indexer stores in memory_sources table with source_type="documentation"
7. Return summary to user

Codebase Indexing Flow:
1. User opens workspace OR file save event
2. Scanner walks file tree (respecting .gitignore, exclude patterns)
3. AST parser extracts functions/classes/components per language
4. Embedder generates vectors for each code block
5. Indexer stores in memory_sources with source_type="codebase"
6. Incremental updates on file save (background process)

Reference Flow:
1. User adds: memory_add_reference("https://stackoverflow.com/...")
2. Fetcher gets metadata (title, description, Open Graph)
3. Embedder generates vector for title + description + context note
4. Store in references table + memory_sources
```

### Query Pipeline

```
Unified Query Flow (memory_query_docs or memory_assemble_context):
1. User query: "How do I use useEffect?"
2. Embed query text
3. Parallel queries:
   - memories table (source_type IS NULL OR 'memory')
   - memory_sources WHERE source_type = 'documentation'
   - memory_sources WHERE source_type = 'codebase'
   - references table
4. Relevance scorer ranks all results
5. Deduplicator removes overlapping content
6. Token optimizer fits within budget (if specified)
7. Return unified ContextBundle
```

---

## Backend Adapter Extensions

### SQLite Backend

**Advantages for Phase 2**:
- Concurrent access (multiple VS Code windows)
- Zero dependencies (Python stdlib)
- Fast for <50K nodes
- Good enough vector search with BLOB embeddings

**New Tables**:
- `memory_sources` (source metadata)
- `documentation_sources` (doc source registry)
- `codebase_indices` (workspace index registry)
- `references` (bookmarks)

**Vector Search**:
```python
# Existing cosine similarity via numpy
def find_similar_nodes(self, embedding: np.ndarray, source_types: List[str] = None, k: int = 10):
    query = """
        SELECT m.id, m.content, m.embedding, m.node_type,
               s.source_type, s.source_url, s.source_file_path
        FROM memories m
        LEFT JOIN memory_sources s ON m.id = s.memory_id
        WHERE (? IS NULL OR s.source_type IN (?))
    """
    # Compute cosine similarity in Python
    # Still fast for <50K nodes
```

### Kuzu Backend (Advanced)

**When to use**:
- Large codebases (>50K code blocks)
- Complex graph queries (e.g., "find code that calls function X and uses pattern Y")

**Graph Schema**:
```cypher
// Existing
CREATE NODE TABLE Memory(
    id STRING, content STRING, embedding DOUBLE[],
    node_type STRING, importance DOUBLE, PRIMARY KEY(id)
);

// NEW: Node types for external content
CREATE NODE TABLE DocSection(
    id STRING, content STRING, embedding DOUBLE[],
    source_name STRING, url STRING, section_hierarchy STRING[], PRIMARY KEY(id)
);

CREATE NODE TABLE CodeBlock(
    id STRING, content STRING, embedding DOUBLE[],
    file_path STRING, line_range INT64[], language STRING, PRIMARY KEY(id)
);

CREATE NODE TABLE Reference(
    id STRING, url STRING, title STRING, tags STRING[], PRIMARY KEY(id)
);

// Relationships
CREATE REL TABLE LINKS(FROM Memory TO Memory);
CREATE REL TABLE REFERENCES_DOC(FROM Memory TO DocSection);
CREATE REL TABLE SIMILAR_CODE(FROM Memory TO CodeBlock, similarity DOUBLE);
CREATE REL TABLE CITES(FROM Memory TO Reference);
```

**Cypher Queries**:
```cypher
// Find memories + related documentation
MATCH (m:Memory)-[:REFERENCES_DOC]->(d:DocSection)
WHERE vector_similarity(m.embedding, $query_embedding) > 0.7
RETURN m, d
ORDER BY vector_similarity(m.embedding, $query_embedding) DESC
LIMIT 10;

// Find code that matches a pattern
MATCH (m:Memory)-[:SIMILAR_CODE]->(c:CodeBlock)
WHERE c.language = 'typescript' AND c.file_path CONTAINS 'components'
RETURN c.file_path, c.line_range, c.content
ORDER BY similarity DESC;
```

### Supabase Backend (Pro Tier)

**Cloud Storage**:
- Same PostgreSQL schema as SQLite
- pgvector extension for vector search
- Row-level security for multi-tenancy

**Sync Strategy**:
```typescript
// Free tier: Local SQLite only
// Pro tier: Bidirectional sync

1. Local changes → Queue for upload
2. Background sync every 5 minutes (when idle)
3. Conflict resolution: Last-write-wins with timestamps
4. Full sync on workspace switch
```

---

## Privacy & Security

### Free Tier
- **All data local**: SQLite database in `~/.memoist/` or `.claude/memory.db`
- **No cloud uploads**: Documentation, codebase, references stay on device
- **Embeddings**: Generated locally (sentence-transformers) or via API (user's choice)

### Pro Tier
- **Optional cloud sync**: User explicitly enables
- **Encryption in transit**: TLS for all API calls
- **Encryption at rest**: AES-256 for sensitive content in Supabase
- **Selective sync**: User chooses what to sync (e.g., memories yes, codebase no)

### Sensitive Content
- **Code scanning**: Detect API keys, tokens, passwords before indexing
- **Exclusion patterns**: Auto-exclude `.env`, `credentials.json`, etc.
- **User confirmation**: Prompt before indexing files with secrets

---

## Performance Considerations

### Documentation Indexing

**Challenges**:
- Large sites (React docs = 500+ pages)
- Rate limiting (respect server load)
- Storage size (embeddings = 384 floats × 4 bytes = 1.5KB per section)

**Solutions**:
- Incremental indexing (index top-level first, deep dive on-demand)
- Compression (quantize embeddings to float16 or int8)
- Caching (store rendered Markdown, avoid re-fetching)
- Background processing (non-blocking, show progress)

**Limits**:
- Free: 5 documentation sources, 10MB total, max 5,000 sections
- Pro: Unlimited sources, 500MB total, auto-cleanup old docs

### Codebase Indexing

**Challenges**:
- Large repos (100K+ files)
- Frequent changes (file saves trigger re-indexing)
- Language-specific parsing (TypeScript vs Python vs Rust)

**Solutions**:
- Smart filtering (ignore generated files, tests, node_modules)
- Incremental updates (only re-index changed files)
- Debouncing (wait 2 seconds after last save before indexing)
- Lazy indexing (index imports first, full repo on-demand)

**Limits**:
- Free: Current workspace only, 50MB code, 1,000 code blocks
- Pro: Multiple workspaces, 500MB per workspace, unlimited blocks

### Query Performance

**Target**: <500ms for unified query (memories + docs + code + references)

**Optimizations**:
- Parallel queries (concurrent database reads)
- Early termination (stop after k results per source)
- Result caching (cache query embeddings for 1 minute)
- Approximate nearest neighbors (HNSW index for Kuzu/Supabase)

---

## Rollout Plan

### Month 2: Documentation Indexing MVP

**Scope**:
- Crawl and index single documentation site
- Query docs alongside memories
- Basic UI in VS Code (command palette)

**MCP Methods**:
- `memory_index_docs`
- `memory_query_docs`
- `memory_list_doc_sources`

**Limits**:
- Free: 3 documentation sources, 5MB
- Pro: 10 sources, 50MB

**Success Criteria**:
- 30% of users index at least one doc source
- Query latency <500ms for 1,000 sections
- Positive user feedback on relevance

### Month 3: Codebase Semantic Search

**Scope**:
- Index current workspace automatically
- Find similar code patterns
- Incremental updates on file save

**MCP Methods**:
- `memory_index_codebase`
- `memory_find_similar_code`
- `memory_get_code_context`

**Limits**:
- Free: Current workspace, 50MB, 1,000 blocks
- Pro: 3 workspaces, 200MB per workspace

**Success Criteria**:
- 50% of users enable codebase indexing
- Index time <30 seconds for typical project (1,000 files)
- 80%+ relevant results for "find similar code" queries

### Month 4: Reference Management + Unified Query

**Scope**:
- Bookmark URLs with context
- Unified query across all sources
- UI improvements (memory browser shows all content types)

**MCP Methods**:
- `memory_add_reference`
- `memory_query_references`
- Enhanced `memory_query` (now queries all sources)

**Limits**:
- Free: 100 references
- Pro: Unlimited references

**Success Criteria**:
- 40% of users save at least one reference
- Unified query returns relevant results from 2+ sources
- User satisfaction >4/5 stars

---

## Testing Strategy

### Unit Tests

```python
# memoist/indexing/docs/test_crawler.py
def test_crawl_documentation():
    crawler = DocCrawler("https://react.dev")
    pages = crawler.crawl(max_depth=2)
    assert len(pages) > 10
    assert all(page.content for page in pages)

# memoist/indexing/codebase/test_ast_parser.py
def test_extract_typescript_functions():
    code = "function foo() { return 42; }"
    parser = ASTParser("typescript")
    functions = parser.extract_functions(code)
    assert len(functions) == 1
    assert functions[0].name == "foo"

# memoist/query/test_unified_search.py
def test_unified_query_returns_all_sources():
    search = UnifiedSearch(backend)
    results = search.query("useEffect hook")
    assert "memories" in results
    assert "docs" in results
    assert len(results["memories"]) > 0 or len(results["docs"]) > 0
```

### Integration Tests

```python
def test_end_to_end_documentation_indexing():
    # Index React docs
    response = mcp_client.index_docs({
        "source": "url",
        "path": "https://react.dev"
    })
    assert response["sections_indexed"] > 100

    # Query indexed docs
    results = mcp_client.query_docs("useEffect")
    assert len(results["docs"]) > 0
    assert "useEffect" in results["docs"][0]["content"]

def test_end_to_end_codebase_indexing():
    # Index test workspace
    response = mcp_client.index_codebase({
        "workspace_path": "./test_workspace"
    })
    assert response["files_indexed"] > 5

    # Find similar code
    code = "async function fetchData() {}"
    results = mcp_client.find_similar_code(code)
    assert len(results) > 0
    assert results[0]["similarity"] > 0.7
```

### Performance Tests

```python
def test_query_latency_within_budget():
    # Index 1,000 documentation sections
    # Add 1,000 memories
    # Index 1,000 code blocks

    start = time.time()
    results = unified_search.query("test query")
    duration_ms = (time.time() - start) * 1000

    assert duration_ms < 500  # Target: <500ms
    assert len(results["memories"]) + len(results["docs"]) + len(results["code"]) <= 20
```

---

## Migration Path

### Existing Users

1. **No breaking changes**: Existing memories continue to work
2. **Opt-in features**: Documentation/codebase indexing is optional
3. **Backward compatibility**: Old MCP methods unchanged, new methods added
4. **Data migration**: Existing SQLite schema extended with new tables

### Upgrade Path

```typescript
// VS Code extension detects new MCP version
if (mcp_server_version >= "2.0.0") {
    // Show new features notification
    vscode.window.showInformationMessage(
        "New: Index documentation and codebase! Click to learn more.",
        "Learn More", "Index Docs", "Dismiss"
    );
}
```

---

## Future Enhancements (Phase 3+)

### Smart Context Assembly (Month 5-6)

- Automatic relevance ranking across all sources
- Token budget optimization (fit more useful content)
- Deduplication (remove overlapping info from docs + memories)
- Learning from user feedback (boost sources that lead to accepted suggestions)

### Advanced Integrations (Month 7+)

- **API access**: REST + GraphQL for external tools
- **Webhooks**: Notify on new memories/docs
- **IDE plugins**: JetBrains, Vim, Emacs
- **Team features**: Shared documentation indices, team codebase search

### AI-Powered Features (Month 9+)

- **Automatic tagging**: LLM categorizes memories/docs/code
- **Pattern detection**: "You always use X pattern, should I remember that?"
- **Context suggestions**: "You might want to index Y documentation for this task"
- **Code explanation**: LLM-powered summaries of code blocks using indexed context

---

## Open Questions

1. **Embedding Model**: Use sentence-transformers locally (384 dims) or API-based (OpenAI, 1536 dims)?
   - **Recommendation**: Start with sentence-transformers for free tier (privacy + cost), allow API for Pro

2. **Crawling Ethics**: How to respect robots.txt and avoid overloading documentation sites?
   - **Recommendation**: Built-in rate limiting (1 request/second), cache aggressively, provide pre-indexed popular docs

3. **Language Support**: Which languages to support for codebase indexing?
   - **Recommendation**: Phase 1 (TypeScript, JavaScript, Python, Rust), expand based on demand

4. **Cloud Costs**: Supabase Pro tier storage costs for large indices?
   - **Recommendation**: Quota-based (500MB per Pro user), compression, auto-cleanup of stale indices

---

## Success Metrics

### Phase 2 Completion (Month 4)

- ✅ 30% of users index at least one documentation source
- ✅ 50% of users enable codebase indexing
- ✅ 40% of users save at least one reference
- ✅ Unified query latency <500ms
- ✅ Relevance score >4/5 stars from user feedback
- ✅ Zero privacy incidents (no unintended data leaks)

### Business Impact

- ✅ Justifies $8/month pricing (competitive with context7)
- ✅ Reduces churn by 20% (sticky features)
- ✅ Increases conversion by 2% (7% → 9% free-to-Pro)
- ✅ NPS score >40 (promoters > detractors)

---

**Last Updated**: 2025-12-19
**Owner**: Engineering
**Review Cadence**: Monthly
