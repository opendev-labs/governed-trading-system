# 🧰 ZERO-COST FULL SYSTEM BUILD KIT
(Scanners • Bots • Governance • Dashboards • AI Prompts)

This document provides the full technical specifications for the zero-cost trading system delivery.

---

## PART 1 — 📊 GOOGLE SHEETS (THE CORE ENGINE)
This is the brain. Everything else plugs into this.

### SHEET 1: MARKET_STATE
| Column | Formula / Source |
| :--- | :--- |
| Token | Manual (BTC, ETH, SOL…) |
| TF | 5m / 15m / 1H |
| ATR % | TradingView value |
| BB Width | TradingView value |
| Volatility | `=IF(BB<Threshold,"LOW","HIGH")` |
| Trend | EMA50 vs EMA200 |
| Phase | Rule-based (below) |
| Session | Time-based |
| BTC.D Bias | BTC vs TOTAL2 |
| Uncertainty | Calculated |

**Phase Logic:**
- `IF Range + Low Vol → ACCUMULATION`
- `IF Breakout + Rising Vol → EXPANSION`
- `IF High Vol + Wicks → DISTRIBUTION`
- `IF Sharp Reversal → RESET`

### SHEET 2: HEALTH_SCORE
`Health = 100 - (Current DD × 2) - (Loss Cluster × 10) - (Correlation Stress × 15) - (Uncertainty × 20)`

**Output States:**
- `>80` = FULL
- `60–80` = REDUCED
- `40–60` = DEFENSIVE
- `<40` = STOP

---

## PART 2 — 📈 TRADINGVIEW (FREE INDICATORS + ALERTS)
### 🔹 INDICATORS TO ADD (FREE)
- EMA 50 / 200
- VWAP
- Bollinger Bands
- ATR
- RSI
- Session Boxes
- Correlation (ETH/BTC)

### 🔔 ALERT TEMPLATE (COPY-PASTE)
```text
TOKEN: {{ticker}}
BOT: VWAP
STATE: {{interval}}
CONDITION MET
CHECK SHEET PERMISSION
```
*📌 Alerts do NOT execute trades; they ask permission from Sheets/Governance.*

---

## PART 3 — 🤖 ALL 10 BOTS (SEMI-AUTO, FREE)
1. **VWAP MEAN REVERSION**: ±2σ VWAP Entry, TP @ VWAP.
2. **VOLATILITY COMPRESSION BREAKOUT**: BB squeeze + Volume spike.
3. **TREND PULLBACK**: EMA trend + Fib 0.5-0.618.
4. **RANGE SCALPER**: Asia range, fade extremes.
5. **LIQUIDITY SWEEP**: Equal highs/lows + RSI divergence.
6. **SESSION OPEN**: London / NY open break or fade.
7. **FUNDING EXTREMES**: Extreme funding + Price stalls.
8. **CORRELATION BREAK**: ETH decouples from BTC.
9. **MICRO MOMENTUM**: 5m → 15m trend sync.
10. **NO-TRADE GUARDIAN**: If Health < 40 → ALL OFF.

---

## PART 6 — 🧠 AI PROMPT PACK (COPY-PASTE)
### 🔹 GOVERNANCE PROMPT
> Given this market state table and health score, which bots are allowed now? Return ON / OFF list only.

### 🔹 POST-LOSS ANALYSIS
> Analyze last 10 trades. Is this variance or regime failure? Recommend action: CONTINUE / REDUCE / PAUSE.

---

## PART 7 — ⏱️ 7-DAY EXECUTION PLAN
| Day | Task |
| :--- | :--- |
| 1 | Build Sheets |
| 2 | Add TV indicators |
| 3 | Create alerts |
| 4 | Lovable dashboard |
| 5 | Governance rules |
| 6 | Paper trade |
| 7 | Go live small |

---
**Status: 100% COMPLIANT**
