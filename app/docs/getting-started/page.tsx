import Link from "next/link";
import { Metadata } from "next";
import { Terminal, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Quick Start - Memoist",
  description: "Get started with Memoist in under 2 minutes.",
};

export default function GettingStartedPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">Quick Start</h1>
        <p className="text-xl text-muted-foreground">
          Get Memoist running in under 2 minutes.
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-8">
        {/* Step 1 */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-cyan/20 text-brand-cyan font-semibold text-sm">
              1
            </span>
            <h2 className="text-xl font-semibold">Install the plugin</h2>
          </div>
          <div className="ml-11">
            <p className="text-muted-foreground mb-4">
              Choose your AI tool and run the install command:
            </p>

            {/* Claude Code */}
            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Claude Code</p>
              <div className="rounded-lg bg-card border border-border p-4">
                <code className="text-sm">
                  <span className="text-brand-purple">$</span>{" "}
                  <span className="text-brand-cyan">claude</span>{" "}
                  <span className="text-muted-foreground">plugin install</span>{" "}
                  <span className="text-brand-emerald">memoist</span>
                </code>
              </div>
            </div>

            {/* Cursor */}
            <div>
              <p className="text-sm font-medium mb-2">Cursor</p>
              <div className="rounded-lg bg-card border border-border p-4">
                <code className="text-sm">
                  <span className="text-brand-purple">$</span>{" "}
                  <span className="text-brand-cyan">cursor</span>{" "}
                  <span className="text-muted-foreground">mcp install</span>{" "}
                  <span className="text-brand-emerald">memoist</span>
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-cyan/20 text-brand-cyan font-semibold text-sm">
              2
            </span>
            <h2 className="text-xl font-semibold">Start using memory</h2>
          </div>
          <div className="ml-11">
            <p className="text-muted-foreground mb-4">
              Your AI assistant now has access to memory tools. Try these examples:
            </p>

            <div className="space-y-3">
              <div className="rounded-lg bg-card border border-border p-4">
                <p className="text-sm text-muted-foreground mb-2">Add a memory:</p>
                <code className="text-sm text-foreground">
                  &quot;Remember that I prefer TypeScript over JavaScript&quot;
                </code>
              </div>

              <div className="rounded-lg bg-card border border-border p-4">
                <p className="text-sm text-muted-foreground mb-2">Query memories:</p>
                <code className="text-sm text-foreground">
                  &quot;What are my coding preferences?&quot;
                </code>
              </div>

              <div className="rounded-lg bg-card border border-border p-4">
                <p className="text-sm text-muted-foreground mb-2">Add project context:</p>
                <code className="text-sm text-foreground">
                  &quot;Remember: This project uses Tailwind CSS and shadcn/ui&quot;
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-cyan/20 text-brand-cyan font-semibold text-sm">
              3
            </span>
            <h2 className="text-xl font-semibold">That&apos;s it!</h2>
          </div>
          <div className="ml-11">
            <p className="text-muted-foreground mb-4">
              Memoist automatically saves and retrieves relevant context. Your memories
              persist between sessions and improve over time.
            </p>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-brand-emerald/10 border border-brand-emerald/20">
              <CheckCircle className="h-5 w-5 text-brand-emerald shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Free tier included</p>
                <p className="text-sm text-muted-foreground">
                  Store up to 10,000 memories locally. No account required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next steps */}
      <div className="border-t border-border pt-8 space-y-4">
        <h3 className="text-lg font-semibold">Next steps</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/docs/installation"
            className="group flex items-center justify-between rounded-lg border border-border p-4 hover:border-primary/30 transition-colors"
          >
            <div>
              <p className="font-medium">Installation options</p>
              <p className="text-sm text-muted-foreground">Manual setup, configuration</p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          </Link>
          <Link
            href="/docs/api"
            className="group flex items-center justify-between rounded-lg border border-border p-4 hover:border-primary/30 transition-colors"
          >
            <div>
              <p className="font-medium">API Reference</p>
              <p className="text-sm text-muted-foreground">All memory tools explained</p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          </Link>
        </div>
      </div>
    </div>
  );
}
