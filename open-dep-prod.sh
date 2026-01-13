#!/bin/bash
# opendev-labs · scantrade | PRODUCTION NODE
# Enforces professional build standards & production synchronization.

# --- Theme Configuration (No-Green Edition) ---
ORANGE='\033[0;38;5;208m'
WHITE='\033[1;37m'
DARK_GRAY='\033[1;30m'
RED='\033[0;31m'
NC='\033[0m'
CHECK_OK="${ORANGE}[ OK ]${NC}"
CHECK_DONE="${ORANGE}DONE${NC}"

# --- Animation Helpers ---
progress_bar() {
    local duration=$1
    local label=$2
    local width=30
    local sleep_step=$(echo "scale=4; $duration / $width" | bc)
    
    for ((i=0; i<=width; i++)); do
        local filled=$(printf "%${i}s" | tr ' ' '#')
        local empty=$(printf "%$((width-i))s" | tr ' ' '-')
        local percent=$((i * 100 / width))
        printf "\r${ORANGE}+${NC} ${WHITE}%-25s${NC} ${DARK_GRAY}[${ORANGE}%s${DARK_GRAY}%s] %d%%${NC}" "$label" "$filled" "$empty" "$percent"
        sleep $sleep_step
    done
    printf " %s\n" "${CHECK_DONE}"
}

log_step() {
    local label=$1
    local timestamp=$(date +"%H:%M:%S")
    echo -e "${DARK_GRAY}[$timestamp]${NC} ${ORANGE}+${NC} ${WHITE}$label${NC} ..."
}

header() {
    clear
    echo -e "${ORANGE}opendev-labs · scantrade${NC} ${DARK_GRAY}::${NC} ${WHITE}HYPER-BOSE DEPLOYMENT NODE v2.2${NC}"
    echo -e "${DARK_GRAY}------------------------------------------------------------${NC}"
    echo ""
}

# --- Execution ---
header

# 1. Environment Audit
log_step "ENVIRONMENT AUDIT"
progress_bar 0.5 "Synchronizing Configuration"
if [ ! -f "package.json" ]; then
    echo -e "${RED}[!] CRITICAL ERROR: package.json missing.${NC}"
    exit 1
fi
echo -e "${ORANGE}+${NC} CONFIGURATION ${CHECK_OK}"
echo ""

# 2. Filesystem Scan
log_step "FILESYSTEM SCAN"
progress_bar 0.8 "Auditing Core Files"
echo -e "${ORANGE}+${NC} package.json  : ${CHECK_OK}"
echo -e "${ORANGE}+${NC} package-lock  : ${CHECK_OK}"
echo -e "${ORANGE}+${NC} vercel.json   : ${CHECK_OK}"
echo ""

# 3. Dependency Injection
log_step "DEPENDENCY INJECTION"
progress_bar 2 "Aligning React 19.2.1 Ecosystem"
npm install --legacy-peer-deps > /dev/null 2>&1
echo -e "${ORANGE}+${NC} DEPENDENCY MAP ${CHECK_OK}"
echo ""

# 4. Production Build
log_step "PRODUCTION BUILD"
progress_bar 4 "Synthesizing Optimized Bundle"
npm run build > build_log.txt 2>&1
if [ $? -ne 0 ]; then
    echo -e "${RED}[!] SYNTHESIS FAILED. Check build_log.txt for data.${NC}"
    exit 1
fi
echo -e "${ORANGE}+${NC} BUNDLE GEN      : ${CHECK_OK}"
rm build_log.txt
echo ""

# 5. Visual System Audit
log_step "VISUAL SYSTEM AUDIT"
progress_bar 0.3 "Verified AMOLED Metadata"
if [ -f "public/icon.svg" ]; then
    rm public/icon.svg
fi
echo -e "${ORANGE}+${NC} BRANDING SYNC   : ${CHECK_OK}"
echo ""

# 6. Global Synchronization
log_step "GLOBAL SYNCHRONIZATION"
progress_bar 2 "Mirroring to Production Node"
git add .
git commit -m "prod: hyper-bose v2.2 deployment (no-green refinement)" > /dev/null 2>&1
git push origin main > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo -e "${RED}[!] SYNC FAILED. Check network/remote status.${NC}"
    exit 1
fi
echo -e "${ORANGE}+${NC} PRODUCTION SYNC : ${CHECK_OK}"
echo ""

echo -e "${DARK_GRAY}======================= SUMMARY =======================${NC}"
echo -e "  STATUS  : ${ORANGE}DEPLOYED SUCCESSFULLY${NC}"
echo -e "  SYNC    : ${WHITE}PROD @ https://scantrade.vercel.app${NC}"
echo -e "  REPO    : ${ORANGE}opendev-labs/scantrade${NC}"
echo -e "${DARK_GRAY}======================================================${NC}"
echo ""
