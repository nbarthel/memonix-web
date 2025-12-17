import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for trying Memonix or privacy-sensitive work.",
    features: [
      "Semantic search",
      "Local storage",
      "10,000 memories",
      "Single tool integration",
      "Data stays on your machine",
    ],
    cta: "Get Started",
    href: "#install",
    featured: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "For power users who want the full experience.",
    features: [
      "Everything in Free",
      "Adaptive learning",
      "Deep context retrieval",
      "Intelligent ranking",
      "Unlimited memories",
      "Cross-tool sync",
      "Priority support",
    ],
    cta: "Upgrade to Pro",
    href: "/upgrade",
    featured: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/10" />
        {/* Subtle orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-brand-cyan/5 blur-[150px]" />
      </div>

      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-sm font-medium text-brand-cyan mb-4 tracking-wider uppercase">
            Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Simple, transparent{" "}
            <span className="text-gradient-static">pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Start free, upgrade when you need more power.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-2">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`
                relative rounded-2xl p-8 lg:p-10 transition-all duration-300
                ${tier.featured
                  ? "bg-gradient-to-b from-card to-card/50 border-2 border-primary/50 glow-cyan"
                  : "bg-card/50 border border-border/50 hover:border-border"
                }
              `}
            >
              {/* Featured badge */}
              {tier.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground shadow-lg">
                    <Sparkles className="h-3.5 w-3.5" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan name */}
              <h3 className="text-xl font-semibold text-foreground">{tier.name}</h3>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-1">
                <span className={`text-5xl font-bold tracking-tight ${tier.featured ? "text-gradient-static" : "text-foreground"}`}>
                  {tier.price}
                </span>
                {tier.period && (
                  <span className="text-muted-foreground">{tier.period}</span>
                )}
              </div>

              {/* Description */}
              <p className="mt-4 text-muted-foreground">{tier.description}</p>

              {/* Divider */}
              <div className="my-8 h-px bg-border/50" />

              {/* Features */}
              <ul className="space-y-4">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className={`mt-0.5 rounded-full p-1 ${tier.featured ? "bg-brand-cyan/20" : "bg-secondary"}`}>
                      <Check className={`h-3.5 w-3.5 ${tier.featured ? "text-brand-cyan" : "text-brand-emerald"}`} />
                    </div>
                    <span className="text-sm text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                className={`mt-8 w-full ${tier.featured ? "glow-cyan" : ""}`}
                variant={tier.featured ? "default" : "outline"}
                size="lg"
                asChild
              >
                <Link href={tier.href}>{tier.cta}</Link>
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="mt-12 text-center text-sm text-muted-foreground">
          All plans include access to our Discord community and documentation.
        </p>
      </div>
    </section>
  );
}
