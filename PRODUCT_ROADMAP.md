# Memoist Product Roadmap

## Vision
Become the definitive context and memory layer for AI coding assistants, combining persistent memory with external knowledge integration.

## Competitive Positioning
- **vs context7**: Works with 9+ AI tools (not just one) + graph-based memory (not just RAG)
- **vs Pieces**: Semantic memory across sessions (not just snippets) + universal compatibility
- **vs Built-in memory**: Persistent across tools + external documentation + codebase awareness

---

## Phase 1: Launch (Current - Month 1)
**Goal**: Establish universal memory platform, reach 1,000 installs

### Core Features
- ✅ Persistent memory graph (facts, procedures, preferences, patterns)
- ✅ Universal AI tool detection (9+ assistants)
- ✅ Semantic search with embeddings
- ✅ Graph relationships (links between memories)
- ✅ Terminal sync (.claude/memory.db)
- ✅ Multi-window support (SQLite backend)

### Pricing
- **Free**: 10K memories, local storage, all AI tools
- **Pro ($8/month)**: Unlimited memories, cloud sync, adaptive learning
- **Founder ($6/month forever)**: First 500 users

### Success Metrics
- 1,000 installs in first month
- 50 Pro conversions (5% rate)
- 4.5+ star rating on VS Code Marketplace

---

## Phase 2: External Context (Months 2-4)
**Goal**: Add context7-like features, justify $8 price point

### Feature 2.1: Documentation Indexing (Month 2)
**Problem**: Developers waste time searching docs repeatedly

**Solution**:
```typescript
// New MCP methods
memory_index_docs(source: "url" | "local", path: string, options?: {
  refresh_interval?: "daily" | "weekly" | "never",
  max_depth?: number,
  include_code_examples?: boolean
})

memory_query_docs(query: string, sources?: string[], k?: number)

memory_link_code_to_docs(code_ref: string, doc_url: string, context: string)
```

**User Experience**:
- Command palette: "Memoist: Index Documentation"
- Auto-suggest common sources (React, Tailwind, Next.js, etc.)
- Query returns: memories + docs in unified results

**Implementation**:
- Crawl documentation sites (respecting robots.txt)
- Extract content, chunk into sections
- Generate embeddings using existing pipeline
- Store in same backend (SQLite/Supabase)

**Limits**:
- Free: 5 documentation sources, 10MB total, manual refresh
- Pro: Unlimited sources, auto-refresh weekly, 500MB total

**Backend Changes**:
```python
# Add to MemoryNode types
node_type: Literal["fact", "procedure", "preference", "pattern", "doc_section", "code_example"]

# Add metadata
source_url: Optional[str]
indexed_at: Optional[datetime]
refresh_interval: Optional[str]
```

### Feature 2.2: Codebase Semantic Index (Month 3)
**Problem**: AI doesn't know your existing code patterns

**Solution**:
```typescript
memory_index_codebase(workspace_path: string, options?: {
  exclude?: string[],  // node_modules, .git, etc.
  file_types?: string[],  // .ts, .tsx, .py, etc.
  max_file_size?: number
})

memory_find_similar_code(code_snippet: string, file_types?: string[], k?: number)

memory_get_code_context(file_path: string, line_range?: [number, number])
```

**User Experience**:
- Auto-index on workspace open (background process)
- Incremental updates on file save
- AI queries: "Find similar error handling in this project"
- Results show: file path, line numbers, similarity score

**Implementation**:
- Parse code into AST (TypeScript, Python, etc.)
- Extract functions, classes, components
- Generate embeddings for code blocks
- Index by file path + line range

**Limits**:
- Free: Current workspace only, 50MB code, 1,000 code blocks
- Pro: Multiple workspaces, 500MB per workspace, unlimited blocks

**Privacy**:
- Free tier: Index stored locally, never uploaded
- Pro tier: Optional cloud index for cross-machine sync

### Feature 2.3: Reference Management (Month 4)
**Problem**: Scattered bookmarks across browsers, no context linkage

**Solution**:
```typescript
memory_add_reference(url: string, options?: {
  title?: string,
  context?: string,  // Why this is important
  tags?: string[],
  importance?: number
})

memory_query_references(query: string, tags?: string[])

memory_link_reference_to_memory(reference_id: string, memory_id: string)
```

**User Experience**:
```
// In VS Code chat
User: "Remember this article about React Server Components"
      https://vercel.com/blog/...

Memoist: ✅ Saved reference
         📎 React Server Components Best Practices
         🏷️  react, server-components, architecture

// Later...
AI: "Based on the Vercel article you saved about RSC..."
```

**Implementation**:
- Fetch URL metadata (title, description, Open Graph)
- Extract key snippets using LLM summarization
- Store lightweight reference (< 5KB per URL)
- Link to related memories

