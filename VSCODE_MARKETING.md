# VS Code Extension Marketing Strategy

## Overview
Memoist Universal VS Code Extension brings persistent AI memory to **9+ AI coding assistants** through a single installation.

## Key Marketing Messages

### Primary Value Proposition
**"One Extension. Every AI Tool. Zero Configuration."**

Universal compatibility is our killer feature - no other memory solution works across Cursor, Windsurf, Copilot, Cline, Continue, Kilo, Aider, Roo Code, and VS Code AI.

### Target Audiences

#### 1. **Multi-Tool Users** (Primary)
- Users who switch between Cursor, Copilot, and other AI tools
- Need consistent memory across all tools
- Pain point: Context lost when switching tools

#### 2. **Cursor/Windsurf Users** (Secondary)
- Already using advanced AI tools
- Want better memory than built-in systems
- Pain point: Ephemeral context in current tools

#### 3. **VS Code Extension Users** (Tertiary)
- Using Copilot, Cline, Continue, etc.
- Want to add memory capabilities
- Pain point: AI forgets between sessions

### Competitive Advantages

| Feature | Memoist | context7 | Pieces | Competition |
|---------|---------|----------|--------|-------------|
| **Universal Compatibility** | ✅ 9+ AI tools | ❌ Single tool | ❌ Single tool | ❌ Single tool only |
| **Graph-Based Memory** | ✅ Relationships | ❌ Flat RAG | ❌ Snippets only | ⚠️ Limited |
| **Terminal Sync** | ✅ Auto-syncs CLI | ❌ No sync | ❌ No sync | ❌ No sync |
| **Free Tier** | ✅ 10K memories, 100% local | ⚠️ Limited | ⚠️ Limited | ⚠️ Cloud-only |
| **Concurrent Windows** | ✅ SQLite backend | ❌ May lock | ❌ May lock | ⚠️ May lock |
| **Documentation Index** | ✅ Planned Phase 2 | ✅ Yes | ❌ No | ❌ No |
| **Codebase Semantic Search** | ✅ Planned Phase 2 | ✅ Limited | ❌ No | ❌ No |
| **Price** | **$8/mo** | $7/mo | $8/mo | $10-20/mo |

**Key Positioning**: "More affordable than most competitors, works with 9+ AI tools instead of just one, and combines memory + external context in one solution."

## Marketing Channels

### 1. VS Code Marketplace (Priority 1)
**Listing Optimization:**
- Title: "Memoist - Universal AI Memory for Cursor, Copilot, Cline & More"
- Short Description: "Persistent memory for 9+ AI coding assistants. Works with Cursor, Windsurf, GitHub Copilot, Cline, Continue, and more. Free tier 100% local."
- Tags: `ai`, `memory`, `cursor`, `copilot`, `cline`, `continue`, `context`, `semantic-search`
- Screenshots:
  1. Memory browser in action
  2. Auto-detection of AI tools
  3. Memory search results
  4. Stats dashboard
  5. Terminal sync demo

**Description Template:**
```markdown
# Persistent Memory for Every AI Coding Assistant

Memoist gives your AI assistant the memory it deserves. One extension works with:

- ✅ Cursor
- ✅ Windsurf
- ✅ GitHub Copilot
- ✅ Cline
- ✅ Continue
- ✅ Kilo
- ✅ Aider
- ✅ Roo Code
- ✅ VS Code AI (experimental)

## Why Memoist?

**Stop Repeating Yourself**
Your AI forgets context between sessions. Memoist remembers facts, procedures, preferences, and patterns forever.

**Works with Every Tool**
One extension, all AI assistants. Automatically detects which tools you have installed.

**Syncs with Terminal**
Use Claude Code CLI? Memories automatically sync via `.claude/memory.db`. No configuration needed.

**100% Local (Free)**
Free tier stores everything locally. Zero data sent to cloud. Supports concurrent VS Code windows.

**Upgrade to Pro**
Cloud sync, adaptive learning, unlimited storage, team sharing.

[Get Started Free →](vscode:extension/memoist.memoist)
```

### 2. Landing Page (`/vscode`)
**URL**: `https://memoist.dev/vscode`

**Content Structure:**
- Hero: "Memory for Every AI Tool"
- Supported Tools Grid (9 tools with icons)
- Features (6 key features)
- How It Works (3 steps)
- Free vs Pro comparison
- Install CTA

**SEO Keywords:**
- "VS Code AI memory"
- "Cursor memory extension"
- "GitHub Copilot memory"
- "Persistent AI context"
- "Universal AI memory"

### 3. Reddit & Communities
**Target Subreddits:**
- r/cursor
- r/vscode
- r/programming
- r/MachineLearning
- r/ClaudeAI

