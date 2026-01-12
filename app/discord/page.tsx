"use strict";
import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";

export default function DiscordPage() {
    return (
        <div className="min-h-screen bg-[#020202] text-white selection:bg-emerald-500/30 font-sans">
            <Navigation />

            <main className="container mx-auto px-6 py-16 flex flex-col items-center">
                <div className="text-center mb-16 max-w-2xl">
                    <h1 className="text-4xl font-black mb-4">Your Alert Hub</h1>
                    <p className="text-white/40 text-lg">
                        ScanTrade uses Discord as a dedicated "Delivery Service".
                        We do not spam. We only send high-quality signals.
                    </p>
                </div>

                {/* Discord Mockup */}
                <div className="w-full max-w-2xl bg-[#313338] rounded-xl border border-[#1e1f22] shadow-2xl overflow-hidden mb-12">
                    {/* Header */}
                    <div className="h-12 border-b border-[#1e1f22] flex items-center px-4 bg-[#2b2d31]">
                        <div className="font-bold text-white/90"># crypto-alerts</div>
                    </div>

                    {/* Messages */}
                    <div className="p-4 space-y-6 font-sans">
                        {/* Message 1 */}
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-xl">S</div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-emerald-400">ScanTrade Bot</span>
                                    <span className="text-[10px] bg-[#5865F2] px-1 rounded text-white uppercase font-bold">Bot</span>
                                    <span className="text-xs text-white/30">Today at 10:42 AM</span>
                                </div>
                                <div className="text-white/90 bg-[#2b2d31] p-3 rounded-md border-l-4 border-emerald-500">
                                    <div className="font-bold mb-1">🚨 VWAP Breakout Detected</div>
                                    <div className="text-sm space-y-1">
                                        <p><strong>Asset:</strong> BTC/USDT</p>
                                        <p><strong>Price:</strong> $44,250</p>
                                        <p><strong>Volume:</strong> 2.5x Avg</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Message 2 */}
                        <div className="flex gap-4 opacity-50">
                            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-xl">S</div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-emerald-400">ScanTrade Bot</span>
                                    <span className="text-[10px] bg-[#5865F2] px-1 rounded text-white uppercase font-bold">Bot</span>
                                    <span className="text-xs text-white/30">Today at 9:15 AM</span>
                                </div>
                                <div className="text-white/90 bg-[#2b2d31] p-3 rounded-md border-l-4 border-red-500">
                                    <div className="font-bold mb-1">🔻 RSI Overbought Reversal</div>
                                    <div className="text-sm space-y-1">
                                        <p><strong>Asset:</strong> SOL/USDT</p>
                                        <p><strong>Price:</strong> $108.20</p>
                                        <p><strong>RSI:</strong> 78 (Turning Down)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Button size="lg" className="bg-[#5865F2] hover:bg-[#4752c4] text-white font-bold h-12 px-8">
                    Add Bot to Server
                </Button>
                <p className="text-xs text-white/30 mt-4">
                    Requires 'Manage Webhooks' permission.
                </p>

            </main>
        </div>
    )
}
