import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Menu } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-cyan to-brand-purple shadow-lg shadow-brand-cyan/20">
            <span className="text-lg font-bold text-white">M</span>
            {/* Glow on hover */}
            <div className="absolute inset-0 rounded-lg bg-brand-cyan/20 opacity-0 blur-md transition-opacity group-hover:opacity-100" />
          </div>
          <span className="text-xl font-semibold text-foreground">
            Memo<span className="text-gradient-static">nix</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#features"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="https://docs.memonix.dev"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Docs
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
            <Link href="https://github.com/memonix/memonix" className="gap-2">
              <Github className="h-4 w-4" />
              GitHub
            </Link>
          </Button>
          <Button
            size="sm"
            className="glow-cyan bg-primary hover:bg-primary/90"
            asChild
          >
            <Link href="#install">Get Started</Link>
          </Button>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