**Post Template:**
```
I built a VS Code extension that gives persistent memory to Cursor, Copilot, Cline, and 6+ other AI tools

Problem: Every AI assistant forgets everything between sessions. You waste time repeating context.

Solution: Memoist - one extension that works with 9+ AI tools:
- Cursor, Windsurf, GitHub Copilot, Cline, Continue, Kilo, Aider, Roo Code, VS Code AI

Key features:
- Persistent memory across all sessions
- Auto-detects which AI tools you have
- Syncs with Claude Code CLI
- 100% local (free tier)
- Supports concurrent VS Code windows

Free tier: 10K memories, everything local
Pro: Cloud sync, adaptive learning, unlimited storage

Install from VS Code Marketplace: [link]

Questions? AMA!
```

### 4. GitHub
**README Highlights:**
- Universal compatibility badge
- "Works with 9+ AI tools" prominently displayed
- Quick start guide
- Architecture diagram showing backend adapters
- Contributing guide

### 5. Twitter/X
**Launch Tweet:**
```
🚀 Introducing Memoist for VS Code

One extension. 9+ AI tools. Zero configuration.

✅ Cursor
✅ Windsurf
✅ GitHub Copilot
✅ Cline
✅ Continue
✅ Kilo
... and more

Your AI assistant finally gets memory that persists.

Free tier: 100% local
Pro: Cloud sync + adaptive learning

Install: [link]
```

**Follow-up Tweets:**
- Technical deep-dive: "How we built universal AI tool detection"
- User story: "Why memory matters for AI coding assistants"
- Backend architecture: "SQLite vs Kuzu vs Supabase"
- Tutorial: "Getting started in 60 seconds"

### 6. Product Hunt
**Launch Tagline:**
"Universal memory for Cursor, Copilot, Cline, and 6+ AI coding assistants"

**First Comment:**
```
Hey Product Hunt! 👋

I built Memoist to solve a problem I had: using multiple AI coding assistants (Cursor, Copilot, Cline) but losing context every time I switched tools.

Memoist is a universal VS Code extension that:
- Works with 9+ AI tools automatically
- Syncs between terminal (Claude Code) and VS Code
- Stores everything locally (free tier)
- Supports concurrent windows (SQLite backend)

Tech stack:
- TypeScript extension
- Python MCP server
- SQLite/Kuzu/Supabase backends
- Graph-based memory with embeddings

Free tier: 10K memories, 100% local
Pro: Unlimited storage, cloud sync, adaptive learning

Try it free: [link]

Happy to answer questions!
```

## Conversion Funnel

### Stage 1: Awareness
**Channels**: VS Code Marketplace search, Reddit, Twitter, GitHub
**Goal**: Communicate universal compatibility

**Key Message**: "One extension for all your AI tools"

### Stage 2: Interest
**Channels**: Landing page, README
**Goal**: Show concrete benefits

**Key Message**: "Stop repeating context. Your AI remembers forever."

### Stage 3: Trial
**Channels**: One-click install from Marketplace
**Goal**: Frictionless installation

**Key Message**: "Install in seconds. Free tier is 100% local."

### Stage 4: Activation
**Channels**: In-app onboarding, welcome message
**Goal**: First memory created

**Key Message**: "Create your first memory. Watch your AI get smarter."

### Stage 5: Conversion (Free → Pro)
**Channels**: In-app hints, usage limits
**Goal**: Upgrade to Pro

**Key Message**: "Upgrade for cloud sync, adaptive learning, unlimited storage"

## Success Metrics

### Marketplace
- **Installs**: Target 1,000 in first month
- **Rating**: Maintain 4.5+ stars
- **Reviews**: Encourage power users to review

### Website
- **Traffic**: 5,000 visits/month to `/vscode`
- **Conversion**: 10% install rate from landing page
- **Bounce**: <40% bounce rate

### Product
- **Activation**: 60% of installs create first memory
- **Retention**: 40% weekly active users
- **Conversion**: 5% free → pro conversion

## Pricing Strategy

### Free Tier ($0)
**Target**: Individual developers, trial users
**Value**: Everything needed for personal use
- 10,000 memories
- 100% local storage (SQLite)
- All 9+ AI tools supported
- Semantic search
- Graph relationships
- Terminal sync (.claude/memory.db)

**Goal**: Maximize adoption, build user base

### Pro Tier ($8/month or $80/year)
**Target**: Power users who need unlimited storage
**Value**: Professional features
- Unlimited memories
- Cloud sync across machines (Supabase backend)
- Adaptive learning (memories strengthen with use)
- Deep context retrieval
- Auto-refresh on file changes

**Positioning**: "Less than context7, works with all your AI tools"

**Goal**: 7% conversion rate (higher due to lower price point)

### Founder Tier ($6/month forever)
**Target**: First 500 Pro users
**Value**: Lifetime discount for early believers
- Everything in Pro
- Locked-in pricing forever
- "Founding Member" badge
- Early access to new features

**Goal**: Build champion community, create urgency

### Future: Pro+ Tier ($15/month) - Phase 4
**Target**: Teams (3+ seats)
**Value**: Team collaboration features
- Everything in Pro
- Shared team memories
- Admin dashboard
- Role-based access control
- Priority support

**Launch**: Months 7-12 after validating individual Pro tier

## Launch Timeline

