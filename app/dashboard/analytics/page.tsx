"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";
import { Brain, TrendingUp, Network, BarChart3 } from "lucide-react";

interface Stats {
  total_nodes: number;
  total_edges: number;
  node_types: Record<string, number>;
  edge_types: Record<string, number>;
}

export default function AnalyticsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await apiClient.getStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const nodeTypeData = stats?.node_types
    ? Object.entries(stats.node_types).map(([type, count]) => ({
        type,
        count,
        percentage: ((count / stats.total_nodes) * 100).toFixed(1),
      }))
    : [];

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/10" />
        <div className="absolute inset-0 dot-grid opacity-20" />
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Analytics</h1>
          <p className="text-muted-foreground">
            Insights into your memory network
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-brand-teal to-brand-teal-dark shadow-lg shadow-brand-teal/20 animate-pulse mx-auto mb-4" />
              <p className="text-sm text-muted-foreground">Loading analytics...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Overview stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard
                icon={Brain}
                label="Total Memories"
                value={stats?.total_nodes.toString() || "0"}
                gradient="from-brand-teal/20 to-brand-teal-dark/20"
                iconColor="text-brand-teal"
              />
              <StatCard
                icon={Network}
                label="Connections"
                value={stats?.total_edges.toString() || "0"}
                gradient="from-brand-emerald/20 to-brand-teal-light/20"
                iconColor="text-brand-emerald"
              />
              <StatCard
                icon={TrendingUp}
                label="Avg. Connections"
                value={
                  stats && stats.total_nodes > 0
                    ? (stats.total_edges / stats.total_nodes).toFixed(1)
                    : "0"
                }
                gradient="from-brand-teal-light/20 to-brand-emerald/20"
                iconColor="text-brand-teal-light"
              />
            </div>

            {/* Memory type distribution */}
            <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">
                  Memory Type Distribution
                </h2>
              </div>

              {nodeTypeData.length > 0 ? (
                <div className="space-y-4">
                  {nodeTypeData.map((item) => (
                    <div key={item.type}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground capitalize">
                          {item.type}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {item.count} ({item.percentage}%)
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-secondary overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-brand-teal to-brand-emerald rounded-full transition-all"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">
                    No data available yet. Create some memories to see analytics.
                  </p>
                </div>
              )}
            </div>

            {/* Growth insights */}
            <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Insights
              </h2>
              <div className="space-y-3">
                {stats && stats.total_nodes > 0 ? (
                  <>
                    <InsightCard
                      text={`Your memory network contains ${stats.total_nodes} memories across ${Object.keys(stats.node_types).length} different types.`}
                    />
                    <InsightCard
                      text={`You have ${stats.total_edges} connections, averaging ${(stats.total_edges / stats.total_nodes).toFixed(1)} connections per memory.`}
                    />
                    {stats.total_edges === 0 && (
                      <InsightCard
                        text="Create connections between related memories to build a richer knowledge graph."
                        type="tip"
                      />
                    )}
                  </>
                ) : (
                  <InsightCard
                    text="Start creating memories to see insights about your knowledge base."
                    type="tip"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  gradient,
  iconColor,
}: {
  icon: any;
  label: string;
  value: string;
  gradient: string;
  iconColor: string;
}) {
  return (
    <div className="group relative rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 transition-all hover:border-primary/30">
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/50 border border-border/50">
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
        </div>
        <p className="text-2xl font-bold text-foreground mb-1">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

function InsightCard({ text, type = "info" }: { text: string; type?: "info" | "tip" }) {
  return (
    <div className={`flex items-start gap-3 rounded-lg p-4 ${
      type === "tip"
        ? "bg-primary/5 border border-primary/20"
        : "bg-secondary/30 border border-border/30"
    }`}>
      <div className={`mt-0.5 h-2 w-2 rounded-full flex-shrink-0 ${
        type === "tip" ? "bg-primary" : "bg-brand-teal"
      }`} />
      <p className="text-sm text-foreground/90 leading-relaxed">{text}</p>
    </div>
  );
}
