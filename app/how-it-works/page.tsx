"use strict";
import Navigation from "@/components/navigation";
import { ArrowDown, Database, FileSpreadsheet, Activity, Bell } from "lucide-react";

const steps = [
    {
        title: "1. Market Data",
        description: "ScanTrade monitors real-time price and volume data from major exchanges via TradingView logic.",
        icon: <Database className="w-6 h-6 text-blue-400" />
    },
    {
        title: "2. Google Sheets Logic",
        description: "Data hits your private Google Sheet. Simple formulas (e.g. IF(PRICE > VWAP)) check your rules.",
        icon: <FileSpreadsheet className="w-6 h-6 text-green-400" />
    },
    {
        title: "3. Signal Detection",
        description: "When a rule is met, the Sheet marks the row as 'PENDING' and triggers the alert script.",
        icon: <Activity className="w-6 h-6 text-purple-400" />
    },
    {
        title: "4. Discord Alert",
        description: "Our bot instantly posts the signal to your Discord server. You get a notification on your phone.",
        icon: <Bell className="w-6 h-6 text-yellow-400" />
    },
    {
        title: "5. You Trade",
        description: "You open your broker app and verify the chart. If you like the setup, you take the trade manually.",
        icon: <div className="text-xl font-bold text-white">🫵</div>
    }
];

export default function HowItWorks() {
    return (
        <div className="min-h-screen bg-[#020202] text-white selection:bg-emerald-500/30 font-sans">
            <Navigation />

            <main className="container mx-auto px-6 py-16 flex flex-col items-center">
                <div className="text-center mb-16 max-w-2xl">
                    <h1 className="text-4xl font-black mb-4">How It Works</h1>
                    <p className="text-white/40 text-lg">
                        A transparent pipeline from market to mobile.
                        <br /> <span className="text-emerald-400 font-bold">No hidden bots. No black boxes.</span>
                    </p>
                </div>

                <div className="relative max-w-xl w-full">
                    {/* Vertical Line */}
                    <div className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-emerald-500/50 to-transparent hidden sm:block"></div>

                    <div className="space-y-12 relative">
                        {steps.map((step, i) => (
                            <div key={i} className="flex gap-6 items-start relative group">
                                {/* Icon Bubble */}
                                <div className="relative z-10 w-16 h-16 rounded-2xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center shrink-0 shadow-xl group-hover:border-emerald-500/30 transition-colors">
                                    {step.icon}
                                </div>

                                {/* Content */}
                                <div className="pt-2">
                                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                    <p className="text-white/50 leading-relaxed">{step.description}</p>
                                </div>

                                {/* Connector Arrow (Mobile hidden) */}
                                {i !== steps.length - 1 && (
                                    <div className="absolute left-8 top-16 w-px h-12 flex items-center justify-center sm:hidden">
                                        <ArrowDown className="w-4 h-4 text-white/20" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-20 p-6 rounded-xl bg-red-500/10 border border-red-500/20 text-center max-w-lg">
                    <h4 className="text-red-400 font-bold mb-2 uppercase tracking-widest text-xs">Essential Safety Notice</h4>
                    <p className="text-white/80">
                        ScanTrade <span className="font-bold underline">does not</span> place orders for you.
                        We provide the information; the final execution decision is always 100% yours.
                    </p>
                </div>

            </main>
        </div>
    )
}
