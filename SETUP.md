# Memoist Web Setup Guide

This guide will help you set up and run the Memoist web dashboard.

## Prerequisites

- Node.js 18+ installed
- memoist-cloud backend running (see backend setup below)
- A modern web browser

## Quick Start

### 1. Install Dependencies

```bash
cd memoist-web
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

This tells the frontend where to find the memoist-cloud API backend.

### 3. Run the Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

## Backend Setup (memoist-cloud)

**IMPORTANT**: The web dashboard requires the memoist-cloud API backend to be running.

### Option 1: Using Existing Implementation (if available)

If you already have memoist-cloud set up, make sure it's running on `localhost:8000`.

### Option 2: Mock Backend for Development

If the backend isn't ready yet, you can create a simple mock server for testing:

Create `mock-server.js` in the project root:

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Mock user database
const users = new Map();
const memories = new Map();

// Auth endpoints
app.post('/auth/signup', (req, res) => {
  const { email, password } = req.body;

  if (users.has(email)) {
    return res.status(400).json({ detail: 'User already exists' });
  }

  const user = {
    id: Math.random().toString(36).substr(2, 9),
    email: email
  };

  users.set(email, { ...user, password });

  res.json({
    access_token: 'mock_access_token_' + user.id,
    refresh_token: 'mock_refresh_token_' + user.id,
    user: user
  });
});

app.post('/auth/signin', (req, res) => {
  const { email, password } = req.body;

  const user = users.get(email);
  if (!user || user.password !== password) {
    return res.status(401).json({ detail: 'Invalid credentials' });
  }

  res.json({
    access_token: 'mock_access_token_' + user.id,
    refresh_token: 'mock_refresh_token_' + user.id,
    user: { id: user.id, email: user.email }
  });
});

// Memory endpoints
app.post('/v1/memory', (req, res) => {
  const id = Math.random().toString(36).substr(2, 9);
  const memory = {
    id,
    ...req.body,
    created_at: new Date().toISOString()
  };
  memories.set(id, memory);
  res.json(memory);
});

app.post('/v1/query', (req, res) => {
  const allMemories = Array.from(memories.values());
  res.json({
    nodes: allMemories.slice(0, req.body.k || 5).map(m => ({
      ...m,
      similarity: 0.95,
      relevance: 'highly relevant'
    })),
    total_found: allMemories.length,
    query_method: 'semantic',
    execution_time_ms: 42
  });
});

app.get('/v1/stats', (req, res) => {
  res.json({
    backend: 'mock',
    user_id: 'test_user',
    total_nodes: memories.size,
    total_edges: 0,
    node_types: { fact: memories.size },
    edge_types: {}
  });
});

app.listen(8000, () => {
  console.log('Mock API server running on http://localhost:8000');
});
```

Install dependencies and run:

```bash
npm install express cors
node mock-server.js
```

## Testing the Dashboard

### 1. Create an Account

1. Navigate to [http://localhost:3000](http://localhost:3000)
2. Click "Get Started" or go to `/signup`
3. Fill in the signup form:
   - **Email**: Use a valid email format (e.g., `test@example.com`)
   - **Password**: Must meet these requirements:
     - At least 8 characters
     - One uppercase letter
     - One lowercase letter
     - One number
   - **Confirm Password**: Must match the password
4. Click "Create Account"

**Note**: The button will be disabled (grayed out) until all validation requirements are met.

### 2. Sign In

If you already have an account:
1. Go to `/login`
2. Enter your email and password
3. Click "Sign In"

### 3. Explore the Dashboard

Once logged in, you'll have access to:

- **Dashboard Home** (`/dashboard`) - Overview and quick actions
- **Memories** (`/dashboard/memories`) - View and manage all memories
- **Create Memory** (`/dashboard/memories/new`) - Add new memories
- **Search** (`/dashboard/search`) - Semantic search interface
- **Analytics** (`/dashboard/analytics`) - Memory statistics and insights
- **Settings** (`/dashboard/settings`) - Account settings

## Troubleshooting

### Button Won't Click / Nothing Happens

**Issue**: The "Create Account" or "Sign In" button doesn't respond.

**Common Causes**:

1. **Button is disabled** - Check that you've filled in all fields correctly:
   - Email must contain an `@` symbol
   - Password must meet all requirements (see visual indicators)
   - Passwords must match (for signup)

2. **Backend not running** - Check the browser console (F12):
   - Look for error messages
   - If you see "Cannot connect to API", make sure the backend is running on port 8000

3. **Environment variable not set** - Verify `.env.local` exists with:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. **Port conflict** - Make sure nothing else is using port 8000

### Check Browser Console

Open browser DevTools (F12) and check the Console tab for helpful debug messages:

```
Signup form submitted { email: "...", passwordValid: true, passwordsMatch: true }
Calling signup API: http://localhost:8000/auth/signup
Signup response status: 200
Signup successful, storing auth data
```

If you see errors, they will help identify the issue.

### CORS Errors

If you see CORS errors in the console, the backend needs to allow requests from `localhost:3000`.

For the mock server, CORS is already configured. For the real backend, ensure it has:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Development Tips

### Hot Reload

Next.js supports hot reload. Just save your files and the browser will automatically refresh.

### Check Network Requests

In browser DevTools, go to the Network tab to see all API requests and responses. This helps debug authentication and API issues.

### Clear Auth State

If you need to clear your authentication state:

1. Open browser DevTools (F12)
2. Go to Application tab → Local Storage
3. Delete items starting with `memoist_`
4. Refresh the page

## Building for Production

```bash
npm run build
npm start
```

This creates an optimized production build.

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | Yes | `http://localhost:8000` | URL of the memoist-cloud API backend |

**Note**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI**: Tailwind CSS + shadcn/ui components
- **Auth**: Custom JWT-based authentication with Supabase backend
- **State Management**: React Context API
- **API Client**: Native Fetch API

## Next Steps

- Set up the full memoist-cloud backend (see plan in `.claude/plans/`)
- Deploy to production (Vercel for frontend, your choice for backend)
- Configure production environment variables
- Set up proper authentication flow with Supabase

## Need Help?

Check the browser console for error messages - they include helpful debugging information about what went wrong and how to fix it.
