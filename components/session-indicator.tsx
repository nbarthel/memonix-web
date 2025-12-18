"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { FolderOpen, Plus, Edit2, Check, X } from "lucide-react";
import { getCurrentSession, startNewSession, nameCurrentSession, type Session } from "@/lib/session-manager";

export function SessionIndicator() {
  const [session, setSession] = useState<Session | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    // Get current session on mount
    const currentSession = getCurrentSession();
    setSession(currentSession);
    setNewName(currentSession.name || "");
  }, []);

  const handleStartNewSession = () => {
    const newSession = startNewSession();
    setSession(newSession);
    setNewName("");
  };

  const handleSaveName = () => {
    if (newName.trim()) {
      nameCurrentSession(newName.trim());
      const updatedSession = getCurrentSession();
      setSession(updatedSession);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setNewName(session?.name || "");
    setIsEditing(false);
  };

  if (!session) return null;

  const sessionDuration = () => {
    const start = new Date(session.startedAt);
    const now = new Date();
    const diffMs = now.getTime() - start.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just started";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-card/50 border border-border/50">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
        <FolderOpen className="h-4 w-4 text-primary" />
      </div>

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Name this session..."
              className="flex-1 px-3 py-1 text-sm rounded-md bg-background border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveName();
                if (e.key === "Escape") handleCancelEdit();
              }}
            />
            <Button
              size="sm"
              variant="ghost"
              onClick={handleSaveName}
              className="h-7 w-7 p-0"
            >
              <Check className="h-4 w-4 text-brand-teal" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCancelEdit}
              className="h-7 w-7 p-0"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-foreground">
              {session.name || "Unnamed Session"}
            </p>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Edit2 className="h-3 w-3 text-muted-foreground" />
            </Button>
          </div>
        )}
        <p className="text-xs text-muted-foreground">
          Started {sessionDuration()} • {session.memoryCount} {session.memoryCount === 1 ? "memory" : "memories"}
        </p>
      </div>

      <Button
        size="sm"
        variant="outline"
        onClick={handleStartNewSession}
        className="whitespace-nowrap"
      >
        <Plus className="h-4 w-4 mr-2" />
        New Session
      </Button>
    </div>
  );
}
