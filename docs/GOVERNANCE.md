# Governance & Risk Management

The "Governed" aspect of this trading system is its primary differentiator. It implements a strict risk management layer that can override bot execution to protect capital.

## Health Score Algorithm

The system health score (0-100) is a weighted calculation of four key metrics:

| Metric | Weight | Description |
|--------|--------|-------------|
| **Drawdown** | 40% | Penalizes being far from peak equity (Max 10%). |
| **Exposure** | 30% | Penalizes excessive capital allocation (Max 20%). |
| **Win Rate** | 20% | Rewards successful trade outcomes (Baseline 50%). |
| **P&L Trend** | 10% | Momentum of recent performance. |

## Risk Limits

The Governance module enforces the following hard limits:

- **Max Position Size**: 5% of total capital per trade.
- **Max Portfolio Exposure**: 20% of total capital across all positions.
- **Max Drawdown**: 10% peak-to-trough decline.
- **Critical Threshold**: If Health Score < 40, all trading is automatically paused.

## Auto-Pause Mechanism

When a risk limit is breached or the health score drops below the critical threshold:
1. All active bots are placed in a `PAUSED` state.
2. No new trades can be initiated.
3. The system remains in "Monitoring Only" mode until health recovers or manual intervention occurs.
