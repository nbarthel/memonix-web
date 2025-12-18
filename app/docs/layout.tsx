import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Book, Rocket, Download, Code, ChevronRight } from "lucide-react";

const navigation = [
  {
    title: "Getting Started",
    icon: Rocket,
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Quick Start", href: "/docs/getting-started" },
      { title: "Installation", href: "/docs/installation" },
    ],
  },
  {
    title: "Reference",
    icon: Code,
    items: [
      { title: "API Reference", href: "/docs/api" },
      { title: "Memory Types", href: "/docs/api#memory-types" },
      { title: "Configuration", href: "/docs/api#configuration" },
    ],
  },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-12">
            {/* Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
              <nav className="sticky top-24 space-y-8">
                {navigation.map((section) => (
                  <div key={section.title}>
                    <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                      <section.icon className="h-4 w-4 text-brand-teal" />
                      {section.title}
                    </h4>
                    <ul className="space-y-2 border-l border-border pl-4">
                      {section.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1 min-w-0 max-w-3xl">
              {children}
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
