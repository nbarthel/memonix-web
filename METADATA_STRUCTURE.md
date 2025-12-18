# Memonix Memory Metadata Structure

## Overview

Every memory stored in Memonix must include specific metadata fields for proper multi-tenancy isolation, project/session association, and future team collaboration support.

## Required Fields

These fields **MUST** be present in every memory's metadata:

### `tenant_id` (string, REQUIRED)
- **Purpose**: Multi-tenancy isolation (CRITICAL)
- **Value**: User's UUID from Supabase auth
- **Usage**: Backend MUST filter all queries by this field to prevent data leakage
- **Example**: `"9f0e5ba2-4a6c-4d0a-a34e-83f363fb8d7a"`

### `user_id` (string, REQUIRED)
- **Purpose**: User attribution for future team memories
- **Value**: Same as `tenant_id` (for clarity and future extensibility)
- **Example**: `"9f0e5ba2-4a6c-4d0a-a34e-83f363fb8d7a"`

### `user_email` (string, REQUIRED)
- **Purpose**: User identification for team memories and collaboration
- **Value**: User's email address
- **Example**: `"user@example.com"`

### `session_id` (string, REQUIRED)
- **Purpose**: Group memories by conversation/session
- **Value**:
  - For Claude: Claude's native session ID from `.claude/` directory
  - For Cursor: Cursor's session ID
  - For Dashboard: Auto-generated session ID (`session-{timestamp}-{random}`)
- **Example**: `"session-2024-12-17T14-30-00Z-abc123"` or Claude's UUID

### `session_start` (ISO 8601 datetime, REQUIRED)
- **Purpose**: Track when session began
- **Value**: ISO 8601 timestamp
- **Example**: `"2024-12-17T14:30:00Z"`

## Optional Fields

These fields enhance organization but are not required:

### `project_id` (string, optional)
- **Purpose**: Associate memory with a specific project
- **Value**:
  - For Claude/Cursor: Derived from workspace path
  - For Dashboard: User-defined or auto-generated from project name
- **Example**: `"project-memonix"` or `"proj-a1b2c3d4"`

### `project_name` (string, optional)
- **Purpose**: Human-readable project name
- **Value**: Project display name
- **Example**: `"Memonix Dashboard"`

### `project_path` (string, optional)
- **Purpose**: File system path to project (for IDE integrations)
- **Value**: Absolute or relative path
- **Example**: `"/home/user/projects/memonix"` or `"~/projects/memonix"`

### `session_name` (string, optional)
- **Purpose**: Human-readable session name
- **Value**: User-defined or auto-generated
- **Example**: `"API Integration Work"` or `"Bug Fix Session"`

### `source` (string, optional)
- **Purpose**: Track where memory originated
- **Value**: One of: `"dashboard"`, `"claude"`, `"cursor"`, `"api"`
- **Example**: `"claude"`

### `created_via` (string, optional)
- **Purpose**: Specific creation method
- **Value**: One of: `"web-ui"`, `"mcp"`, `"api"`, `"cli"`
- **Example**: `"mcp"`

## Complete Example

```json
{
  "content": "The API uses JWT tokens for authentication",
  "node_type": "fact",
  "importance": 0.8,
  "metadata": {
    // REQUIRED FIELDS
    "tenant_id": "9f0e5ba2-4a6c-4d0a-a34e-83f363fb8d7a",
    "user_id": "9f0e5ba2-4a6c-4d0a-a34e-83f363fb8d7a",
    "user_email": "nate.barthel@gmail.com",
    "session_id": "session-2024-12-17T14-30-00Z-abc123",
    "session_start": "2024-12-17T14:30:00Z",

    // OPTIONAL FIELDS
    "project_id": "project-memonix",
    "project_name": "Memonix Dashboard",
    "project_path": "/home/nbarthel/ai/memonix",
    "session_name": "Dashboard Session Work",
    "source": "dashboard",
    "created_via": "web-ui"
  }
}
```

## Backend Implementation Requirements

### 1. Query Filtering (CRITICAL)

**ALL** memory queries MUST filter by `tenant_id`:

```python
# CORRECT - Always filter by tenant_id
memories = backend.find_similar_nodes(
    embedding=query_embedding,
    user_id=current_user.id,  # This becomes tenant_id filter
    k=10
)

# WRONG - Missing tenant isolation
memories = backend.find_similar_nodes(
    embedding=query_embedding,
    k=10  # No user filter - SECURITY VULNERABILITY!
)
```

