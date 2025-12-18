import { Metadata } from "next";
import { Terminal, Settings, Cloud } from "lucide-react";

export const metadata: Metadata = {
  title: "Installation - Memonix",
  description: "Install Memonix for Claude Code, Cursor, and other AI tools.",
};

export default function InstallationPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">Installation</h1>
        <p className="text-xl text-muted-foreground">
          Detailed installation instructions for all supported tools.
        </p>
      </div>

      {/* Claude Code */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Terminal className="h-6 w-6 text-brand-cyan" />
          Claude Code
        </h2>
        <p className="text-muted-foreground">
          The recommended way to install Memonix with Claude Code.
        </p>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Option 1: Plugin install (recommended)</h3>
            <div className="rounded-lg bg-card border border-border p-4">
              <code className="text-sm">claude plugin install memonix</code>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Option 2: Manual MCP setup</h3>
            <div className="rounded-lg bg-card border border-border p-4 space-y-2">
              <code className="block text-sm">pip install memonix-plugin</code>
              <code className="block text-sm">claude mcp add memonix -- python -m memonix_plugin</code>
            </div>
          </div>
        </div>
      </section>

      {/* Cursor */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Terminal className="h-6 w-6 text-brand-purple" />
          Cursor
        </h2>
        <p className="text-muted-foreground">
          Install Memonix as an MCP server in Cursor.
        </p>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Option 1: MCP install</h3>
            <div className="rounded-lg bg-card border border-border p-4">
              <code className="text-sm">cursor mcp install memonix</code>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Option 2: Manual configuration</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Add to your Cursor MCP settings:
            </p>
            <div className="rounded-lg bg-card border border-border p-4">
              <pre className="text-sm overflow-x-auto">{`{
  "mcpServers": {
    "memonix": {
      "command": "python",
      "args": ["-m", "memonix_plugin"]
    }
  }
}`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* Configuration */}
      <section className="space-y-4" id="configuration">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Settings className="h-6 w-6 text-brand-emerald" />
          Configuration
        </h2>
        <p className="text-muted-foreground">
          Customize Memonix with environment variables.
        </p>

        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-semibold">Variable</th>
                <th className="text-left p-3 font-semibold">Description</th>
                <th className="text-left p-3 font-semibold">Default</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="p-3 font-mono text-brand-cyan">MEMONIX_API_KEY</td>
                <td className="p-3 text-muted-foreground">Pro API key for cloud features</td>
                <td className="p-3 text-muted-foreground">—</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-cyan">MEMONIX_DB_PATH</td>
                <td className="p-3 text-muted-foreground">Local database location</td>
                <td className="p-3 font-mono text-xs">.claude/memory.db</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-brand-cyan">MEMONIX_API_URL</td>
                <td className="p-3 text-muted-foreground">Cloud API endpoint</td>
                <td className="p-3 font-mono text-xs">https://api.memonix.dev</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Pro upgrade */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Cloud className="h-6 w-6 text-brand-amber" />
          Upgrade to Pro
        </h2>
        <p className="text-muted-foreground">
          Unlock advanced features like adaptive learning, cross-tool sync, and unlimited storage.
        </p>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">1. Get your API key</h3>
            <p className="text-sm text-muted-foreground">
              Sign up at{" "}
              <a href="https://memonix.dev/upgrade" className="text-brand-cyan hover:underline">
                memonix.dev/upgrade
              </a>
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">2. Set your API key</h3>
            <div className="rounded-lg bg-card border border-border p-4 space-y-2">
              <code className="block text-sm">
                <span className="text-muted-foreground"># Option 1: Environment variable</span>
              </code>
              <code className="block text-sm">export MEMONIX_API_KEY=sk-your-key-here</code>
              <code className="block text-sm mt-4">
                <span className="text-muted-foreground"># Option 2: Claude Code config</span>
              </code>
              <code className="block text-sm">claude config set MEMONIX_API_KEY sk-your-key-here</code>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">3. Sync existing memories (optional)</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Upload your local memories to enable cloud features:
            </p>
            <div className="rounded-lg bg-card border border-border p-4">
              <code className="text-sm">memory_sync</code>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
