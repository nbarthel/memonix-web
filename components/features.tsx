import { Brain, Layers, Lock, Zap, RefreshCw, Globe } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Learns Over Time",
    description: "Memory connections strengthen based on usage patterns, improving retrieval accuracy automatically.",
  },
  {
    icon: Layers,
    title: "Persistent Context",
    description: "Your project knowledge, preferences, and decisions survive between sessions.",
  },
  {
    icon: Zap,
    title: "Instant Retrieval",
    description: "Semantic search finds relevant context in milliseconds, even across thousands of memories.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Free tier runs entirely local. Your data never leaves your machine unless you choose Pro.",
  },
  {
    icon: RefreshCw,
    title: "Cross-Tool Sync",
    description: "Pro: Same memories available in Claude Code, Cursor, and more. One brain, all tools.",
  },
  {
    icon: Globe,
    title: "Works Everywhere",
    description: "Integrates with your favorite AI coding assistants through standard protocols.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Everything your AI needs to remember
          </h2>
          <p className="text-lg text-muted-foreground">
            Stop repeating yourself. StrataMind gives your AI assistant the context it needs.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
