"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Lock, AlertCircle, Check } from "lucide-react";

export default function SignupPage() {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordRequirements = [
    { met: password.length >= 8, text: "At least 8 characters" },
    { met: /[A-Z]/.test(password), text: "One uppercase letter" },
    { met: /[a-z]/.test(password), text: "One lowercase letter" },
    { met: /[0-9]/.test(password), text: "One number" },
  ];

  const isPasswordValid = passwordRequirements.every((req) => req.met);
  const passwordsMatch = password === confirmPassword && confirmPassword !== "";
  const isEmailValid = email.length > 0 && email.includes("@");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    console.log("Signup form submitted", { email, passwordValid: isPasswordValid, passwordsMatch });

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    if (!isPasswordValid) {
      setError("Password does not meet requirements");
      return;
    }

    if (!passwordsMatch) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    console.log("Calling signup API...");

    try {
      await signup(email, password);
      console.log("Signup successful!");
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err.message || "Failed to sign up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-12">
      {/* Background effects */}
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

        {/* Signup card */}
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
                Create your account and start building persistent memory
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
                    autoComplete="new-password"
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                  />
                </div>

                {/* Password requirements */}
                {password && (
                  <div className="mt-3 space-y-2">
                    {passwordRequirements.map((req, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs">
                        <div
                          className={`flex h-4 w-4 items-center justify-center rounded-full ${
                            req.met ? "bg-brand-emerald/20" : "bg-secondary"
                          }`}
                        >
                          {req.met && <Check className="h-3 w-3 text-brand-emerald" />}
                        </div>
                        <span className={req.met ? "text-foreground" : "text-muted-foreground"}>
                          {req.text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                  />
                  {confirmPassword && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {passwordsMatch ? (
                        <Check className="h-5 w-5 text-brand-emerald" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-destructive" />
                      )}
                    </div>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading || !isEmailValid || !isPasswordValid || !passwordsMatch}
                className="w-full glow-teal"
                size="lg"
              >
                {loading ? "Creating account..." : "Create Account"}
              </Button>

              {/* Validation helper text */}
              {(!isEmailValid || !isPasswordValid || !passwordsMatch) && (
                <p className="text-xs text-center text-muted-foreground mt-2">
                  {!isEmailValid && "Please enter a valid email address. "}
                  {!isPasswordValid && "Password must meet all requirements. "}
                  {!passwordsMatch && confirmPassword && "Passwords must match."}
                </p>
              )}
            </form>

            {/* Footer */}
            <div className="mt-6 pt-6 border-t border-border/40 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Additional info */}
        <p className="mt-6 text-center text-xs text-muted-foreground/60">
          By creating an account, you agree to our{" "}
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
