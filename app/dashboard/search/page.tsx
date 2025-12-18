"use client";

import { useState } from "react";
import { apiClient } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Search, Sparkles, Brain, Zap } from "lucide-react";

interface QueryResult {
  id: string;
  content: string;
  node_type: string;
  importance: number;
  similarity: number;
  relevance: string;
  metadata: Record<string, any>;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<QueryResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [executionTime, setExecutionTime] = useState<number>(0);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);

    try {
      const response = await apiClient.queryMemories(query, 10);
      setResults(response.nodes);
      setExecutionTime(response.execution_time_ms);
    } catch (error) {
      console.error("Search failed:", error);
      alert("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/10" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-teal/5 blur-[100px]" />
        <div className="absolute inset-0 dot-grid opacity-20" />
      </div>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-teal/20 to-brand-emerald/20 mb-4">
            <Sparkles className="h-6 w-6 text-brand-teal" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Semantic Search
          </h1>
          <p className="text-muted-foreground">
            Find relevant memories using natural language
          </p>
        </div>

        {/* Search form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="gradient-border rounded-xl p-[1px]">
            <div className="rounded-xl bg-card/80 backdrop-blur-sm p-6">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask anything about your memories..."
                    className="w-full pl-12 pr-4 py-4 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all text-lg"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading || !query.trim()}
                  className="glow-teal px-8"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Search
                    </>
                  )}
                </Button>
              </div>

              {searched && results.length > 0 && (
                <div className="mt-4 text-xs text-muted-foreground">
                  Found {results.length} results in {executionTime.toFixed(2)}ms
                </div>
              )}
            </div>
          </div>
        </form>

        {/* Results */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-brand-teal to-brand-teal-dark shadow-lg shadow-brand-teal/20 animate-pulse mx-auto mb-4" />
              <p className="text-sm text-muted-foreground">Searching memories...</p>
            </div>
          </div>
        ) : searched && results.length === 0 ? (
          <div className="text-center py-20">
            <Brain className="h-16 w-16 text-muted-foreground/20 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No results found
            </h3>
            <p className="text-sm text-muted-foreground">
              Try a different search query or create more memories
            </p>
          </div>
        ) : searched ? (
          <div className="space-y-4">
            {results.map((result, index) => (
              <ResultCard key={result.id} result={result} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Search className="h-16 w-16 text-muted-foreground/20 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Start searching
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Enter a query to find relevant memories
            </p>
            <div className="inline-flex flex-wrap gap-2 justify-center">
              {["Latest project updates", "Team preferences", "Important decisions"].map((example) => (
                <button
                  key={example}
                  onClick={() => setQuery(example)}
                  className="px-4 py-2 rounded-lg bg-secondary/50 border border-border/50 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ResultCard({ result, index }: { result: QueryResult; index: number }) {
  const getRelevanceColor = (relevance: string) => {
    switch (relevance) {
      case "highly relevant":
        return "bg-brand-emerald/20 text-brand-emerald border-brand-emerald/30";
      case "relevant":
        return "bg-brand-teal/20 text-brand-teal border-brand-teal/30";
      case "somewhat relevant":
        return "bg-brand-teal-light/20 text-brand-teal-light border-brand-teal-light/30";
      default:
        return "bg-secondary/50 text-muted-foreground border-border/50";
    }
  };

  return (
    <div className="relative rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-5 transition-all hover:border-primary/30 hover:bg-card/80">
      <div className="flex items-start gap-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/50 border border-border/50 text-sm font-semibold text-muted-foreground flex-shrink-0">
          {index + 1}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary border border-primary/20">
                {result.node_type}
              </span>
              <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium border ${getRelevanceColor(result.relevance)}`}>
                {result.relevance}
              </span>
            </div>
            <div className="text-xs text-muted-foreground whitespace-nowrap">
              {(result.similarity * 100).toFixed(0)}% match
            </div>
          </div>

          <p className="text-sm text-foreground leading-relaxed mb-2">
            {result.content}
          </p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>Importance: {(result.importance * 100).toFixed(0)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
