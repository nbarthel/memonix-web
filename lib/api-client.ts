/**
 * Memonix Cloud API Client
 *
 * Connects to the memonix-cloud REST API for authenticated operations.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
  };
}

interface Memory {
  id: string;
  content: string;
  node_type: string;
  importance: number;
  created_at: string;
  metadata?: Record<string, any>;
}

interface QueryResult {
  nodes: Array<{
    id: string;
    content: string;
    node_type: string;
    importance: number;
    similarity: number;
    relevance: string;
    metadata: Record<string, any>;
  }>;
  total_found: number;
  query_method: string;
  execution_time_ms: number;
}

interface Stats {
  backend: string;
  user_id: string;
  total_nodes: number;
  total_edges: number;
  node_types: Record<string, number>;
  edge_types: Record<string, number>;
}

export class MemonixAPIClient {
  private baseURL: string;

  constructor(baseURL: string = API_URL) {
    this.baseURL = baseURL;
  }

  private getAuthHeader(): Record<string, string> {
    const token = this.getStoredToken();
    if (!token) {
      throw new Error("Not authenticated");
    }
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }

  private getStoredToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("memonix_access_token");
  }

  private storeAuth(data: AuthResponse): void {
    if (typeof window === "undefined") return;
    localStorage.setItem("memonix_access_token", data.access_token);
    localStorage.setItem("memonix_refresh_token", data.refresh_token);
    localStorage.setItem("memonix_user", JSON.stringify(data.user));
  }

  clearAuth(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem("memonix_access_token");
    localStorage.removeItem("memonix_refresh_token");
    localStorage.removeItem("memonix_user");
  }

  getStoredUser(): { id: string; email: string } | null {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem("memonix_user");
    return userStr ? JSON.parse(userStr) : null;
  }

  // Auth endpoints
  async signup(email: string, password: string): Promise<AuthResponse> {
    console.log(`Calling signup API: ${this.baseURL}/auth/signup`);

    try {
      const response = await fetch(`${this.baseURL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      console.log("Signup response status:", response.status);

      if (!response.ok) {
        let errorMessage = "Signup failed";
        try {
          const error = await response.json();
          errorMessage = error.detail || error.message || errorMessage;
        } catch (e) {
          errorMessage = `Signup failed with status ${response.status}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("Signup successful, storing auth data");
      this.storeAuth(data);
      return data;
    } catch (error: any) {
      console.error("Signup network error:", error);
      if (error.message.includes("fetch")) {
        throw new Error(`Cannot connect to API at ${this.baseURL}. Make sure the backend is running.`);
      }
      throw error;
    }
  }

  async signin(email: string, password: string): Promise<AuthResponse> {
    console.log(`Calling signin API: ${this.baseURL}/auth/signin`);

    try {
      const response = await fetch(`${this.baseURL}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      console.log("Signin response status:", response.status);

      if (!response.ok) {
        let errorMessage = "Invalid credentials";
        try {
          const error = await response.json();
          errorMessage = error.detail || error.message || errorMessage;
        } catch (e) {
          errorMessage = `Signin failed with status ${response.status}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("Signin successful, storing auth data");
      this.storeAuth(data);
      return data;
    } catch (error: any) {
      console.error("Signin network error:", error);
      if (error.message.includes("fetch")) {
        throw new Error(`Cannot connect to API at ${this.baseURL}. Make sure the backend is running.`);
      }
      throw error;
    }
  }

  // Memory endpoints
  async createMemory(
    content: string,
    nodeType: string = "fact",
    importance: number = 0.5,
    metadata?: Record<string, any>
  ): Promise<Memory> {
    console.log(`Creating memory: ${this.baseURL}/v1/memory`, { content, nodeType, importance });

    const response = await fetch(`${this.baseURL}/v1/memory`, {
      method: "POST",
      headers: this.getAuthHeader(),
      body: JSON.stringify({
        content,
        node_type: nodeType,
        importance,
        metadata,
      }),
    });

    console.log("Create memory response status:", response.status);

    if (response.status === 401) {
      this.clearAuth();
      throw new Error("Session expired. Please login again.");
    }

    if (!response.ok) {
      const error = await response.json();
      console.error("Create memory error:", error);
      throw new Error(error.detail || "Failed to create memory");
    }

    const result = await response.json();
    console.log("Memory created successfully:", result.id);
    return result;
  }

  async queryMemories(
    query: string,
    k: number = 5,
    nodeType?: string,
    minImportance?: number
  ): Promise<QueryResult> {
    const response = await fetch(`${this.baseURL}/v1/query`, {
      method: "POST",
      headers: this.getAuthHeader(),
      body: JSON.stringify({
        query,
        k,
        node_type: nodeType,
        min_importance: minImportance,
      }),
    });

    if (response.status === 401) {
      this.clearAuth();
      throw new Error("Session expired. Please login again.");
    }

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Query failed");
    }

    return response.json();
  }

  async searchMemories(
    text: string,
    k: number = 10,
    nodeType?: string,
    threshold: number = 0.0
  ): Promise<{ results: Memory[]; total_found: number }> {
    const response = await fetch(`${this.baseURL}/v1/search`, {
      method: "POST",
      headers: this.getAuthHeader(),
      body: JSON.stringify({
        text,
        k,
        node_type: nodeType,
        threshold,
      }),
    });

    if (response.status === 401) {
      this.clearAuth();
      throw new Error("Session expired. Please login again.");
    }

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Search failed");
    }

    return response.json();
  }

  async getMemory(nodeId: string): Promise<Memory> {
    const response = await fetch(`${this.baseURL}/v1/memory/${nodeId}`, {
      headers: this.getAuthHeader(),
    });

    if (response.status === 401) {
      this.clearAuth();
      throw new Error("Session expired. Please login again.");
    }

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to get memory");
    }

    return response.json();
  }

  async deleteMemory(nodeId: string): Promise<void> {
    const response = await fetch(`${this.baseURL}/v1/memory/${nodeId}`, {
      method: "DELETE",
      headers: this.getAuthHeader(),
    });

    if (response.status === 401) {
      this.clearAuth();
      throw new Error("Session expired. Please login again.");
    }

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to delete memory");
    }
  }

  async getStats(): Promise<Stats> {
    const response = await fetch(`${this.baseURL}/v1/stats`, {
      headers: this.getAuthHeader(),
    });

    if (response.status === 401) {
      this.clearAuth();
      throw new Error("Session expired. Please login again.");
    }

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to get stats");
    }

    return response.json();
  }
}

export const apiClient = new MemonixAPIClient();
