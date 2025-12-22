"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { apiClient } from "@/lib/api-client";
import { Brain, TrendingUp, Zap, Database } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Stats {
  total_nodes: number;
  total_edges: number;
  node_types: Record<string, number>;
}

export default function DashboardPage() {
  const { user } = useAuth();
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

  return (
    <div className="relative min-h-screen">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/10" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-teal/5 blur-[100px]" />
        <div className="absolute inset-0 dot-grid opacity-20" />
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.email?.split("@")[0]}
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your memories
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={Database}
            label="Total Memories"
            value={loading ? "..." : stats?.total_nodes.toString() || "0"}
            gradient="from-brand-teal/20 to-brand-teal-dark/20"
            iconColor="text-brand-teal"
          />
          <StatCard
            icon={Brain}
            label="Connections"
            value={loading ? "..." : stats?.total_edges.toString() || "0"}
            gradient="from-brand-emerald/20 to-brand-teal-light/20"
            iconColor="text-brand-emerald"
          />
          <StatCard
            icon={Zap}
            label="Facts"
            value={loading ? "..." : stats?.node_types?.fact?.toString() || "0"}
            gradient="from-brand-teal-light/20 to-brand-emerald/20"
            iconColor="text-brand-teal-light"
          />
          <StatCard
            icon={TrendingUp}
            label="Episodes"
            value={loading ? "..." : stats?.node_types?.episode?.toString() || "0"}
            gradient="from-brand-teal/20 to-brand-teal-light/20"
            iconColor="text-brand-teal"
          />
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Getting started */}
          <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Getting Started
            </h2>
            <div className="space-y-3">
              <QuickActionLink
                href="/dashboard/memories/new"
                title="Create your first memory"
                description="Add facts, episodes, or procedures to start building your knowledge base"
              />
              <QuickActionLink
                href="/dashboard/search"
                title="Search your memories"
                description="Use semantic search to find relevant information instantly"
              />
              <QuickActionLink
                href="/dashboard/analytics"
                title="View analytics"
                description="Understand how your memory network is growing"
              />
            </div>
          </div>

          {/* Recent activity */}
          <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Recent Activity
            </h2>
            {stats && stats.total_nodes > 0 ? (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  You have {stats.total_nodes} memories stored
                </p>
                <Link href="/dashboard/memories">
                  <Button variant="outline" size="sm" className="w-full">
                    View all memories
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="text-center py-8">
                <Brain className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-4">
                  No memories yet. Start building your knowledge base!
                </p>
                <Link href="/dashboard/memories/new">
                  <Button size="sm" className="glow-teal">
                    Create Memory
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Integration info */}
        <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 backdrop-blur-sm p-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">
            Connect with Claude Code
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Use the memoist plugin to sync your memories with Claude Code and other AI assistants.
          </p>
          <code className="block rounded-lg bg-background/80 px-4 py-3 font-mono text-sm text-foreground">
            <span className="text-brand-amber">$</span>{" "}
            <span className="text-brand-teal">claude</span>{" "}
            <span className="text-muted-foreground">plugin install</span>{" "}
            <span className="text-brand-emerald">memoist</span>
          </code>
        </div>
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

function QuickActionLink({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-lg border border-border/50 bg-background/50 p-4 transition-all hover:border-primary/30 hover:bg-background/80"
    >
      <h3 className="text-sm font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-xs text-muted-foreground">{description}</p>
    </Link>
  );
}