**Limits**:
- Free: 100 references
- Pro: Unlimited references, auto-categorization

---

## Phase 3: Adaptive Context (Months 5-6)
**Goal**: Make Pro tier essential, reduce churn to <5%

### Feature 3.1: Smart Context Assembly (Month 5)
**Problem**: Developers manually search for relevant context

**Solution**:
```typescript
memory_assemble_context(task: string, options?: {
  max_tokens?: number,  // Default: 4000
  sources?: ("memories" | "docs" | "codebase" | "references")[],
  prioritize?: "recency" | "importance" | "relevance"
}): ContextBundle

interface ContextBundle {
  memories: Array<{node: MemoryNode, relevance: number}>,
  docs: Array<{section: string, url: string, relevance: number}>,
  code: Array<{file: string, lines: string, relevance: number}>,
  references: Array<{url: string, snippet: string, relevance: number}>,
  total_tokens: number,
  assembly_strategy: string
}
```

**User Experience**:
```typescript
// Auto-triggered when AI assistant starts responding
// Invisible to user, just better responses

Context Assembly for "Add user authentication":
├─ Memories (3)
│  ├─ "We use Supabase for auth" (rel: 0.95)
│  ├─ "JWT in httpOnly cookies" (rel: 0.89)
│  └─ "Error handling pattern" (rel: 0.72)
├─ Codebase (2)
│  ├─ src/auth/login.tsx (lines 45-89) (rel: 0.91)
│  └─ src/api/auth.ts (lines 12-34) (rel: 0.85)
├─ Documentation (2)
│  ├─ Supabase Auth Methods (rel: 0.93)
│  └─ Next.js Middleware (rel: 0.78)
└─ References (1)
   └─ "Auth security best practices" (rel: 0.81)

Total: 3,247 tokens | Strategy: Importance-weighted + recency boost
```

**Implementation**:
- Embed the task description
- Query all sources in parallel
- Score by relevance + importance + recency
- Deduplicate overlapping information
- Optimize for token budget
- Return ranked, ready-to-use context

**Pro-Only Feature**:
- Free tier: Manual search only
- Pro tier: Automatic assembly, background process
- Value: "Saves 10 minutes per hour = $8/month pays for itself"

### Feature 3.2: Learning from Usage (Month 6)
**Problem**: Static memory doesn't improve over time

**Solution**:
```typescript
memory_learn_from_interaction(interaction: {
  query: string,
  context_used: string[],  // Which memories/docs were retrieved
  outcome: "accepted" | "rejected" | "modified",
  user_feedback?: string
})

memory_suggest_new_patterns(workspace: string)
```

**User Experience**:
```
// AI suggests code pattern
AI: "I'll use async/await based on your previous preferences"

// User accepts or modifies
User: [Accepts]

// Memoist learns
Memoist: ✅ Strengthened memory: "Prefer async/await"
         📈 Confidence: 0.75 → 0.85

// After 2 weeks
Memoist: 💡 Detected pattern
         "You always add error logging in catch blocks"
         Should I remember this as a preference?
         [Yes] [No] [Customize]
```

**Implementation**:
- Track which memories led to accepted suggestions
- Increase importance scores for useful memories
- Decrease for rejected suggestions
- Detect repeated patterns using frequency analysis
- Suggest codifying as permanent preferences

**Pro-Only Feature**:
- Free tier: Static memories
- Pro tier: Adaptive learning + pattern detection
- Value: "Your AI gets smarter over time"

---

## Phase 4: Team & Enterprise (Months 7-12)
**Goal**: Launch Pro+ tier at $15/month, enterprise at custom pricing

### Feature 4.1: Team Memory Sharing
**Problem**: Teams lose context across members

**Solution**:
- Shared team memory graph
- Role-based access (read, write, admin)
- Conflict resolution for concurrent edits
- Team-wide documentation indexes

**Pricing**: Pro+ at $15/month per seat (min 3 seats)

### Feature 4.2: Admin Dashboard
- Memory usage analytics
- Team member activity
- Cost tracking (API calls, storage)
- Audit logs

### Feature 4.3: Integrations
- **API access**: REST + GraphQL
- **Webhooks**: Memory created/updated events
- **Slack**: Memory search bot
- **Linear/Jira**: Link memories to tickets

### Feature 4.4: Enterprise Features
- Self-hosted option (on-premise deployment)
- SSO/SAML authentication
- Custom SLA
- Dedicated support channel
- Custom retention policies

**Pricing**: Contact sales, $50-200/seat/month depending on scale

---

## Technical Architecture Evolution

