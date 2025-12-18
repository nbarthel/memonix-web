"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Lock, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const { signin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isEmailValid = email.length > 0 && email.includes("@");
  const isPasswordValid = password.length >= 8;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    console.log("Login form submitted", { email, passwordLength: password.length });

    if (!isEmailValid) {
      setError("Please enter a valid email address");
      return;
    }

    if (!isPasswordValid) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    console.log("Calling signin API...");

    try {
      await signin(email, password);
      console.log("Signin successful!");
    } catch (err: any) {
      console.error("Signin error:", err);
      setError(err.message || "Failed to sign in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background effects - consistent with brand */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-brand-teal/10 blur-[120px] animate-glow-pulse" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-brand-emerald/5 blur-[100px] animate-glow-pulse" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 noise" />
      </div>

      <div className="w-full max-w-md px-4">
        {/* Back to home */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        {/* Login card */}
        <div className="gradient-border rounded-2xl p-[1px]">
          <div className="rounded-2xl bg-card/80 backdrop-blur-sm p-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-teal to-brand-teal-dark shadow-lg shadow-brand-teal/20">
                  <div className="flex flex-col gap-[2px]">
                    <div className="h-[2px] w-2 rounded-full bg-white/70" />
                    <div className="h-[2px] w-3 rounded-full bg-white/85" />
                    <div className="h-[2px] w-4 rounded-full bg-white/95" />
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-foreground">memonix</h1>
              </div>
              <p className="text-muted-foreground">
                Sign in to your account to access your memories
              </p>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-6 flex items-start gap-3 rounded-lg bg-destructive/10 border border-destructive/20 p-4">
                <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                    minLength={8}
                    className="w-full pl-11 pr-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading || !isEmailValid || !isPasswordValid}
                className="w-full glow-teal"
                size="lg"
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-6 pt-6 border-t border-border/40 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Additional info */}
        <p className="mt-6 text-center text-xs text-muted-foreground/60">
          By signing in, you agree to our{" "}
          <Link href="/terms" className="hover:text-muted-foreground transition-colors">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="hover:text-muted-foreground transition-colors">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
