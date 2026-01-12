"use strict";
import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

export default function Pricing() {
    return (
        <div className="min-h-screen bg-[#020202] text-white selection:bg-emerald-500/30 font-sans">
            <Navigation />

            <main className="container mx-auto px-6 py-16 flex flex-col items-center">
                <div className="text-center mb-16 max-w-2xl">
                    <h1 className="text-4xl font-black mb-4">Simple Pricing</h1>
                    <p className="text-white/40 text-lg">
                        Start free. Upgrade for faster alerts and custom logic assistance.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
                    {/* Free Tier */}
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 flex flex-col">
                        <div className="mb-4">
                            <span className="text-sm font-bold tracking-widest text-white/40 uppercase">Starter</span>
                            <div className="text-4xl font-black mt-2">Free</div>
                            <p className="text-white/40 mt-2">Forever free for basic scanning.</p>
                        </div>

                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3"><Check className="w-5 h-5 text-emerald-400" /> <span>3 Standard Screeners</span></li>
                            <li className="flex items-center gap-3"><Check className="w-5 h-5 text-emerald-400" /> <span>15m Alert Delay</span></li>
                            <li className="flex items-center gap-3"><Check className="w-5 h-5 text-emerald-400" /> <span>Discord Community Support</span></li>
                        </ul>

                        <Button variant="outline" className="w-full border-white/10 hover:bg-white/10 h-12" asChild>
                            <Link href="/discord">Join Discord</Link>
                        </Button>
                    </div>

                    {/* Pro Tier */}
                    <div className="p-8 rounded-2xl bg-gradient-to-b from-emerald-500/10 to-transparent border border-emerald-500/20 flex flex-col relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
                        <div className="mb-4">
                            <span className="text-sm font-bold tracking-widest text-emerald-400 uppercase">Pro Trader</span>
                            <div className="text-4xl font-black mt-2">$29<span className="text-lg text-white/40 font-normal">/mo</span></div>
                            <p className="text-white/40 mt-2">For active intraday traders.</p>
                        </div>

                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3"><Check className="w-5 h-5 text-emerald-400" /> <span>Unlimited Screeners</span></li>
                            <li className="flex items-center gap-3"><Check className="w-5 h-5 text-emerald-400" /> <span>Instant Alerts (0 delay)</span></li>
                            <li className="flex items-center gap-3"><Check className="w-5 h-5 text-emerald-400" /> <span>Custom Sheet Logic Setup</span></li>
                            <li className="flex items-center gap-3"><Check className="w-5 h-5 text-emerald-400" /> <span>Priority Support</span></li>
                        </ul>

                        <Button className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold h-12">
                            Start Pro Trial
                        </Button>
                        <p className="text-center text-xs text-white/30 mt-3">7-day money back guarantee.</p>
                    </div>
                </div>

                <div className="mt-16 text-center text-white/30 text-sm max-w-lg">
                    Prices are in USD. We accept Crypto and Cards.
                    <br />
                    ScanTrade is a software tool, not a financial advisor.
                </div>

            </main>
        </div>
    )
}