### Current (Phase 1)
```
VS Code Extension
    ↓ (stdio/HTTP)
MCP Server (Python)
    ↓
Graph Backend (SQLite/Kuzu/Supabase)
    ↓
Embedding Model (local or API)
```

### Phase 2 (Documentation + Codebase)
```
VS Code Extension
    ↓ (stdio/HTTP)
MCP Server (Python)
    ↓
┌─────────────┬────────────────┬──────────────┐
│   Memory    │  Documentation │   Codebase   │
│   Graph     │     Index      │    Index     │
│  (existing) │    (new)       │    (new)     │
└─────────────┴────────────────┴──────────────┘
         ↓
   Unified Query Layer (vector search + graph traversal)
         ↓
   Graph Backend (SQLite/Kuzu/Supabase)
```

### Phase 3 (Smart Assembly)
```
VS Code Extension
    ↓
Context Assembler (new)
    ↓
┌─────────┬──────┬──────────┬────────────┐
│ Memory  │ Docs │ Codebase │ References │
└─────────┴──────┴──────────┴────────────┘
         ↓
   Relevance Scorer + Deduplicator
         ↓
   Token Budget Optimizer
         ↓
   Ranked Context Bundle
```

---

## Revenue Projections

### Year 1 (Phases 1-3)
**Month 3**: 3,000 installs, 90 Pro ($8), **$720 MRR**
**Month 6**: 10,000 installs, 500 Pro ($8), **$4,000 MRR**
**Month 12**: 25,000 installs, 1,750 Pro ($8), **$14,000 MRR** → **$168K ARR**

### Year 2 (Phase 4 + Growth)
**Month 18**: 60,000 installs, 4,200 Pro ($8), 100 Pro+ ($15), **$35,100 MRR**
**Month 24**: 120,000 installs, 9,000 Pro ($8), 300 Pro+ ($15), **$76,500 MRR** → **$918K ARR**

### Year 3 (Enterprise)
**Month 36**: 250,000 installs, 18,000 Pro, 800 Pro+, 50 Enterprise ($100 avg)
**MRR**: $144K (Pro) + $12K (Pro+) + $5K (Enterprise) = **$161K MRR** → **$1.93M ARR**

---

## Success Metrics by Phase

### Phase 1 (Launch)
- ✅ 1,000 installs
- ✅ 50 Pro conversions (5% rate)
- ✅ 4.5+ stars on Marketplace
- ✅ <40% weekly churn

### Phase 2 (Context)
- ✅ 10,000 installs
- ✅ 500 Pro conversions (5% rate sustained)
- ✅ 30% of users index documentation
- ✅ 50% of users enable codebase indexing

### Phase 3 (Adaptive)
- ✅ 25,000 installs
- ✅ 7% conversion rate (smart assembly drives upgrades)
- ✅ <5% monthly churn (adaptive learning stickiness)
- ✅ 80%+ Pro users use smart assembly weekly

### Phase 4 (Team)
- ✅ 60,000 installs
- ✅ 100 team accounts (300+ seats)
- ✅ 10 enterprise deals
- ✅ <3% monthly churn (team lock-in)

---

## Competitive Moats

### Phase 1
- **Universal compatibility**: Only solution working with 9+ AI tools
- **Graph-based memory**: Relationships between concepts (vs flat storage)

### Phase 2
- **Unified context**: Memory + docs + code in one query (vs separate tools)
- **Privacy-first**: Local indexing in free tier (vs cloud-only competitors)

### Phase 3
- **Adaptive learning**: Gets smarter over time (vs static systems)
- **Smart assembly**: Automatic context optimization (vs manual search)

### Phase 4
- **Team collaboration**: Shared memory across developers (no competitor has this)
- **Enterprise-ready**: Self-hosted + SSO (captures large contracts)

---

## Risk Mitigation

### Risk: Low conversion to Pro
**Mitigation**: Add documentation indexing to free tier (limited), showcase Pro value

### Risk: High churn after trial
**Mitigation**: Smart assembly (Phase 3) creates daily value, hard to leave

### Risk: Competitors copy universal compatibility
**Mitigation**: Speed to market + network effects (more users = better patterns)

### Risk: AI tools add built-in memory
**Mitigation**: Multi-tool sync becomes moat (e.g., share between Cursor and Copilot)

---

## Next Steps (Immediate)

1. **Update marketing materials** with $8 pricing + context7 comparison
2. **Design documentation indexing MVP** (simplest useful version)
3. **User research**: Interview 10 users about external context needs
4. **Technical spike**: Test crawling + indexing React docs (performance baseline)
5. **Roadmap communication**: Share vision with early users, gather feedback

---

**Last Updated**: 2025-12-19
**Owner**: Product & Engineering
**Review Cadence**: Monthly
