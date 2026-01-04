# Technical Architecture

This document outlines the technical design and architecture of the Governed Trading System.

## Architecture Overview

The system follows a decoupled architecture with a Python-based algorithmic engine and a Next.js real-time dashboard.

```mermaid
graph TD
    A[Market Data (yfinance)] --> B[Trading Engine]
    B --> C[Scanners]
    B --> D[Bots]
    B --> E[Risk Manager]
    B --> F[SQLite Database]
    F --> G[FastAPI Backend]
    G --> H[Next.js Frontend]
```

## Backend (Python)

The backend is built with **FastAPI** and handles the heavy lifting of market analysis and order management.

- **Trading Engine**: Orchestrates the update cycle (default 60s), fetching data and triggering scanners/bots.
- **Scanners**: Individual technical analysis modules that look for specific market states (e.g., Trend Alignment, Volatility Compression).
- **Bots**: Execution modules that implement specific trading strategies based on scanner signals.
- **Risk Manager**: The "Governance" layer that monitors portfolio health and enforces limits.
- **Database**: SQLite with SQLAlchemy for tracking trades, positions, and logs.

## Frontend (Next.js)

The frontend is a "Control Plane" for the trading system, utilizing **Shadcn UI** and **Tailwind CSS**.

- **Dashboard**: High-level overview of health and performance.
- **Scanners View**: Real-time signal monitoring.
- **Bots View**: Per-bot performance and control (start/stop).
- **Governance View**: Configuration and enforcement of risk limits.
- **Logs View**: Detailed history of all system activities.

## Data Flow

1. **Cycle Trigger**: The Engine starts a new cycle every 60 seconds.
2. **Data Fetch**: Market data for configured symbols is pulled from `yfinance`.
3. **Analysis**: Scanners process the new data and generate signals.
4. **Governance Check**: The Risk Manager updates the Portfolio Health Score.
5. **Execution**: If Health > 40, Bots analyze signals and potentially execute simulated trades.
6. **Persistence**: All events are logged to the database.
7. **Visualization**: The Next.js dashboard polls the API to reflect the latest state.
