"use client"

import { useState, useEffect } from "react"
import { BarChart3, TrendingUp, Zap, Settings, Activity, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import { fetchScanners, toggleScanner } from "@/lib/api"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import TradingViewWidget from "@/components/tradingview-widget"

export default function ScannersPage() {
  const [scanners, setScanners] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isConfiguring, setIsConfiguring] = useState(false)
  const [scanInterval, setScanInterval] = useState("60")

  const handleConfig = () => {
    setIsConfiguring(false)
    toast.success(`Scanning interval updated to ${scanInterval}s`, {
      description: "All automated engines synchronized to new clock cycle.",
    })
  }

  const updateScanners = async () => {
    try {
      const data = await fetchScanners()
      setScanners(data)
      setLoading(false)
    } catch (err) {
      console.error("Failed to fetch scanners:", err)
    }
  }

  useEffect(() => {
    updateScanners()
    const interval = setInterval(updateScanners, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleToggle = async (id: string) => {
    try {
      await toggleScanner(id)
      updateScanners()
    } catch (err) {
      console.error("Failed to toggle scanner:", err)
    }
  }

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case "BULLISH":
        return "text-emerald-400"
      case "BEARISH":
        return "text-rose-400"
      case "OVERSOLD":
        return "text-cyan-400"
      case "READY":
        return "text-yellow-400"
      default:
        return "text-muted-foreground"
    }
  }

  const getSignalBg = (signal: string) => {
    switch (signal) {
      case "BULLISH":
        return "bg-emerald-400/10 border-emerald-400/30"
      case "BEARISH":
        return "bg-rose-400/10 border-rose-400/30"
      case "OVERSOLD":
        return "bg-cyan-400/10 border-cyan-400/30"
      case "READY":
        return "bg-yellow-400/10 border-yellow-400/30"
      default:
        return "bg-muted/10 border-border"
    }
  }

  const activeScanners = scanners.filter((s) => s.status === "active").length

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <Navigation />

      <main className="p-6 md:p-8 space-y-10">
        {/* Institutional Header */}
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="px-2 py-0.5 bg-emerald-400/10 border border-emerald-400/20 rounded text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                  Live Market Intelligence
                </div>
                <div className="px-2 py-0.5 bg-primary/10 border border-primary/20 rounded text-[10px] font-bold text-primary uppercase tracking-widest">
                  Quantum Sync Active
                </div>
              </div>
              <h1 className="text-4xl font-black tracking-tight flex items-center gap-3 italic">
                STRATEGIC SCANNERS
              </h1>
              <p className="text-muted-foreground text-sm max-w-xl font-medium">
                Autonomous scanning engines monitoring {activeScanners} global liquidity nodes for institutional alpha.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="border-emerald-400/30 text-emerald-400 hover:bg-emerald-400/5 font-bold" asChild>
                <a href="https://docs.google.com/spreadsheets" target="_blank">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  VIEW LEDGER
                </a>
              </Button>
              <Dialog open={isConfiguring} onOpenChange={setIsConfiguring}>
                <DialogTrigger asChild>
                  <Button variant="secondary" className="font-bold">
                    <Settings className="w-4 h-4 mr-2" />
                    ENGINE CONFIG
                  </Button>
                </DialogTrigger>
                <DialogContent className="glass-effect border-primary/20">
                  <DialogHeader>
                    <DialogTitle>Quantum Engine Synchronization</DialogTitle>
                    <DialogDescription>
                      Adjust the analytical frequency for high-speed market intelligence.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="scan-interval">Intelligence Frequency (Seconds)</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="scan-interval"
                          type="number"
                          value={scanInterval}
                          onChange={(e) => setScanInterval(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="ghost" onClick={() => setIsConfiguring(false)}>Cancel</Button>
                    <Button onClick={handleConfig} className="bg-primary text-primary-foreground">SYNC PULSE</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Immersive TradingView Chart */}
        <div className="w-full">
          <Card className="glass-effect border-border overflow-hidden shadow-2xl shadow-primary/5 rounded-none border-x-0 lg:rounded-2xl lg:border-x">
            <CardContent className="p-0">
              <div className="h-[650px] w-full">
                <TradingViewWidget />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Intelligence Engines Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.3em] opacity-60">Intelligence Engines</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scanners.map((scanner) => (
              <Card
                key={scanner.id}
                className={`glass-effect border smooth-transition group relative overflow-hidden ${scanner.status === "active"
                  ? "border-primary/20 hover:border-primary/50 shadow-lg shadow-black/20"
                  : "border-border/50 opacity-40 grayscale"
                  }`}
              >
                {/* Status Indicator Bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${scanner.status === "active" ? "bg-primary" : "bg-muted"}`} />

                <CardContent className="pt-8 pb-6 space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-black text-xl tracking-tight uppercase group-hover:text-primary smooth-transition leading-none mb-1">
                        {scanner.name.replace("Scanner", "")}
                      </h3>
                      <p className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-widest">{scanner.condition}</p>
                    </div>
                    <div className={`px-2 py-1 rounded text-[10px] font-black tracking-tighter border ${getSignalColor(scanner.signal)} ${getSignalBg(scanner.signal)}`}>
                      {scanner.signal}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">Confidence</p>
                      <p className="text-xl font-mono font-bold text-primary">{scanner.confidence}%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">30d Alpha</p>
                      <p className={`text-xl font-mono font-bold ${Number.parseFloat(scanner.performance) > 0 ? "text-emerald-400" : "text-rose-400"}`}>
                        {scanner.performance}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-border/50">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest opacity-60">Node Pulse</span>
                      <span className="text-[10px] font-mono text-primary/80">{scanner.lastUpdate}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 px-3 text-[10px] font-bold uppercase tracking-widest border border-border hover:border-primary/50"
                      >
                        ANALYZE
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleToggle(scanner.id)}
                        className={`h-8 px-4 text-[10px] font-black uppercase tracking-widest ${scanner.status === "active"
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "bg-secondary"
                          }`}
                      >
                        {scanner.status === "active" ? "PAUSE" : "ENGAGE"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
