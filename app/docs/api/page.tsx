import { Metadata } from "next";
import { Code, Database, Link as LinkIcon, BarChart3, Clock, Trash2, Cloud, User } from "lucide-react";

export const metadata: Metadata = {
  title: "API Reference - Memoist",
  description: "Complete reference for all Memoist memory tools.",
};

const tools = [
  {
    name: "memory_query",
    description: "Query memories for relevant context. Returns the most relevant memories based on your query.",
    icon: Database,
    params: [
      { name: "query", type: "string", required: true, description: "Natural language query" },
      { name: "k", type: "integer", required: false, description: "Number of results (default: 10)" },
      { name: "max_tokens", type: "integer", required: false, description: "Token budget (default: 4000)" },
    ],
    example: `memory_query "authentication approach"`,
  },
  {
    name: "memory_add",
    description: "Add a new memory. Memories are automatically embedded for search.",
    icon: Database,
    params: [
      { name: "content", type: "string", required: true, description: "Memory content" },
      { name: "node_type", type: "string", required: false, description: "Memory type (default: fact)" },
      { name: "importance", type: "number", required: false, description: "Importance 0-1 (default: 0.5)" },
    ],
    example: `memory_add "User prefers TypeScript" --type preference`,
  },
  {
    name: "memory_search",
    description: "Search memories by similarity. More direct than query, returns raw results.",
    icon: Code,
    params: [
      { name: "text", type: "string", required: true, description: "Search text" },
      { name: "k", type: "integer", required: false, description: "Number of results (default: 5)" },
      { name: "node_type", type: "string", required: false, description: "Filter by type" },
    ],
    example: `memory_search "database" --type procedure`,
  },
  {
    name: "memory_link",
    description: "Create a relationship between two memories.",
    icon: LinkIcon,
    params: [
      { name: "source_id", type: "string", required: true, description: "Source memory ID" },
      { name: "target_id", type: "string", required: true, description: "Target memory ID" },
      { name: "edge_type", type: "string", required: true, description: "Relationship type" },
      { name: "weight", type: "number", required: false, description: "Edge weight 0-1 (default: 1.0)" },
    ],
    example: `memory_link "id_123" "id_456" CAUSAL`,
  },
  {
    name: "memory_stats",
    description: "Get statistics about your memory store.",
    icon: BarChart3,
    params: [],
    example: `memory_stats`,
  },
  {
    name: "memory_recent",
    description: "Get recently created memories.",
    icon: Clock,
    params: [
      { name: "limit", type: "integer", required: false, description: "Max results (default: 10)" },
      { name: "node_type", type: "string", required: false, description: "Filter by type" },
    ],
    example: `memory_recent --limit 5`,
  },
  {
    name: "memory_delete",
    description: "Delete a memory by ID.",
    icon: Trash2,
    params: [
      { name: "node_id", type: "string", required: true, description: "Memory ID to delete" },
    ],
    example: `memory_delete "local_20241215_143022"`,
  },
  {
    name: "memory_sync",
    description: "Sync local memories to cloud (Pro only).",
    icon: Cloud,
    params: [],
    example: `memory_sync`,
    pro: true,
  },
  {
    name: "memory_tier",
    description: "Check your current subscription tier and usage.",
    icon: User,
    params: [],
    example: `memory_tier`,
  },
];

const memoryTypes = [
  { type: "fact", description: "General knowledge, documentation, technical details" },
  { type: "episode", description: "Events, conversations, decisions made" },
  { type: "procedure", description: "How-to instructions, workflows, processes" },
  { type: "entity", description: "People, projects, systems, components" },
  { type: "preference", description: "User preferences, coding style, conventions" },
  { type: "goal", description: "Objectives, requirements, milestones" },
];

const edgeTypes = [
  { type: "TEMPORAL_BEFORE", description: "Source happened before target" },
  { type: "TEMPORAL_AFTER", description: "Source happened after target" },
  { type: "CAUSAL", description: "Source caused or led to target" },
  { type: "SEMANTIC_SIMILAR", description: "Related by meaning" },
  { type: "PART_OF", description: "Source is part of target" },
  { type: "CONTRADICTS", description: "Source contradicts target" },
  { type: "SUPERSEDES", description: "Source replaces target" },
];

export default function ApiReferencePage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">API Reference</h1>
        <p className="text-xl text-muted-foreground">
          Complete reference for all Memoist memory tools.
        </p>
      </div>

      {/* Tools */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold">Memory Tools</h2>

        {tools.map((tool) => (
          <div key={tool.name} className="rounded-xl border border-border overflow-hidden">
            <div className="bg-muted/30 p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <tool.icon className="h-5 w-5 text-brand-cyan" />
                <code className="text-lg font-semibold">{tool.name}</code>
                {tool.pro && (
                  <span className="text-xs bg-brand-amber/20 text-brand-amber px-2 py-0.5 rounded-full">
                    Pro
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-2">{tool.description}</p>
            </div>

            <div className="p-4 space-y-4">
              {tool.params.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold mb-2">Parameters</h4>
                  <div className="space-y-2">
                    {tool.params.map((param) => (
                      <div key={param.name} className="flex items-start gap-3 text-sm">
                        <code className="text-brand-purple shrink-0">{param.name}</code>
                        <span className="text-muted-foreground shrink-0">
                          {param.type}
                          {param.required && <span className="text-brand-amber ml-1">*</span>}
                        </span>
                        <span className="text-muted-foreground">{param.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-sm font-semibold mb-2">Example</h4>
                <div className="rounded-lg bg-card border border-border p-3">
                  <code className="text-sm">{tool.example}</code>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Memory Types */}
      <section className="space-y-4" id="memory-types">
        <h2 className="text-2xl font-bold">Memory Types</h2>
        <p className="text-muted-foreground">
          Categorize memories for better organization and retrieval.
        </p>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-semibold">Type</th>
                <th className="text-left p-3 font-semibold">Use For</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {memoryTypes.map((mt) => (
                <tr key={mt.type}>
                  <td className="p-3 font-mono text-brand-cyan">{mt.type}</td>
                  <td className="p-3 text-muted-foreground">{mt.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Edge Types */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Relationship Types</h2>
        <p className="text-muted-foreground">
          Connect memories with meaningful relationships.
        </p>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-semibold">Type</th>
                <th className="text-left p-3 font-semibold">Meaning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {edgeTypes.map((et) => (
                <tr key={et.type}>
                  <td className="p-3 font-mono text-brand-purple">{et.type}</td>
                  <td className="p-3 text-muted-foreground">{et.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
