import Link from "next/link";
import { Github, Twitter, Disc } from "lucide-react";

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Documentation", href: "https://docs.memonix.dev" },
    { label: "Changelog", href: "/changelog" },
  ],
  resources: [
    { label: "Getting Started", href: "https://docs.memonix.dev/getting-started" },
    { label: "GitHub", href: "https://github.com/memonix/memonix" },
    { label: "Discord", href: "https://discord.gg/memonix" },
    { label: "Blog", href: "/blog" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-border/40 bg-card/30">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background to-transparent" />

      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="group inline-flex items-center gap-2.5">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-cyan to-brand-purple shadow-lg shadow-brand-cyan/20">
                <span className="text-lg font-bold text-white">M</span>
              </div>
              <span className="text-xl font-semibold text-foreground">
                Memo<span className="text-gradient-static">nix</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Memory that learns. Persistent, trainable memory for AI coding assistants.
            </p>
            <div className="mt-6 flex gap-4">
              <Link
                href="https://github.com/memonix"
                className="group flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/50 border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
              >
                <Github className="h-4 w-4" />
              </Link>
              <Link
                href="https://twitter.com/memonix"
                className="group flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/50 border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
              >
                <Twitter className="h-4 w-4" />
              </Link>
              <Link
                href="https://discord.gg/memonix"
                className="group flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/50 border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
              >
                <Disc className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border/40">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Memonix. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/60">
              Built for developers who demand more from their AI.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
