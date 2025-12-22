"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Menu, X, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";

// Memory Layers Mark Component
function MemoryLayersMark({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center rounded-lg bg-gradient-to-br from-brand-teal to-brand-teal-dark shadow-lg shadow-brand-teal/20 ${className}`}>
      {/* Memory Layers */}
      <div className="flex flex-col gap-[3px]">
        <div className="h-[3px] w-3 rounded-full bg-white/70" />
        <div className="h-[3px] w-4 rounded-full bg-white/85" />
        <div className="h-[3px] w-5 rounded-full bg-white/95" />
      </div>
    </div>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-teal/50 to-transparent" />

      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="relative">
            <MemoryLayersMark className="h-9 w-9" />
            {/* Glow on hover */}
            <div className="absolute inset-0 rounded-lg bg-brand-teal/20 opacity-0 blur-md transition-opacity group-hover:opacity-100" />
          </div>
          <span className="text-xl font-semibold text-foreground">
            memoist
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/#features"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </Link>
          <Link
            href="/#pricing"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/docs"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Docs
          </Link>
          <Link
            href="/claude"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Claude Code
          </Link>
          <Link
            href="/cursor"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Cursor
          </Link>
          <Link
            href="/vscode"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            VS Code
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex text-muted-foreground hover:text-foreground"
            asChild
          >
            <Link href="https://github.com/memoist-ai/memoist" className="gap-2">
              <Github className="h-4 w-4" />
              GitHub
            </Link>
          </Button>
          {isAuthenticated ? (
            <Button
              size="sm"
              className="glow-teal bg-primary hover:bg-primary/90"
              asChild
            >
              <Link href="/dashboard">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
            </Button>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:inline-flex"
                asChild
              >
                <Link href="/login">Sign In</Link>
              </Button>
              <Button
                size="sm"
                className="glow-teal bg-primary hover:bg-primary/90"
                asChild
              >
                <Link href="/signup">Get Started</Link>
              </Button>
            </>
          )}

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation Drawer */}
      <div className={`
        md:hidden fixed left-0 right-0 top-16 z-50 border-t border-border/40 bg-background/95 backdrop-blur-xl
        transition-all duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}
      `}>
        <nav className="container mx-auto flex flex-col px-4 py-4 space-y-3 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <Link
            href="/#features"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Features
          </Link>
          <Link
            href="/#pricing"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Pricing
          </Link>
          <Link
            href="/docs"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Docs
          </Link>
          <Link
            href="/claude"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Claude Code
          </Link>
          <Link
            href="/cursor"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Cursor
          </Link>
          <Link
            href="/vscode"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            VS Code
          </Link>
          <div className="pt-2 border-t border-border/40">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-muted-foreground hover:text-foreground"
              asChild
            >
              <Link href="https://github.com/memoist-ai/memoist" className="gap-2" onClick={() => setMobileMenuOpen(false)}>
                <Github className="h-4 w-4" />
                GitHub
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
