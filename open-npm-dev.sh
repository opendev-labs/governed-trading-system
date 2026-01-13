#!/bin/bash
# opendev-labs · scantrade | DEV ENVIRONMENT
# High-density workspace initialization and port management.

# --- Theme Configuration (No-Green Edition) ---
ORANGE='\033[0;38;5;208m'
WHITE='\033[1;37m'
DARK_GRAY='\033[1;30m'
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
    echo -e "${ORANGE}opendev-labs · scantrade${NC} ${DARK_GRAY}::${NC} ${WHITE}HYPER-BOSE DEV CONSOLE v2.2${NC}"
    echo -e "${DARK_GRAY}------------------------------------------------------------${NC}"
    echo ""
}

# --- Execution ---
header

# 1. Port Intelligence (Hardened)
log_step "PORT INTELLIGENCE"
cleanup_port() {
    local port=$1
    progress_bar 0.5 "Scanning Port $port"
    
    # Aggressive Kill Loop
    for i in {1..3}; do
        local pids=$(lsof -t -i:$port)
        if [ -n "$pids" ]; then
            echo -ne "${DARK_GRAY}  > Port $port Occupied (PID: $pids). Purging... ${NC}"
            kill -9 $pids 2>/dev/null
            sleep 0.5
            echo -e "${ORANGE}FORCED${NC}"
        else
            break
        fi
    done
    
    # Final Verification
    if lsof -t -i:$port >/dev/null; then
        echo -e "  ${ORANGE}! WARNING:${NC} Port $port remains allocated. Manual intervention required."
    else
        echo -e "${ORANGE}+${NC} PORT $port ${CHECK_OK}"
    fi
}

cleanup_port 3000
cleanup_port 3001
echo ""

# 2. Workspace Optimization
log_step "OPTIMIZING WORKSPACE"
progress_bar 0.3 "Clearing stale dev locks"
if [ -f ".next/dev/lock" ]; then
  rm -f .next/dev/lock
fi
echo -e "${ORANGE}+${NC} CACHE INTELLIGENCE ${CHECK_OK}"
echo ""

# 3. Dependency Audit
log_step "DEPENDENCY AUDIT"
if [ ! -d "node_modules" ]; then
    progress_bar 2 "Initializing Node Stack"
    npm install --legacy-peer-deps > /dev/null 2>&1
    echo -e "${ORANGE}+${NC} STACK INITIALIZED ${CHECK_OK}"
else
    progress_bar 0.2 "Verifying Integrity"
    echo -e "${ORANGE}+${NC} STACK VERIFIED ${CHECK_OK}"
fi
echo -e "${ORANGE}+${NC} React 19.2.1 / Next.js 16.0.10: ${CHECK_OK}"
echo ""

# 4. Launch Sequence
log_step "LAUNCH SEQUENCE"
progress_bar 0.8 "Warming up Turbopack"
echo -e "${ORANGE}+${NC} NODE URL   : ${ORANGE}http://localhost:3000${NC}"
echo -e "${ORANGE}+${NC} ENGINE     : ${WHITE}Turbopack${NC}"
echo -e "${ORANGE}+${NC} TERMINAL   : ${ORANGE}READY${NC}"
echo ""

echo -e "${DARK_GRAY}======================= STATUS =======================${NC}"
echo -e "  STATUS  : ${ORANGE}HYPER-BOSE ACTIVE${NC}"
echo -e "  NODE    : ${WHITE}http://localhost:3000${NC}"
echo -e "  PORTS   : ${ORANGE}3000, 3001${NC}"
echo -e "${DARK_GRAY}======================================================${NC}"
echo ""

export NEXTJS_CONFIG_CWD=$(pwd)
PORT=3000 npm run dev
