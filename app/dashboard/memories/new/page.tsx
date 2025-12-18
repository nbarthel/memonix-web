"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Brain, FileText, Code, User, Target, Lock, Save } from "lucide-react";
import Link from "next/link";
import { getSessionMetadata, incrementSessionMemoryCount } from "@/lib/session-manager";
import { useAuth } from "@/lib/auth-context";

const nodeTypes = [
  { value: "fact", label: "Fact", icon: Brain, description: "General knowledge or information" },
  { value: "episode", label: "Episode", icon: FileText, description: "Personal experience or event" },
  { value: "procedure", label: "Procedure", icon: Code, description: "Step-by-step process or how-to" },
  { value: "entity", label: "Entity", icon: User, description: "Person, place, or thing" },
  { value: "goal", label: "Goal", icon: Target, description: "Objective or aspiration" },
  { value: "preference", label: "Preference", icon: Lock, description: "Personal preference or setting" },
];

export default function NewMemoryPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [nodeType, setNodeType] = useState("fact");
  const [importance, setImportance] = useState(0.5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!user) {
        setError("You must be logged in to create memories");
        return;
      }

      // Get session metadata with REQUIRED fields: tenant_id, user_id, user_email, session_id
      const sessionMetadata = getSessionMetadata(user.id, user.email);

      await apiClient.createMemory(content, nodeType, importance, sessionMetadata);

      // Increment session memory count
      incrementSessionMemoryCount();

      router.push("/dashboard/memories");
    } catch (err: any) {
      setError(err.message || "Failed to create memory");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/10" />
        <div className="absolute inset-0 dot-grid opacity-20" />
      </div>

      <div className="container mx-auto px-6 py-8 max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard/memories"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to memories
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Create Memory</h1>
          <p className="text-muted-foreground">
            Add a new memory to your knowledge base
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error message */}
          {error && (
            <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-4">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Content */}
          <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6">
            <label htmlFor="content" className="block text-sm font-medium text-foreground mb-3">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter your memory content..."
              required
              rows={6}
              className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all resize-none"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              Be specific and descriptive for better retrieval
            </p>
          </div>

          {/* Memory type */}
          <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6">
            <label className="block text-sm font-medium text-foreground mb-4">
              Memory Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {nodeTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = nodeType === type.value;
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setNodeType(type.value)}
                    className={`
                      flex items-start gap-3 p-4 rounded-lg border transition-all text-left
                      ${
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-border/50 bg-background/50 hover:border-border hover:bg-background/80"
                      }
                    `}
                  >
                    <div className={`
                      flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0
                      ${isSelected ? "bg-primary/20 text-primary" : "bg-secondary/50 text-muted-foreground"}
                    `}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>
                        {type.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {type.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Importance */}
          <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6">
            <label htmlFor="importance" className="block text-sm font-medium text-foreground mb-3">
              Importance: {(importance * 100).toFixed(0)}%
            </label>
            <input
              id="importance"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={importance}
              onChange={(e) => setImportance(parseFloat(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-secondary accent-primary"
            />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Higher importance increases retrieval priority
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={loading || !content}
              className="flex-1 glow-teal"
              size="lg"
            >
              <Save className="h-4 w-4 mr-2" />
              {loading ? "Creating..." : "Create Memory"}
            </Button>
            <Link href="/dashboard/memories">
              <Button
                type="button"
                variant="outline"
                size="lg"
                disabled={loading}
              >
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
