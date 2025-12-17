import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,rgba(6,182,212,0.12),transparent)]" />
      
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center rounded-full border bg-background px-4 py-1.5 text-sm">
            <span className="mr-2 rounded-full bg-brand-success px-2 py-0.5 text-xs font-medium text-white">
              New
            </span>
            <span className="text-muted-foreground">Now available for Claude Code</span>
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
            <span className="text-gradient-brand">Memory</span> that learns
          </h1>

          {/* Subheadline */}
          <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
            Give your AI coding assistant persistent memory that improves over time.
            Context survives between sessions and syncs across tools.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="#install">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="#pricing">View Pricing</Link>
            </Button>
          </div>

          {/* Install command */}
          <div id="install" className="mt-12 mx-auto max-w-md">
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Terminal className="h-4 w-4" />
                <span>Install in seconds</span>
              </div>
              <code className="block rounded bg-muted px-4 py-3 font-mono text-sm">
                claude plugin install stratamind
              </code>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
