# Strategies: Scanners & Bots

This document details the specific technical strategies implemented in the system.

## Market Scanners

### 1. Trend Alignment
- **Indicators**: EMA (20, 50, 200)
- **Signal**: Triggered when EMAs are perfectly stacked (Bullish: 20 > 50 > 200).

### 2. Volatility Compression
- **Indicators**: Bollinger Bands
- **Signal**: Identifies "Squeezes" where volatility is abnormally low, indicating a pending breakout.

### 3. Momentum Divergence
- **Indicators**: RSI, MACD
- **Signal**: Detects oversold (RSI < 30) or overbought (RSI > 70) conditions with MACD confirmation.

---

## Trading Bots

### 1. VWAP Mean Reversion
- **Risk**: Low
- **Logic**: Sells when price is > 2% above VWAP and buys when < 2% below.

### 2. Volatility Breakout
- **Risk**: High
- **Logic**: Enters trades when Bollinger Bands expand rapidly following a squeeze.

### 3. Trend Following PRO
- **Risk**: Medium
- **Logic**: Rides strong trends confirmed by High ADX and favorable EMA stacking.

### 4. Support Bounce Bot
- **Risk**: Low
- **Logic**: Uses historical pivot points to identify high-probability entry areas.
