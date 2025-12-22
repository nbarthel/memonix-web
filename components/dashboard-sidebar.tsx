"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Search,
  Settings,
  LogOut,
  Home,
  BarChart3,
  Plus,
} from "lucide-react";

const navigation = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Memories", href: "/dashboard/memories", icon: Brain },
  { name: "Search", href: "/dashboard/search", icon: Search },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user, signout } = useAuth();

  return (
    <div className="flex h-screen w-64 flex-col border-r border-border/40 bg-card/30 backdrop-blur-sm">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-border/40 px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-teal to-brand-teal-dark shadow-lg shadow-brand-teal/20">
          <div className="flex flex-col gap-[2px]">
            <div className="h-[2px] w-2 rounded-full bg-white/70" />
            <div className="h-[2px] w-3 rounded-full bg-white/85" />
            <div className="h-[2px] w-4 rounded-full bg-white/95" />
          </div>
        </div>
        <span className="text-xl font-semibold text-foreground">memoist</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all
                ${
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                }
              `}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Quick action */}
      <div className="border-t border-border/40 p-3">
        <Link href="/dashboard/memories/new">
          <Button className="w-full glow-teal" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Memory
          </Button>
        </Link>
      </div>

      {/* User section */}
      <div className="border-t border-border/40 p-4">
        <div className="mb-3">
          <p className="text-sm font-medium text-foreground truncate">{user?.email}</p>
          <p className="text-xs text-muted-foreground">Free tier</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={signout}
          className="w-full justify-start text-muted-foreground hover:text-foreground"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign out
        </Button>
      </div>
    </div>
  );
}
