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
import { SettingsDialog } from "@/components/settings-dialog"

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
            <SettingsDialog />
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
        </div>

        {/* Status Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <Card className="glass-effect border-primary/20 bg-gradient-to-br from-primary/5 to-transparent col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-primary" />
                Institutional Control Plane
              </CardTitle>
              <CardDescription>High-precision execution and governance overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Encryption Status</span>
                    <span className="text-emerald-400 font-mono font-bold">AES-256 ACTIVE</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Quantum Pulse</span>
                    <span className="text-cyan-400 font-mono">1.2ms SYNCHRONIZED</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Institutional Node</span>
                    <span className="text-primary font-mono">GLOBAL-ALPHA-01</span>
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-3">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 font-bold py-6">
                    <Zap className="w-5 h-5 mr-2" />
                    ACTIVATE EMERGENCY STOP
                  </Button>
                  <Button variant="outline" className="w-full border-emerald-400/30 hover:bg-emerald-400/5 text-emerald-400 font-bold py-6" asChild>
                    <a href="https://docs.google.com/spreadsheets" target="_blank">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      OPEN LIVE GOOGLE SHEET
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-border">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Capital Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-end">
                <p className="text-3xl font-bold text-emerald-400">+12.4%</p>
                <p className="text-xs text-muted-foreground pb-1">30-day Alpha</p>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 w-[72%]" />
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-muted-foreground mb-1">Sharpe Ratio</p>
                  <p className="font-bold text-cyan-400 text-lg">2.84</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Max Drawdown</p>
                  <p className="font-bold text-rose-400 text-lg">-4.2%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Module Navigation */}
        <div className="mb-10">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mb-6 opacity-60">Strategic Modules</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                name: "Market Intel",
                href: "/scanners",
                desc: "Institutional scanning engines",
                icon: "⚛️",
                color: "group-hover:text-primary"
              },
              { name: "Alpha Agents", href: "/bots", desc: "Proprietary execution bots", icon: "🧬", color: "group-hover:text-cyan-400" },
              { name: "Risk Guardian", href: "/governance", desc: "Automated capital protection", icon: "🛡️", color: "group-hover:text-emerald-400" },
              { name: "Terminal Logs", href: "/logs", desc: "Raw transaction telemetry", icon: "📟", color: "group-hover:text-rose-400" },
            ].map((module) => (
              <a key={module.href} href={module.href} className="group">
                <div className="glass-effect border border-border hover:border-primary/50 p-6 rounded-xl smooth-transition hover:shadow-2xl hover:shadow-primary/10">
                  <div className="text-3xl mb-4 transform group-hover:scale-110 smooth-transition">{module.icon}</div>
                  <h3 className={`font-bold mb-1 smooth-transition ${module.color}`}>{module.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{module.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
