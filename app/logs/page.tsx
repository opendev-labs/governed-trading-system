"use client"

import { useState } from "react"
import { Activity, CheckCircle, AlertCircle, Clock, Filter, Download } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/navigation"

export default function LogsPage() {
  const [logs] = useState([
    {
      id: 1,
      timestamp: "2024-01-04 14:32:15",
      type: "TRADE_EXECUTED",
      bot: "VWAP_1",
      message: "Long position opened at $28,450 - Risk: 2%",
      status: "success",
      details: "1000 shares | Profit target: $28,950 | Stop loss: $28,000",
    },
    {
      id: 2,
      timestamp: "2024-01-04 14:31:02",
      type: "SIGNAL_GENERATED",
      bot: "Trend_Scanner",
      message: "Bullish alignment detected - EMA confluence",
      status: "info",
      details: "EMA 20/50/200 aligned | Volume confirmation: 120% above average",
    },
    {
      id: 3,
      timestamp: "2024-01-04 14:30:45",
      type: "BOT_PAUSED",
      bot: "VOL_2",
      message: "High risk bot paused due to health score < 70",
      status: "warning",
      details: "Health score dropped to 68 | Reason: High volatility + low win rate",
    },
    {
      id: 4,
      timestamp: "2024-01-04 14:29:33",
      type: "TRADE_CLOSED",
      bot: "VWAP_1",
      message: "Short position closed - Profit: +$156.50",
      status: "success",
      details: "Entry: $28,500 | Exit: $28,445 | Win rate impact: +1.4%",
    },
    {
      id: 5,
      timestamp: "2024-01-04 14:28:10",
      type: "GOVERNANCE_CHECK",
      bot: "System",
      message: "Health score updated: 78 → 81 (Optimal)",
      status: "success",
      details: "Trend: +12% | Volatility: Stable | All bots eligible",
    },
    {
      id: 6,
      timestamp: "2024-01-04 14:27:22",
      type: "ERROR",
      bot: "Momentum_3",
      message: "Failed to fetch TradingView data - Retry in 30s",
      status: "error",
      details: "Connection timeout | Fallback data: 15min delayed",
    },
  ])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-emerald-400" />
      case "warning":
        return <AlertCircle className="w-4 h-4 text-yellow-400" />
      case "error":
        return <AlertCircle className="w-4 h-4 text-rose-400" />
      case "info":
        return <Clock className="w-4 h-4 text-cyan-400" />
      default:
        return <Activity className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-emerald-400 bg-emerald-400/10 border-emerald-400/30"
      case "warning":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30"
      case "error":
        return "text-rose-400 bg-rose-400/10 border-rose-400/30"
      case "info":
        return "text-cyan-400 bg-cyan-400/10 border-cyan-400/30"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="p-6 md:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-2 flex items-center gap-3">
                <Activity className="w-9 h-9 text-primary" />
                Execution Logs
              </h1>
              <p className="text-muted-foreground text-sm">Real-time trading activity, signals, and system events</p>
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 smooth-transition">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
          <div className="h-px bg-gradient-to-r from-primary/20 via-accent/10 to-transparent" />
        </div>

        {/* Controls */}
        <Card className="glass-effect border-border mb-8">
          <CardContent className="pt-6 pb-6">
            <div className="flex flex-wrap gap-2">
              {["Last 24h", "Last 7d", "Last 30d", "All Time"].map((period) => (
                <Button
                  key={period}
                  className={
                    period === "Last 24h"
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-secondary border border-border hover:bg-secondary/80"
                  }
                >
                  {period}
                </Button>
              ))}
              <div className="flex-1" />
              <Button
                variant="outline"
                size="icon"
                className="border-border hover:border-primary/50 hover:bg-primary/5 bg-transparent"
              >
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="glass-effect border-border">
            <CardContent className="pt-5 pb-4">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Total Events</p>
              <p className="text-3xl font-bold text-primary">{logs.length}</p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-border">
            <CardContent className="pt-5 pb-4">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Successful</p>
              <p className="text-3xl font-bold text-emerald-400">{logs.filter((l) => l.status === "success").length}</p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-border">
            <CardContent className="pt-5 pb-4">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Warnings</p>
              <p className="text-3xl font-bold text-yellow-400">{logs.filter((l) => l.status === "warning").length}</p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-border">
            <CardContent className="pt-5 pb-4">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Errors</p>
              <p className="text-3xl font-bold text-rose-400">{logs.filter((l) => l.status === "error").length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Log Entries */}
        <div className="space-y-3">
          {logs.map((log) => (
            <Card
              key={log.id}
              className="glass-effect border-border hover:border-primary/30 smooth-transition cursor-pointer group"
            >
              <CardContent className="pt-6 pb-6">
                <div className="flex gap-4">
                  <div className="mt-0.5">{getStatusIcon(log.status)}</div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono text-muted-foreground/70">{log.timestamp}</span>
                        <span className={`text-xs font-bold px-2 py-1 rounded border ${getStatusColor(log.status)}`}>
                          {log.type}
                        </span>
                        <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                          {log.bot}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm font-medium mb-2 group-hover:text-primary smooth-transition">{log.message}</p>

                    <p className="text-xs text-muted-foreground/70 border-l border-primary/20 pl-3 py-1">
                      {log.details}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 ml-auto">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-primary hover:bg-primary/5"
                    >
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <Button variant="outline" className="border-border hover:border-primary/50 hover:bg-primary/5 bg-transparent">
            Load More Logs
          </Button>
        </div>
      </main>
    </div>
  )
}
