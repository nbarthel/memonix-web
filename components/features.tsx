import { Brain, Layers, Lock, Zap, RefreshCw, Cpu } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Learns Over Time",
    description: "Memory connections strengthen based on usage patterns, improving retrieval accuracy automatically.",
    gradient: "from-brand-purple/20 to-brand-cyan/20",
    iconColor: "text-brand-purple",
    size: "large",
  },
  {
    icon: Layers,
    title: "Persistent Context",
    description: "Your project knowledge, preferences, and decisions survive between sessions.",
    gradient: "from-brand-cyan/20 to-brand-emerald/20",
    iconColor: "text-brand-cyan",
    size: "normal",
  },
  {
    icon: Zap,
    title: "Instant Retrieval",
    description: "Semantic search finds relevant context in milliseconds.",
    gradient: "from-brand-amber/20 to-brand-purple/20",
    iconColor: "text-brand-amber",
    size: "normal",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Free tier runs entirely local. Your data never leaves your machine unless you choose Pro.",
    gradient: "from-brand-emerald/20 to-brand-cyan/20",
    iconColor: "text-brand-emerald",
    size: "normal",
  },
  {
    icon: RefreshCw,
    title: "Cross-Tool Sync",
    description: "Same memories available in Claude Code, Cursor, and more. One brain, all tools.",
    gradient: "from-brand-cyan/20 to-brand-purple/20",
    iconColor: "text-brand-cyan",
    size: "normal",
  },
  {
    icon: Cpu,
    title: "Built for Developers",
    description: "Native MCP integration. Works with your existing workflow.",
    gradient: "from-brand-purple/20 to-brand-amber/20",
    iconColor: "text-brand-purple",
    size: "large",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
        <div className="absolute inset-0 dot-grid opacity-30" />
      </div>

      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center mb-20">
          <p className="text-sm font-medium text-brand-cyan mb-4 tracking-wider uppercase">
            Features
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Everything your AI needs to{" "}
            <span className="text-gradient-static">remember</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Stop repeating yourself. StrataMind gives your AI assistant the context it needs.
          </p>
        </div>

        {/* Bento grid */}
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`
                group relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 lg:p-8
                transition-all duration-300 hover:border-primary/30 hover:bg-card/80
                ${feature.size === "large" ? "md:col-span-2 lg:col-span-1" : ""}
              `}
            >
              {/* Gradient background on hover */}
              <div
                className={`
                  absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient}
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300
                `}
              />

              {/* Content */}
              <div className="relative">
                {/* Icon */}
                <div className={`
                  mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl
                  bg-secondary/50 border border-border/50
                  group-hover:border-primary/20 transition-colors duration-300
                `}>
                  <feature.icon className={`h-7 w-7 ${feature.iconColor} transition-transform duration-300 group-hover:scale-110`} />
                </div>

                {/* Text */}
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className={`absolute top-4 right-4 w-2 h-2 rounded-full ${feature.iconColor.replace('text-', 'bg-')} animate-pulse`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
