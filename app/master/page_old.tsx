"use client"

import { useState } from "react"
import { BarChart3, Zap, Globe, ExternalLink, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/navigation"
import TradingViewWidget from "@/components/tradingview-widget"
import { toast } from "sonner"

export default function QuantumHub() {
    const [isSyncing, setIsSyncing] = useState(false)

    // Placeholder Sheet ID - User should replace this in .env
    const sheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID || "1_placeholder_id"
    const embedUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/edit?rm=minimal`

    const handleManualSync = async () => {
        setIsSyncing(true)
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 2000)),
            {
                loading: 'Synchronizing Quantum Engines...',
                success: 'Sync Complete. Ledger updated.',
                error: 'Sync failed. Check backend connection.',
            }
        )
        setTimeout(() => setIsSyncing(false), 2000)
    }

    return (
        <div className="h-screen flex flex-col bg-black text-white selection:bg-primary/30 overflow-hidden">
            <Navigation />

            {/* Institutional Top Bar */}
            <div className="bg-zinc-900/50 border-b border-white/5 px-6 py-3 flex justify-between items-center backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-primary tracking-[0.3em] uppercase opacity-80">Quantum Hub</span>
                        <span className="text-xl font-black italic tracking-tighter">THE COMMANDER</span>
                    </div>
                    <div className="h-8 w-px bg-white/10 hidden sm:block" />
                    <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-white/40">
                        <Globe className="w-3 h-3" />
                        LIVE MULTI-SYNC ACTIVE
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        onClick={handleManualSync}
                        disabled={isSyncing}
                        className="bg-primary text-primary-foreground font-black tracking-widest text-[10px] px-6 h-10 shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                    >
                        <RefreshCcw className={`w-3 h-3 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
                        SYNC NOW
                    </Button>
                    <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 text-[10px] font-bold" asChild>
                        <a href={embedUrl.replace("?rm=minimal", "")} target="_blank">
                            <ExternalLink className="w-3 h-3 mr-2" />
                            FULL LEDGER
                        </a>
                    </Button>
                </div>
            </div>

            {/* Main Split Screen */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                {/* Left: TradingView (Immersive) */}
                <div className="flex-[6] border-r border-white/5 relative bg-zinc-950">
                    <div className="absolute top-4 left-6 z-10">
                        <div className="bg-black/60 backdrop-blur-xl border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                            <span className="text-[10px] font-black tracking-widest text-emerald-400 uppercase">Live Intel</span>
                        </div>
                    </div>
                    <TradingViewWidget />
                </div>

                {/* Right: Google Sheet (The Ledger) */}
                <div className="flex-[4] flex flex-col bg-zinc-900/20 backdrop-blur-3xl">
                    <div className="px-6 py-4 flex items-center justify-between border-b border-white/5">
                        <div className="flex items-center gap-2">
                            <BarChart3 className="w-4 h-4 text-primary" />
                            <span className="text-xs font-bold tracking-widest uppercase opacity-70">Institutional Ledger</span>
                        </div>
                        <div className="text-[9px] font-mono text-white/30 italic">Real-time Sheets Integration</div>
                    </div>
                    <div className="flex-1 w-full bg-white relative">
                        <iframe
                            src={embedUrl}
                            className="absolute inset-0 w-full h-full border-0"
                            allowFullScreen
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