### Week 1: Soft Launch
- Publish to VS Code Marketplace
- Announce on Twitter/X
- Post to r/vscode, r/cursor

### Week 2: Content Push
- Publish `/vscode` landing page
- Write technical blog post
- Create demo video

### Week 3: Community Engagement
- Post to Product Hunt
- Share on Hacker News
- Engage with early users

### Week 4: Optimization
- A/B test marketplace listing
- Optimize landing page
- Gather user feedback

## Messaging Framework

### What is Memoist?
"Universal memory for AI coding assistants"

### Who is it for?
"Developers using Cursor, Copilot, Cline, or other AI tools"

### What problem does it solve?
"Your AI forgets everything between sessions. Memoist remembers forever."

### How is it different?
"One extension works with 9+ AI tools. Competitors only work with one tool."

### Why should I trust it?
"Free tier is 100% local. Open source. Built by developers, for developers."

### What's the catch?
"Free tier has 10K memory limit. Pro tier unlocks cloud sync and unlimited storage for $8/month."

### How does pricing compare?
"Less than context7 ($7/mo), same as Pieces ($8/mo), cheaper than Copilot ($10/mo) - and works with all of them."

## FAQ (Marketing)

**Q: Does it work with [my AI tool]?**
A: If you use Cursor, Windsurf, GitHub Copilot, Cline, Continue, Kilo, Aider, Roo Code, or VS Code AI - yes! One extension works with all of them.

**Q: Is it really free?**
A: Yes! Free tier is 100% local with 10K memories. Upgrade to Pro ($8/month) for cloud sync and unlimited storage.

**Q: How does the price compare to context7 and other tools?**
A: At $8/month, we're only $1 more than context7 ($7/mo), same as Pieces ($8/mo), and cheaper than Copilot ($10/mo). Plus, we work with 9+ AI tools instead of just one.

**Q: What about founder pricing?**
A: First 500 Pro users get $6/month forever - a 25% discount locked in for life. This creates urgency and rewards early believers.

**Q: How does it sync with Claude Code?**
A: If you use Claude Code CLI, Memoist automatically detects and shares the same database (`.claude/memory.db`). No configuration needed.

**Q: Does it work with multiple VS Code windows?**
A: Yes! We use SQLite backend which supports concurrent access across multiple windows.

**Q: What about privacy?**
A: Free tier stores everything locally on your machine. Pro tier syncs encrypted data to cloud (optional).

**Q: Can I use it with my team?**
A: Team features coming in Pro+ tier ($15/month per seat) in Q2-Q3 2026. Pro tier ($8/month) is individual-focused.

## Competitive Positioning

### vs context7
**Our Advantage**: Works with 9+ AI tools (not just one), graph-based memory (not flat RAG)

**Message**: "For $1 more than context7, get memory that works with Cursor, Copilot, Cline, and 6 other AI tools. Plus graph relationships between concepts."

**Future**: Adding documentation indexing (Phase 2) and codebase semantic search to match context7's RAG features while maintaining universal compatibility advantage.

### vs Built-in Tool Memory
**Our Advantage**: Works across all tools, not just one, persistent between sessions

**Message**: "Don't get locked into one tool's memory system. Switch between Cursor, Copilot, and others without losing context."

### vs Pieces ($8/month)
**Our Advantage**: Graph-based memory (not just snippets), works with 9+ AI tools (not just one)

**Message**: "Same price as Pieces, but understands relationships between concepts and works with every AI assistant you use."

### vs Manual Note-Taking
**Our Advantage**: Automatic capture, semantic search, graph relationships

**Message**: "Stop copy-pasting context. Memoist auto-captures and retrieves intelligently based on what you're working on."

### vs Cloud-Only Solutions
**Our Advantage**: Free tier is 100% local

**Message**: "Your data stays on your machine. Upgrade to cloud ($8/month) when you're ready for cross-device sync."

## Launch Checklist

### Pre-Launch
- [ ] Publish extension to VS Code Marketplace
- [ ] Create `/vscode` landing page
- [ ] Update home page hero with VS Code support
- [ ] Prepare screenshots and demo video
- [ ] Write marketplace description
- [ ] Set up analytics (Google Analytics, Plausible)
- [ ] Create social media accounts (Twitter, Reddit)

### Launch Day
- [ ] Publish marketplace listing
- [ ] Deploy landing page
- [ ] Post to Twitter/X
- [ ] Post to r/vscode
- [ ] Post to r/cursor
- [ ] Email newsletter subscribers
- [ ] Update GitHub README

### Post-Launch (Week 1)
- [ ] Monitor reviews and feedback
- [ ] Respond to all questions/issues
- [ ] A/B test marketplace description
- [ ] Publish technical blog post
- [ ] Create demo video
- [ ] Engage with early adopters

### Growth (Month 1)
- [ ] Launch on Product Hunt
- [ ] Post to Hacker News
- [ ] Write case studies
- [ ] Optimize conversion funnel
- [ ] Plan first feature update

---

**Next Steps**: Finalize marketplace listing, create demo video, publish landing page.
