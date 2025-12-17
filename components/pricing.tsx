import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for trying StrataMind or privacy-sensitive work.",
    features: [
      "Semantic search",
      "Local storage",
      "10,000 memories",
      "Single tool",
      "Privacy: data stays local",
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
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Start free, upgrade when you need more power.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-2">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl border p-8 ${
                tier.featured
                  ? "border-primary bg-card shadow-lg ring-1 ring-primary"
                  : "bg-card"
              }`}
            >
              {tier.featured && (
                <div className="mb-4 inline-block rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold">{tier.name}</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold tracking-tight">{tier.price}</span>
                {tier.period && (
                  <span className="ml-1 text-muted-foreground">{tier.period}</span>
                )}
              </div>
              <p className="mt-4 text-muted-foreground">{tier.description}</p>

              <ul className="mt-8 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-brand-success flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="mt-8 w-full"
                variant={tier.featured ? "default" : "outline"}
                asChild
              >
                <Link href={tier.href}>{tier.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
