import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Terminal, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Layered background effects */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />

        {/* Cyan orb - top right */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-brand-cyan/10 blur-[120px] animate-glow-pulse" />

        {/* Purple orb - bottom left */}
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-brand-purple/10 blur-[100px] animate-glow-pulse [animation-delay:1.5s]" />

        {/* Grid overlay */}
        <div className="absolute inset-0 grid-bg opacity-40" />

        {/* Noise texture */}
        <div className="absolute inset-0 noise" />

        {/* Floating strata layers */}
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent" />
        <div className="absolute top-2/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
      </div>

      <div className="container mx-auto px-4 py-24">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="fade-up-stagger stagger-1 mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-brand-cyan" />
            <span className="text-muted-foreground">Now available for Claude Code</span>
            <span className="h-1 w-1 rounded-full bg-brand-emerald animate-pulse" />
          </div>

          {/* Headline */}
          <h1 className="fade-up-stagger stagger-2 mb-6">
            <span className="block font-display text-5xl sm:text-7xl lg:text-8xl tracking-tight">
              <span className="text-gradient-static">Memory</span>
            </span>
            <span className="block mt-2 text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground/90">
              that learns
            </span>
          </h1>

          {/* Subheadline */}
          <p className="fade-up-stagger stagger-3 mx-auto max-w-2xl mb-10 text-lg sm:text-xl text-muted-foreground leading-relaxed">
            Give your AI coding assistant persistent memory that improves over time.
            <span className="block mt-2 text-foreground/70">
              Context survives between sessions. Syncs across tools.
            </span>
          </p>

          {/* CTAs */}
          <div className="fade-up-stagger stagger-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="group glow-cyan text-base px-8" asChild>
              <Link href="#install">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-base px-8 border-border/50 hover:bg-secondary/50 hover:border-primary/30"
              asChild
            >
              <Link href="#pricing">View Pricing</Link>
            </Button>
          </div>

          {/* Install command */}
          <div id="install" className="fade-up-stagger stagger-5 mt-16 mx-auto max-w-lg">
            <div className="gradient-border rounded-xl p-[1px]">
              <div className="rounded-xl bg-card/80 backdrop-blur-sm p-5">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-brand-cyan" />
                    <span>Install in seconds</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-red-500/60" />
                    <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
                    <span className="h-3 w-3 rounded-full bg-green-500/60" />
                  </div>
                </div>
                <div className="relative">
                  <code className="block rounded-lg bg-background/80 px-4 py-3 font-mono text-sm text-foreground">
                    <span className="text-brand-purple">$</span>{" "}
                    <span className="text-brand-cyan">claude</span>{" "}
                    <span className="text-muted-foreground">plugin install</span>{" "}
                    <span className="text-brand-emerald">memonix</span>
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
