import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, Terminal, CheckCircle, Zap, Brain, Lock, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Memoist for Cursor - Memory that learns",
  description: "Give Cursor persistent memory that improves over time. Install in seconds.",
  openGraph: {
    title: "Memoist for Cursor",
    description: "Give Cursor persistent memory that improves over time.",
  },
};

const features = [
  {
    icon: Brain,
    title: "Context that persists",
    description: "Your project details, preferences, and decisions survive between sessions.",
  },
  {
    icon: Zap,
    title: "Instant recall",
    description: "Cursor automatically retrieves relevant context when you need it.",
  },
  {
    icon: Lock,
    title: "Privacy first",
    description: "Free tier runs 100% locally. Your data stays on your machine.",
  },
  {
    icon: RefreshCw,
    title: "Learns over time",
    description: "Memories strengthen based on usage, surfacing what matters most.",
  },
];

const useCases = [
  "Remember coding preferences and style conventions",
  "Store project architecture decisions for consistency",
  "Keep track of API patterns across your codebase",
  "Save debugging approaches that worked before",
  "Maintain context about team decisions and rationale",
];

export default function CursorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-brand-amber/10 blur-[120px]" />
            <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-brand-teal/10 blur-[100px]" />
          </div>

          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-amber/30 bg-brand-amber/10 px-4 py-2 text-sm">
                <Terminal className="h-4 w-4 text-brand-amber" />
                <span>MCP Plugin for Cursor</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Give Cursor{" "}
                <span className="text-gradient-static">memory that learns</span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Stop repeating yourself. Memoist remembers your preferences, project context,
                and past decisions—so Cursor can help you better.
              </p>

              {/* Install command */}
              <div className="max-w-md mx-auto mb-8">
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-sm text-muted-foreground mb-2">Install in seconds:</p>
                  <code className="block text-lg">
                    <span className="text-brand-teal">$</span>{" "}
                    <span className="text-brand-amber">cursor</span>{" "}
                    <span className="text-muted-foreground">mcp install</span>{" "}
                    <span className="text-brand-emerald">memoist</span>
                  </code>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="glow-amber" asChild>
                  <Link href="/docs/getting-started">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/docs">View Documentation</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 bg-secondary/10">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Built for Cursor
              </h2>
              <p className="text-lg text-muted-foreground">
                Native integration via Model Context Protocol. Works seamlessly with your workflow.
              </p>
            </div>

            <div className="mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-xl border border-border bg-card/50 p-6"
                >
                  <feature.icon className="h-8 w-8 text-brand-amber mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold mb-4 text-center">
                What can Memoist remember?
              </h2>
              <p className="text-lg text-muted-foreground text-center mb-12">
                Anything that helps Cursor help you better.
              </p>

              <div className="space-y-4">
                {useCases.map((useCase, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 rounded-lg border border-border bg-card/50 p-4"
                  >
                    <CheckCircle className="h-5 w-5 text-brand-emerald shrink-0 mt-0.5" />
                    <span>{useCase}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Manual setup */}
        <section className="py-24 bg-secondary/10">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Alternative: Manual Setup
              </h2>
              <p className="text-muted-foreground text-center mb-8">
                Add Memoist to your Cursor MCP configuration:
              </p>
              <div className="rounded-xl border border-border bg-card p-6">
                <pre className="text-sm overflow-x-auto">{`{
  "mcpServers": {
    "memoist": {
      "command": "python",
      "args": ["-m", "memoist_plugin"]
    }
  }
}`}</pre>
              </div>
              <p className="text-sm text-muted-foreground text-center mt-4">
                First install the plugin: <code className="text-brand-teal">pip install memoist-plugin</code>
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to supercharge Cursor?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Install Memoist in under 2 minutes. Free tier includes 10,000 memories.
              </p>
              <Button size="lg" className="glow-amber" asChild>
                <Link href="/docs/getting-started">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
