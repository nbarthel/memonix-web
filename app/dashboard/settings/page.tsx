"use client";

import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { User, Mail, Shield, Trash2, LogOut } from "lucide-react";

export default function SettingsPage() {
  const { user, signout } = useAuth();

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/10" />
        <div className="absolute inset-0 dot-grid opacity-20" />
      </div>

      <div className="container mx-auto px-6 py-8 max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>

        <div className="space-y-6">
          {/* Account Information */}
          <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                <User className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Account</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-background border border-border">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{user?.email}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Plan
                </label>
                <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-background border border-border">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">Free Tier</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Upgrade to Pro
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="rounded-xl border border-destructive/50 bg-destructive/5 backdrop-blur-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10 border border-destructive/20">
                <Trash2 className="h-5 w-5 text-destructive" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Danger Zone</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-1">
                    Sign Out
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Sign out of your current session
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={signout}
                  className="border-destructive/50 text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>

              <div className="pt-4 border-t border-destructive/20">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-1">
                      Delete Account
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Permanently delete your account and all memories
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-destructive/50 text-destructive hover:bg-destructive/10"
                    onClick={() => alert("Account deletion is not yet implemented")}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
