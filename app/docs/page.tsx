import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, Rocket, Book, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Documentation - Memonix",
  description: "Learn how to use Memonix to give your AI assistant persistent memory.",
};

const quickLinks = [
  {
    icon: Rocket,
    title: "Quick Start",
    description: "Get up and running in under 2 minutes",
    href: "/docs/getting-started",
    color: "text-brand-teal",
  },
  {
    icon: Book,
    title: "Installation",
    description: "Detailed setup for Claude Code, Cursor, and more",
    href: "/docs/installation",
    color: "text-brand-teal-light",
  },
  {
    icon: Zap,
    title: "API Reference",
    description: "Complete reference for all memory tools",
    href: "/docs/api",
    color: "text-brand-emerald",
  },
];

export default function DocsPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Memonix Documentation
        </h1>
        <p className="text-xl text-muted-foreground">
          Everything you need to give your AI assistant memory that learns and improves over time.
        </p>
      </div>

      {/* Quick links */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group relative rounded-xl border border-border/50 bg-card/50 p-6 hover:border-primary/30 hover:bg-card/80 transition-all"
          >
            <link.icon className={`h-8 w-8 ${link.color} mb-4`} />
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              {link.title}
              <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </h3>
            <p className="text-sm text-muted-foreground">{link.description}</p>
          </Link>
        ))}
      </div>

      {/* What is Memonix */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">What is Memonix?</h2>
        <p className="text-muted-foreground leading-relaxed">
          Memonix is a memory layer for AI coding assistants. It remembers your preferences,
          project context, and past decisions—so you don&apos;t have to repeat yourself.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Works with Claude Code, Cursor, and other AI tools that support the
          Model Context Protocol (MCP).
        </p>
      </section>

      {/* Key features */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Key Features</h2>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-teal shrink-0" />
            <span><strong className="text-foreground">Persistent memory</strong> — Context survives between sessions</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-teal-light shrink-0" />
            <span><strong className="text-foreground">Learns over time</strong> — Memories strengthen based on usage</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-emerald shrink-0" />
            <span><strong className="text-foreground">Privacy first</strong> — Free tier runs 100% locally</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-amber shrink-0" />
            <span><strong className="text-foreground">Cross-tool sync</strong> — Same memories across all your AI tools (Pro)</span>
          </li>
        </ul>
      </section>

      {/* CTA */}
      <div className="rounded-xl border border-border/50 bg-gradient-to-br from-brand-teal/5 to-brand-teal-dark/5 p-8">
        <h3 className="text-xl font-semibold mb-2">Ready to get started?</h3>
        <p className="text-muted-foreground mb-4">
          Install Memonix in under 2 minutes and give your AI assistant the memory it deserves.
        </p>
        <Button asChild>
          <Link href="/docs/getting-started">
            Quick Start Guide
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
