/**
 * Session Manager
 *
 * Tracks user sessions for implicit project association.
 * Compatible with Claude/Cursor session models.
 *
 * Metadata Structure (stored with each memory):
 *
 * REQUIRED FIELDS:
 * - tenant_id: User ID (MUST - for multi-tenancy isolation)
 * - user_id: User ID (MUST - same as tenant_id, for clarity)
 * - user_email: User email (MUST - for team memories future support)
 * - session_id: Session identifier (MUST - Claude session ID or auto-generated)
 * - session_start: Session start timestamp (MUST)
 *
 * OPTIONAL FIELDS:
 * - project_id: Project identifier (from Claude/Cursor or user-defined)
 * - project_name: Human-readable project name
 * - project_path: File system path to project
 * - session_name: Human-readable session name
 * - source: "dashboard" | "claude" | "cursor" | "api"
 * - created_via: "web-ui" | "mcp" | "api"
 */

const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
const SESSION_STORAGE_KEY = 'memonix_current_session';
const LAST_ACTIVITY_KEY = 'memonix_last_activity';
const PROJECT_STORAGE_KEY = 'memonix_current_project';

export interface Project {
  id: string;
  name: string;
  path?: string;
}

export interface Session {
  id: string;
  name?: string;
  startedAt: string;
  lastActivity: string;
  memoryCount: number;
  projectId?: string;
  projectName?: string;
}

/**
 * Generate a new session ID
 */
function generateSessionId(): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  return `session-${timestamp}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Get the current active session or create a new one
 */
export function getCurrentSession(): Session {
  const now = new Date().toISOString();
  const storedSession = localStorage.getItem(SESSION_STORAGE_KEY);
  const lastActivity = localStorage.getItem(LAST_ACTIVITY_KEY);

  // Check if we should start a new session
  if (storedSession && lastActivity) {
    const session: Session = JSON.parse(storedSession);
    const lastActivityTime = new Date(lastActivity).getTime();
    const currentTime = new Date().getTime();
    const timeSinceActivity = currentTime - lastActivityTime;

    // If less than 30 minutes since last activity, continue current session
    if (timeSinceActivity < SESSION_TIMEOUT_MS) {
      // Update last activity
      localStorage.setItem(LAST_ACTIVITY_KEY, now);
      session.lastActivity = now;
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
      return session;
    }
  }

  // Create new session
  const newSession: Session = {
    id: generateSessionId(),
    startedAt: now,
    lastActivity: now,
    memoryCount: 0,
  };

  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newSession));
  localStorage.setItem(LAST_ACTIVITY_KEY, now);

  return newSession;
}

/**
 * Update the current session's memory count
 */
export function incrementSessionMemoryCount(): void {
  const session = getCurrentSession();
  session.memoryCount += 1;
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

/**
 * Name the current session
 */
export function nameCurrentSession(name: string): void {
  const session = getCurrentSession();
  session.name = name;
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

/**
 * Manually start a new session
 */
export function startNewSession(name?: string): Session {
  const now = new Date().toISOString();
  const newSession: Session = {
    id: generateSessionId(),
    name,
    startedAt: now,
    lastActivity: now,
    memoryCount: 0,
  };

  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newSession));
  localStorage.setItem(LAST_ACTIVITY_KEY, now);

  return newSession;
}

/**
 * Get current project
 */
export function getCurrentProject(): Project | null {
  const stored = localStorage.getItem(PROJECT_STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
}

/**
 * Set current project
 */
export function setCurrentProject(project: Project | null): void {
  if (project) {
    localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(project));
  } else {
    localStorage.removeItem(PROJECT_STORAGE_KEY);
  }
}

/**
 * Get session metadata for storing with memories
 * CRITICAL: All REQUIRED fields must be present
 *
 * @param userId - User ID (becomes tenant_id and user_id)
 * @param userEmail - User email
 * @returns Metadata object with all required and optional fields
 */
export function getSessionMetadata(userId: string, userEmail: string): Record<string, any> {
  const session = getCurrentSession();
  const project = getCurrentProject();

  // Build metadata object with REQUIRED fields
  const metadata: Record<string, any> = {
    // REQUIRED: Multi-tenancy and user tracking
    tenant_id: userId,
    user_id: userId,
    user_email: userEmail,

    // REQUIRED: Session tracking
    session_id: session.id,
    session_start: session.startedAt,

    // Source tracking (helps with debugging/analytics)
    source: "dashboard",
    created_via: "web-ui",
  };

  // OPTIONAL: Project association
  if (project?.id || session.projectId) {
    metadata.project_id = project?.id || session.projectId;
  }
  if (project?.name || session.projectName) {
    metadata.project_name = project?.name || session.projectName;
  }
  if (project?.path) {
    metadata.project_path = project.path;
  }

  // OPTIONAL: Session name
  if (session.name) {
    metadata.session_name = session.name;
  }

  return metadata;
}

/**
 * Clear session data (on logout)
 */
export function clearSession(): void {
  localStorage.removeItem(SESSION_STORAGE_KEY);
  localStorage.removeItem(LAST_ACTIVITY_KEY);
  localStorage.removeItem(PROJECT_STORAGE_KEY);
}

/**
 * Import Claude/Cursor session
 * For when users export their Claude session files
 */
export function importClaudeSession(sessionId: string, sessionName?: string, projectPath?: string): Session {
  const now = new Date().toISOString();

  // Extract project name from path if provided
  let projectId: string | undefined;
  let projectName: string | undefined;

  if (projectPath) {
    projectName = projectPath.split('/').pop() || projectPath;
    projectId = `project-${projectName.toLowerCase().replace(/\s+/g, '-')}`;
  }

  const newSession: Session = {
    id: sessionId, // Use Claude's session ID
    name: sessionName,
    startedAt: now,
    lastActivity: now,
    memoryCount: 0,
    projectId,
    projectName,
  };

  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newSession));
  localStorage.setItem(LAST_ACTIVITY_KEY, now);

  return newSession;
}
