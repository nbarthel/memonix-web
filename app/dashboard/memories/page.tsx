"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, Trash2, Brain, FileText, Code, User, Target, Lock } from "lucide-react";
import Link from "next/link";

interface Memory {
  id: string;
  content: string;
  node_type: string;
  importance: number;
  created_at: string;
  metadata?: Record<string, any>;
}

const nodeTypeIcons: Record<string, any> = {
  fact: Brain,
  episode: FileText,
  procedure: Code,
  entity: User,
  goal: Target,
  preference: Lock,
};

const nodeTypeColors: Record<string, string> = {
  fact: "text-brand-teal",
  episode: "text-brand-emerald",
  procedure: "text-brand-teal-light",
  entity: "text-brand-teal-dark",
  goal: "text-brand-amber",
  preference: "text-brand-emerald",
};

export default function MemoriesPage() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  useEffect(() => {
    fetchMemories();
  }, []);

  const fetchMemories = async () => {
    try {
      // Use query endpoint with a space to get all memories
      // This avoids the minimum length validation on the search endpoint
      const result = await apiClient.queryMemories(" ", 50);
      setMemories(result.nodes.map(node => ({
        id: node.id,
        content: node.content,
        node_type: node.node_type,
        importance: node.importance,
        created_at: new Date().toISOString(), // Query doesn't return created_at
        metadata: node.metadata,
      })));
    } catch (error) {
      console.error("Failed to fetch memories:", error);
      setMemories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this memory?")) return;

    try {
      await apiClient.deleteMemory(id);
      setMemories(memories.filter((m) => m.id !== id));
    } catch (error) {
      console.error("Failed to delete memory:", error);
      alert("Failed to delete memory");
    }
  };

  const filteredMemories = memories.filter((memory) => {
    const matchesSearch =
      searchQuery === "" ||
      memory.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || memory.node_type === filterType;
    return matchesSearch && matchesType;
  });

  // Group memories by session
  const groupedMemories = filteredMemories.reduce((groups, memory) => {
    const sessionId = memory.metadata?.session_id || "no-session";
    const sessionName = memory.metadata?.session_name || "Unnamed Session";

    if (!groups[sessionId]) {
      groups[sessionId] = {
        sessionId,
        sessionName,
        sessionStart: memory.metadata?.session_start,
        memories: [],
      };
    }
    groups[sessionId].memories.push(memory);
    return groups;
  }, {} as Record<string, { sessionId: string; sessionName: string; sessionStart?: string; memories: Memory[] }>);

  const sessionGroups = Object.values(groupedMemories).sort((a, b) => {
    // Sort by session start time, newest first
    const timeA = a.sessionStart ? new Date(a.sessionStart).getTime() : 0;
    const timeB = b.sessionStart ? new Date(b.sessionStart).getTime() : 0;
    return timeB - timeA;
  });

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/10" />
        <div className="absolute inset-0 dot-grid opacity-20" />
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Memories</h1>
            <p className="text-muted-foreground">
              Manage your knowledge base of {memories.length} memories
            </p>
          </div>
          <Link href="/dashboard/memories/new">
            <Button className="glow-teal">
              <Plus className="h-4 w-4 mr-2" />
              New Memory
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search memories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-lg bg-card/50 border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 rounded-lg bg-card/50 border border-border text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
            >
              <option value="all">All Types</option>
              <option value="fact">Facts</option>
              <option value="episode">Episodes</option>
              <option value="procedure">Procedures</option>
              <option value="entity">Entities</option>
              <option value="goal">Goals</option>
              <option value="preference">Preferences</option>
            </select>
          </div>
        </div>

        {/* Memories list */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-brand-teal to-brand-teal-dark shadow-lg shadow-brand-teal/20 animate-pulse mx-auto mb-4" />
              <p className="text-sm text-muted-foreground">Loading memories...</p>
            </div>
          </div>
        ) : filteredMemories.length === 0 ? (
          <div className="text-center py-20">
            <Brain className="h-16 w-16 text-muted-foreground/20 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {memories.length === 0 ? "No memories yet" : "No matches found"}
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              {memories.length === 0
                ? "Create your first memory to start building your knowledge base"
                : "Try adjusting your search or filters"}
            </p>
            {memories.length === 0 && (
              <Link href="/dashboard/memories/new">
                <Button className="glow-teal">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Memory
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {sessionGroups.map((group) => (
              <div key={group.sessionId}>
                {/* Session Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 h-px bg-border/50" />
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/30 border border-border/50">
                    <span className="text-sm font-medium text-foreground">
                      {group.sessionName}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {group.memories.length} {group.memories.length === 1 ? "memory" : "memories"}
                    </span>
                  </div>
                  <div className="flex-1 h-px bg-border/50" />
                </div>

                {/* Memories in this session */}
                <div className="grid gap-4">
                  {group.memories.map((memory) => (
                    <MemoryCard
                      key={memory.id}
                      memory={memory}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MemoryCard({
  memory,
  onDelete,
}: {
  memory: Memory;
  onDelete: (id: string) => void;
}) {
  const Icon = nodeTypeIcons[memory.node_type] || Brain;
  const iconColor = nodeTypeColors[memory.node_type] || "text-brand-teal";

  return (
    <div className="group relative rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-5 transition-all hover:border-primary/30 hover:bg-card/80">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/50 border border-border/50 flex-shrink-0">
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary border border-primary/20">
                  {memory.node_type}
                </span>
                <span className="text-xs text-muted-foreground">
                  Importance: {(memory.importance * 100).toFixed(0)}%
                </span>
              </div>
              <p className="text-sm text-foreground leading-relaxed">{memory.content}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(memory.id)}
              className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Created {new Date(memory.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
