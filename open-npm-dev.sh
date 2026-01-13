#!/bin/bash
# ScanTrade HQ | Development Environment Node
# High-density workspace initialization and port management.

# --- Professional Theme Configuration ---
ORANGE='\033[0;38;5;208m'
DARK_GRAY='\033[1;30m'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${ORANGE}   _____                 _______             ${NC}"
echo -e "${ORANGE}  / ___/_________ _____ /_  __/__  ______  __${NC}"
echo -e "${ORANGE}  \__ \/ ___/ __ \`/ __ \`/ / / __ \/ ___/ / / /${NC}"
echo -e "${ORANGE} ___/ / /__/ /_/ / / / / / / / / / /  / /_/ / ${NC}"
echo -e "${ORANGE}/____/\___/\__,_/_/ /_/_/ /_/ /_/_/   \__,_/  ${NC}"
echo -e "${DARK_GRAY}       DEVELOPER INTELLIGENCE CONSOLE v2.0    ${NC}"
echo ""

# --- 1. Port Intelligence ---
cleanup_port() {
  local port=$1
  echo -ne "${ORANGE}+ SCANNING PORT $port:${NC} "
  
  # Try fuser
  if command -v fuser >/dev/null; then
    fuser -k -9 $port/tcp >/dev/null 2>&1
  fi
  
  # lsof fallback
  local pids=$(lsof -t -i:$port)
  if [ -n "$pids" ]; then
    kill -9 $pids 2>/dev/null
  fi
  echo -e "${GREEN}CLEAN${NC}"
}

cleanup_port 3000
cleanup_port 3001

# --- 2. Workspace Optimization ---
echo -e "${ORANGE}+ OPTIMIZING:${NC} ${DARK_GRAY}Clearing stale Next.js dev locks...${NC}"
if [ -f ".next/dev/lock" ]; then
  rm -f .next/dev/lock
fi
echo -e "${ORANGE}+ OPTIMIZE:${NC} ${GREEN}Workspace Memory Purged.${NC}"

# --- 3. Dependency Check ---
if [ ! -d "node_modules" ]; then
    echo -e "${ORANGE}+ INITIALIZING:${NC} ${DARK_GRAY}Installing dependencies...${NC}"
    npm install --legacy-peer-deps > /dev/null 2>&1
fi

# --- 4. Launch Sequence ---
echo -e "${ORANGE}+ INITIALIZING:${NC} ${DARK_GRAY}Launching high-density workspace...${NC}"
echo -e "${ORANGE}+ NODE URL:${NC} ${DARK_GRAY}http://localhost:3000${NC}"
echo ""

export NEXTJS_CONFIG_CWD=$(pwd)
PORT=3000 npm run dev
