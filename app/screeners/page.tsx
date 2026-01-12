"use strict";
import Navigation from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, BarChart3, Activity, ArrowUpRight } from "lucide-react";

const screeners = [
    {
        title: "VWAP Breakout",
        description: "Detects when price crosses above the Volume Weighted Average Price with momentum.",
        icon: <TrendingUp className="w-8 h-8 text-emerald-400" />,
        timeframe: "15m",
        example: "BTCUSDT crossed VWAP (Bullish) @ $45,200",
    },
    {
        title: "Volume Spike",
        description: "Alerts when volume exceeds 3x the 20-period average.",
        icon: <BarChart3 className="w-8 h-8 text-blue-400" />,
        timeframe: "5m",
        example: "ETHUSDT Volume Spike (3.5x) @ $2,400",
    },
    {
        title: "RSI Reversal",
        description: "Identifies overbought (>70) or oversold (<30) conditions with a reversal candle.",
        icon: <Activity className="w-8 h-8 text-purple-400" />,
        timeframe: "1h",
        example: "SOLUSDT RSI Oversold Reversal (28) @ $98.50",
    },
    {
        title: "Trend Continuation",
        description: "Finds pullbacks in a strong uptrend (EMA 20 > EMA 50).",
        icon: <ArrowUpRight className="w-8 h-8 text-yellow-400" />,
        timeframe: "4h",
        example: "BNBUSDT Trend Pullback Buy Signal @ $310",
    }
];

export default function Screeners() {
    return (
        <div className="min-h-screen bg-[#020202] text-white selection:bg-emerald-500/30 font-sans">
            <Navigation />

            <main className="container mx-auto px-6 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-black mb-4">Screener Catalog</h1>
                    <p className="text-white/40 max-w-2xl mx-auto">
                        These are the pre-built logic modules running 24/7.
                        When they trigger, you get an alert. That's it.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {screeners.map((s, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-black/50 rounded-lg border border-white/5 group-hover:border-emerald-500/30 transition-colors">
                                    {s.icon}
                                </div>
                                <Badge variant="outline" className="border-white/20 text-white/60">
                                    {s.timeframe}
                                </Badge>
                            </div>
                            <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                            <p className="text-sm text-white/50 mb-6 h-10">{s.description}</p>

                            <div className="bg-black/40 p-3 rounded-lg border border-white/5">
                                <p className="text-[10px] uppercase font-bold text-white/30 mb-1">Alert Example</p>
                                <p className="font-mono text-xs text-emerald-400">🚨 {s.example}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}
