"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Code2,
  Zap,
  Shield,
  Users,
  Sparkles,
  Download,
  Terminal,
  Brain,
  GitBranch
} from "lucide-react";

export default function VSCodePage() {
  const supportedTools = [
    { name: "Cursor", icon: "🖱️", description: "AI-first code editor" },
    { name: "Windsurf", icon: "🌊", description: "Agentic IDE" },
    { name: "GitHub Copilot", icon: "🤖", description: "AI pair programmer" },
    { name: "Cline", icon: "🔧", description: "Autonomous coding agent" },
    { name: "Continue", icon: "▶️", description: "Open-source AI assistant" },
    { name: "Kilo", icon: "⚡", description: "AI coding assistant" },
    { name: "Aider", icon: "🎯", description: "AI pair programming" },
    { name: "Roo Code", icon: "🦘", description: "AI code assistant" },
    { name: "VS Code AI", icon: "💡", description: "Native VS Code AI (experimental)" }
  ];

  const features = [
    {
      icon: Code2,
      title: "One Extension, All AI Tools",
      description: "Single installation works with Cursor, Windsurf, Copilot, Cline, Continue, Kilo, Aider, Roo Code, and more. Automatically detects which tools you have installed."
    },
    {
      icon: GitBranch,
      title: "Syncs with Terminal",
      description: "Use Claude Code in terminal and VS Code extension simultaneously. Memories automatically sync via .claude/memory.db. No configuration needed."
    },
    {
      icon: Brain,
      title: "Persistent Memory",
      description: "Your AI assistant remembers facts, procedures, preferences, and patterns across all sessions. Context never gets lost between projects."
    },
    {
      icon: Zap,
      title: "Auto-Capture",
      description: "Automatically captures file changes, commands, and coding patterns. Enriches AI prompts with relevant context from your memory graph."
    },
    {
      icon: Shield,
      title: "100% Local (Free)",
      description: "Free tier runs completely locally with SQLite. Zero data sent to cloud. Concurrent access across multiple VS Code windows."
    },
    {
      icon: Users,
      title: "Team Memories (Pro)",
      description: "Upgrade to Pro for cloud sync, team sharing, adaptive learning, and unlimited storage. Memories sync across machines."
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Install Extension",
      description: "One-click install from VS Code Marketplace. Works with any AI coding assistant."
    },
    {
      step: "2",
      title: "Auto-Detection",
      description: "Memoist detects which AI tools you have (Cursor, Copilot, Cline, etc.) and adapts automatically."
    },
    {
      step: "3",
      title: "Start Coding",
      description: "Your AI gets memory superpowers. Facts, procedures, and preferences are remembered forever."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-brand-teal/10 blur-[120px] animate-glow-pulse" />
            <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-brand-amber/5 blur-[100px] animate-glow-pulse [animation-delay:1.5s]" />
            <div className="absolute inset-0 grid-bg opacity-40" />
          </div>

          <div className="container mx-auto px-4 py-24">
            <div className="mx-auto max-w-4xl text-center">
              {/* Badge */}
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-brand-teal/20 bg-brand-teal/5 px-4 py-2 text-sm backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-brand-teal" />
                <span className="text-muted-foreground">Universal VS Code Extension</span>
                <span className="h-1 w-1 rounded-full bg-brand-emerald animate-pulse" />
              </div>

              {/* Headline */}
              <h1 className="mb-6">
                <span className="block font-display text-5xl sm:text-7xl tracking-tight text-gradient-static">
                  Memory for
                </span>
                <span className="block mt-2 text-4xl sm:text-6xl font-bold text-foreground/90">
                  Every AI Tool
                </span>
              </h1>

              {/* Subheadline */}
              <p className="mx-auto max-w-2xl mb-10 text-lg sm:text-xl text-muted-foreground leading-relaxed">
                One extension. Nine AI tools. Zero configuration.
                <span className="block mt-2 text-foreground/70">
                  Cursor, Windsurf, Copilot, Cline, Continue, Kilo, and more.
                </span>
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Button size="lg" className="group glow-teal text-base px-8" asChild>
                  <a href="vscode:extension/memoist.memoist" target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" />
                    Install from Marketplace
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base px-8 border-border/50 hover:bg-secondary/50 hover:border-brand-teal/30"
                  asChild
                >
                  <Link href="https://github.com/memoist-ai/memoist/tree/main/plugins/vscode">
                    View on GitHub
                  </Link>
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
                <div>
                  <div className="text-3xl font-bold text-brand-teal mb-1">9+</div>
                  <div className="text-sm text-muted-foreground">AI Tools Supported</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-brand-teal mb-1">100%</div>
                  <div className="text-sm text-muted-foreground">Local (Free Tier)</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-brand-teal mb-1">10K</div>
                  <div className="text-sm text-muted-foreground">Free Memories</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Supported Tools Grid */}
        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Works with <span className="text-gradient-static">Every AI Tool</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Memoist automatically detects which AI coding assistants you have installed
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {supportedTools.map((tool) => (
                <div
                  key={tool.name}
                  className="gradient-border rounded-xl p-[1px] hover:scale-105 transition-transform"
                >
                  <div className="rounded-xl bg-card/80 backdrop-blur-sm p-6 h-full">
                    <div className="text-4xl mb-3">{tool.icon}</div>
                    <h3 className="font-semibold text-lg mb-2">{tool.name}</h3>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                <span className="text-gradient-static">Powerful</span> Features
              </h2>
              <p className="text-lg text-muted-foreground">
                Everything you need for persistent AI memory
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="gradient-border rounded-xl p-[1px]"
                >
                  <div className="rounded-xl bg-card/80 backdrop-blur-sm p-6 h-full">
                    <feature.icon className="h-10 w-10 text-brand-teal mb-4" />
                    <h3 className="font-semibold text-xl mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                <span className="text-gradient-static">Easy</span> Setup
              </h2>
              <p className="text-lg text-muted-foreground">
                Get started in under 60 seconds
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {howItWorks.map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-teal/10 text-brand-teal text-2xl font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-xl mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Install Command */}
            <div className="mt-16 mx-auto max-w-lg">
              <div className="gradient-border rounded-xl p-[1px]">
                <div className="rounded-xl bg-card/80 backdrop-blur-sm p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Terminal className="h-4 w-4 text-brand-teal" />
                    <span>Or install via command</span>
                  </div>
                  <code className="block rounded-lg bg-background/80 px-4 py-3 font-mono text-sm text-foreground">
                    <span className="text-brand-amber">$</span>{" "}
                    <span className="text-brand-teal">code</span>{" "}
                    <span className="text-muted-foreground">--install-extension</span>{" "}
                    <span className="text-brand-emerald">memoist.memoist</span>
                  </code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Free vs Pro */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Free Tier <span className="text-gradient-static">&</span> Pro
              </h2>
              <p className="text-lg text-muted-foreground">
                Start free, upgrade when you need more
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Free Tier */}
              <div className="gradient-border rounded-xl p-[1px]">
                <div className="rounded-xl bg-card/80 backdrop-blur-sm p-8">
                  <h3 className="text-2xl font-bold mb-2">Free Tier</h3>
                  <p className="text-3xl font-bold text-brand-teal mb-6">$0/month</p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-brand-emerald mt-0.5" />
                      <span>10,000 memories</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-brand-emerald mt-0.5" />
                      <span>100% local storage</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-brand-emerald mt-0.5" />
                      <span>Memory hierarchy & types</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-brand-emerald mt-0.5" />
                      <span>Semantic search</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-brand-emerald mt-0.5" />
                      <span>Auto-capture events</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-brand-emerald mt-0.5" />
                      <span>All AI tools supported</span>
                    </li>
                  </ul>
                  <Button size="lg" className="w-full" variant="outline" asChild>
                    <a href="vscode:extension/memoist.memoist">
                      Install Extension
                    </a>
                  </Button>
                </div>
              </div>

              {/* Pro Tier */}
              <div className="gradient-border rounded-xl p-[1px]">
                <div className="rounded-xl bg-card/80 backdrop-blur-sm p-8">
                  <div className="inline-block rounded-full bg-brand-teal/10 px-3 py-1 text-sm text-brand-teal mb-4">
                    Recommended
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Pro Tier</h3>
                  <p className="text-3xl font-bold text-brand-teal mb-2">$8/month</p>
                  <p className="text-sm text-muted-foreground mb-6">or $80/year (save 17%)</p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-brand-emerald mt-0.5" />
                      <span className="font-semibold">Everything in Free, plus:</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-brand-emerald mt-0.5" />
                      <span>Unlimited memories</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-brand-emerald mt-0.5" />
                      <span>Cloud sync across machines</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-brand-emerald mt-0.5" />
                      <span>Smart context assembly (auto-optimized)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-brand-emerald mt-0.5" />
                      <span>Adaptive learning (improves over time)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-brand-emerald mt-0.5" />
                      <span>Unlimited documentation sources</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-brand-emerald mt-0.5" />
                      <span>Multi-workspace codebase indexing</span>
                    </li>
                  </ul>
                  <Button size="lg" className="w-full glow-teal" asChild>
                    <Link href="/signup">
                      Upgrade to Pro
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to give your AI <span className="text-gradient-static">memory</span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Install Memoist and watch your AI assistant get smarter over time
              </p>
              <Button size="lg" className="group glow-teal text-base px-8" asChild>
                <a href="vscode:extension/memoist.memoist">
                  <Download className="mr-2 h-4 w-4" />
                  Install from VS Code Marketplace
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
