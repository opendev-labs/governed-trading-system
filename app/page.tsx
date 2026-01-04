"use client"

import { useState, useEffect } from "react"
import { Activity, TrendingUp, Zap, BarChart3, Settings, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import HealthScore from "@/components/health-score"
import SystemStatus from "@/components/system-status"
import QuickStats from "@/components/quick-stats"
import { fetchHealthScore, fetchSystemStatus, fetchQuickStats } from "@/lib/api"

export default function Dashboard() {
  const [healthData, setHealthData] = useState({ score: 78, status: "OPTIMAL" })
  const [systemStatus, setSystemStatus] = useState({
    active_scanners: 5,
    total_scanners: 5,
    active_bots: 3,
    total_bots: 10,
    portfolio_value: 0
  })
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    const updateData = async () => {
      try {
        const [health, status, quickStats] = await Promise.all([
          fetchHealthScore(),
          fetchSystemStatus(),
          fetchQuickStats()
        ])
        setHealthData(health)
        setSystemStatus(status)
        setStats(quickStats)
      } catch (err) {
        console.error("Failed to update dashboard data:", err)
      }
    }

    updateData()
    const interval = setInterval(updateData, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="p-6 md:p-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
            <div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-2">Control Plane</h1>
              <p className="text-muted-foreground text-sm max-w-lg">
                Real-time governance, execution monitoring, and portfolio management
              </p>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="border-border hover:border-primary/50 hover:bg-primary/5 smooth-transition bg-transparent"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
          <div className="h-px bg-gradient-to-r from-primary/20 via-accent/10 to-transparent mt-4" />
        </div>

        {/* Health Score - Hero */}
        <div className="mb-10">
          <HealthScore score={healthData.score} />
        </div>

        {/* System Overview Grid */}
        <div className="mb-10">
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">System Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <SystemStatus
              title="Market Condition"
              status="BULLISH"
              detail="Trend alignment +4.8%, volume increasing"
              icon={TrendingUp}
              color="text-emerald-400"
            />
            <SystemStatus
              title="System Health"
              status={healthData.status}
              detail={`Score: ${Math.round(healthData.score)}/100`}
              icon={Activity}
              color={healthData.score > 70 ? "text-emerald-400" : "text-yellow-400"}
            />
            <SystemStatus
              title="Active Positions"
              status={`${systemStatus.active_bots} / ${systemStatus.total_bots}`}
              detail={`${systemStatus.active_scanners} scanners active, ${systemStatus.active_bots} bots enabled`}
              icon={Zap}
              color="text-cyan-400"
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mb-10">
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">Key Metrics</h2>
          <QuickStats data={stats} />
        </div>

        {/* Module Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Navigation */}
          <Card className="glass-effect border-border col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Quick Navigation
              </CardTitle>
              <CardDescription>Access core trading system modules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  {
                    name: "Market Scanners",
                    href: "/scanners",
                    desc: "5 real-time market analysis engines",
                    icon: "🔍",
                  },
                  { name: "Trading Bots", href: "/bots", desc: "10 semi-automated trading agents", icon: "🤖" },
                  { name: "Governance", href: "/governance", desc: "Risk controls & automation rules", icon: "⚖️" },
                  { name: "Execution Logs", href: "/logs", desc: "Real-time transaction history", icon: "📝" },
                ].map((module) => (
                  <a key={module.href} href={module.href} className="group">
                    <Button className="w-full justify-start bg-gradient-to-br from-secondary to-secondary/50 hover:from-primary/20 hover:to-accent/10 border border-border hover:border-primary/50 smooth-transition h-auto py-3 flex-col items-start">
                      <span className="text-xl mb-1">{module.icon}</span>
                      <span className="font-semibold text-sm">{module.name}</span>
                      <span className="text-xs text-muted-foreground/60 mt-0.5">{module.desc}</span>
                    </Button>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Status Panel */}
          <Card className="glass-effect border-border">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">All Systems</span>
                <span className="text-emerald-400 font-semibold">OPERATIONAL</span>
              </div>
              <div className="h-px bg-border/50" />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Data Feed</span>
                <span className="text-emerald-400">Live</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">API Latency</span>
                <span className="text-cyan-400">12ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Uptime</span>
                <span className="text-emerald-400">99.98%</span>
              </div>
            </CardContent>
          </Card>

          {/* Performance Card */}
          <Card className="glass-effect border-border">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Monthly Return</span>
                <span className="text-emerald-400 font-semibold">+12.4%</span>
              </div>
              <div className="h-px bg-border/50" />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Max Drawdown</span>
                <span className="text-yellow-400">-4.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Sharpe Ratio</span>
                <span className="text-cyan-400">2.8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Sortino Ratio</span>
                <span className="text-primary">4.2</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