### 2. Row Level Security (RLS)

Supabase RLS policies MUST enforce tenant isolation:

```sql
-- Memory nodes RLS policy
CREATE POLICY "Users can view own nodes"
ON memory_nodes FOR SELECT
USING (auth.uid() = user_id);

-- Ensure user_id in table matches tenant_id in metadata
CREATE POLICY "Metadata tenant_id must match user_id"
ON memory_nodes FOR INSERT
WITH CHECK (
  auth.uid() = user_id
  AND metadata->>'tenant_id' = user_id::text
);
```

### 3. Validation

Backend should validate metadata on memory creation:

```python
def validate_memory_metadata(metadata: dict, user_id: str) -> bool:
    """Validate that memory metadata has all required fields."""
    required_fields = {
        "tenant_id",
        "user_id",
        "user_email",
        "session_id",
        "session_start"
    }

    # Check all required fields present
    if not all(field in metadata for field in required_fields):
        raise ValueError(f"Missing required metadata fields: {required_fields - set(metadata.keys())}")

    # Verify tenant_id matches authenticated user
    if metadata["tenant_id"] != user_id or metadata["user_id"] != user_id:
        raise ValueError("tenant_id/user_id must match authenticated user")

    return True
```

## Frontend Usage

### Dashboard (TypeScript)

```typescript
import { getSessionMetadata } from "@/lib/session-manager";
import { useAuth } from "@/lib/auth-context";

const { user } = useAuth();

// Get metadata with all required fields
const metadata = getSessionMetadata(user.id, user.email);

// Create memory
await apiClient.createMemory(content, nodeType, importance, metadata);
```

### Claude MCP (Python)

```python
from memonix import MemonixClient

client = MemonixClient()

# Memory with full metadata
client.add_memory(
    content="API uses REST endpoints",
    node_type="fact",
    importance=0.7,
    metadata={
        # REQUIRED
        "tenant_id": user_id,
        "user_id": user_id,
        "user_email": user_email,
        "session_id": claude_session_id,
        "session_start": session_start_time,

        # OPTIONAL
        "project_id": f"project-{workspace_name}",
        "project_name": workspace_name,
        "project_path": workspace_path,
        "source": "claude",
        "created_via": "mcp",
    }
)
```

## Session Assignment Logic

When a memory comes in without a session, assign it based on:

1. **Project + Timestamp**: If project_id exists, find most recent session for that project within last 30 minutes
2. **User + Timestamp**: If no project, find user's most recent session within last 30 minutes
3. **Create New Session**: If no recent session found, create new session with auto-generated ID

```python
def assign_session(memory: dict, user_id: str) -> str:
    """Assign session to memory if not provided."""

    # If session_id already provided, use it
    if memory.get("metadata", {}).get("session_id"):
        return memory["metadata"]["session_id"]

    # Look for recent session
    cutoff_time = datetime.now() - timedelta(minutes=30)

    # Try project-specific session first
    if project_id := memory.get("metadata", {}).get("project_id"):
        recent_session = find_recent_session(
            user_id=user_id,
            project_id=project_id,
            since=cutoff_time
        )
        if recent_session:
            return recent_session.id

    # Try user's general session
    recent_session = find_recent_session(
        user_id=user_id,
        since=cutoff_time
    )
    if recent_session:
        return recent_session.id

    # Create new session
    return create_new_session(user_id=user_id)
```

## Migration Path

For existing memories without proper metadata:

1. **tenant_id**: Use `user_id` from `memory_nodes` table
2. **user_id**: Same as `tenant_id`
3. **user_email**: Lookup from `auth.users` table
4. **session_id**: Generate based on `created_at` timestamp clustering
5. **session_start**: Use `created_at` of first memory in cluster

```sql
-- Migration script example
UPDATE memory_nodes
SET metadata = jsonb_set(
  COALESCE(metadata, '{}'::jsonb),
  '{tenant_id}',
  to_jsonb(user_id::text)
)
WHERE metadata->>'tenant_id' IS NULL;
```

## Future: Team Memories

With `user_id` and `user_email` in metadata, we can support:

1. **Shared Projects**: Multiple users contributing to same project
2. **Memory Attribution**: "John added this fact on Dec 17"
3. **Access Control**: Team members can see each other's memories in shared projects
4. **Collaboration**: "Sarah updated this memory 2 days ago"

The infrastructure is ready - just needs UI and permission system.
