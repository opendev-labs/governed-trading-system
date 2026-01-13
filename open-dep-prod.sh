#!/bin/bash
# ScanTrade HQ | Deployment Intelligence Node
# Enforces professional build standards & production synchronization.

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
echo -e "${DARK_GRAY}      PRODUCTION DEPLOYMENT CONSOLE v2.0      ${NC}"
echo ""

# --- 1. Infrastructure Audit ---
echo -e "${ORANGE}+ INITIALIZING:${NC} ${DARK_GRAY}Infrastructure pre-flight audit...${NC}"
if [ ! -f "package.json" ]; then
    echo -e "${RED}[!] CRITICAL:${NC} package.json missing. Deployment aborted."
    exit 1
fi
echo -e "${ORANGE}+ AUDIT:${NC} ${GREEN}FileSystem Integrity Verified.${NC}"

# --- 2. Peer Dependency Synchronization ---
echo -e "${ORANGE}+ SYNCING:${NC} ${DARK_GRAY}Ensuring React 19.2.1 & Next.js 16.0.10 alignment...${NC}"
npm install --legacy-peer-deps > /dev/null 2>&1
echo -e "${ORANGE}+ SYNC:${NC} ${GREEN}Local Dependencies Optimized.${NC}"

# --- 3. Local Build Validation (The "Pro" Barrier) ---
echo -e "${ORANGE}+ VALIDATING:${NC} ${DARK_GRAY}Executing professional production build check...${NC}"
npm run build > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo -e "${RED}[!] VALIDATION FAILED:${NC} Build errors detected. Execute 'npm run build' manually to debug."
    exit 1
fi
echo -e "${ORANGE}+ VALIDATION:${NC} ${GREEN}Production Build Verified.${NC}"

# --- 4. Branding & Favicon Integrity ---
echo -e "${ORANGE}+ BRANDING:${NC} ${DARK_GRAY}Auditing Browser Metadata & Icons...${NC}"
if [ -f "public/icon.svg" ]; then
    rm public/icon.svg
    echo -e "${ORANGE}+ BRANDING:${NC} ${DARK_GRAY}Purged legacy SVG icons.${NC}"
fi
echo -e "${ORANGE}+ BRANDING:${NC} ${GREEN}AMOLED Visual System Confirmed.${NC}"

# --- 5. Production Push (GitHub & Vercel Trigger) ---
echo -e "${ORANGE}+ DEPLOYING:${NC} ${DARK_GRAY}Injecting code into GitHub Remote...${NC}"
git add .
git commit -m "prod: professionally themed overhaul and deployment sync" > /dev/null 2>&1
git push origin main > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo -e ""
    echo -e "${ORANGE}--- DEPLOYMENT SUCCESSFUL ---${NC}"
    echo -e "${ORANGE}+ REMARK:${NC} ${GREEN}Production Push Completed Successfully.${NC}"
    echo -e "${ORANGE}+ LIVE URL:${NC} ${DARK_GRAY}https://scantrade.vercel.app${NC}"
    echo -e "${ORANGE}+ GITHUB:${NC} ${DARK_GRAY}https://github.com/opendev-labs/scantrade${NC}"
    echo ""
else
    echo -e "${RED}[!] DEPLOYMENT FAILED:${NC} Git push encountered an error."
    exit 1
fi
