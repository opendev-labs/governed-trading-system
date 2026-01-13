#!/bin/bash
# ScanTrade Professional Dev Infrastructure Start Script
# Enforces Port 3000, handles lockfile conflicts, and optimizes startup.

# Set colors for better output
ORANGE='\033[0;38;5;208m'
NC='\033[0m' # No Color

echo -e "${ORANGE}--- ScanTrade Developer Console ---${NC}"
echo "+ Initializing Postman-style workspace..."

# 1. Handle Workspace Root Conflicts (Next.js 15+ Warning Fix)
if [ -f "../../package-lock.json" ]; then
    echo "! Detected conflicting lockfile in parent directory."
    echo "! Next.js may attempt to use incorrect root. Enforcing local context..."
fi

# 2. Port Cleanup Function
cleanup_port() {
  local port=$1
  echo -n "+ Verifying Port $port... "
  
  # Try fuser first
  if command -v fuser >/dev/null; then
    fuser -k -9 $port/tcp >/dev/null 2>&1
  fi
  
  # lsof cleanup
  local pids=$(lsof -t -i:$port)
  if [ -n "$pids" ]; then
    kill -9 $pids 2>/dev/null
  fi
  echo "CLEAN"
}

cleanup_port 3000
cleanup_port 3001

# 3. Environment Checks
if [ ! -d "node_modules" ]; then
    echo "+ Missing node_modules. Installing dependencies..."
    npm install
fi

# 4. Stale Lockfile Cleanup
if [ -f ".next/dev/lock" ]; then
  rm -f .next/dev/lock
  echo "+ Cleared stale dev locks."
fi

# 5. Start Dev Server
echo -e "${ORANGE}+ Starting High-Density Workspace on http://localhost:3000${NC}"

# NEXT_PRIVATE_DEBUG_LATEST=1 speeds up Turbopack in some cases, 
# and we explicitly set NEXTJS_CONFIG_CWD to help Next.js find the right root.
export NEXTJS_CONFIG_CWD=$(pwd)
PORT=3000 npm run dev
