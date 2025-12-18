"use client";

import { ProtectedRoute } from "@/components/protected-route";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { SessionIndicator } from "@/components/session-indicator";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen overflow-hidden bg-background">
        <DashboardSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/50 px-6 py-4">
            <SessionIndicator />
          </div>
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
