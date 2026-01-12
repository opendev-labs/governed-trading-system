"use strict";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation";
import Link from "next/link";
import { ArrowRight, Bell, Zap, Shield, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-emerald-500/30 overflow-x-hidden font-sans">
      <Navigation />

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-24 sm:py-32 flex flex-col items-center text-center relative z-10">

        {/* Background Decor */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[10px] font-bold tracking-widest uppercase text-white/60">System Active</span>
        </div>

        <h1 className="text-5xl sm:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50 mb-6 max-w-4xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
          ScanTrade.
          <br />
          <span className="text-emerald-400">Simple Alerts.</span>
        </h1>

        <p className="text-lg sm:text-xl text-white/40 max-w-2xl mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          We watch the market so you don't have to.
          Simple screeners sent directly to your Discord.
          <br className="hidden sm:block" />
          <span className="text-white/70 font-semibold mt-2 block">No automated trading. No confusion.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
          <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold tracking-wide h-12 px-8" asChild>
            <Link href="/discord">
              Join Discord <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 text-white h-12 px-8" asChild>
            <Link href="/how-it-works">
              How it Works
            </Link>
          </Button>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-32 w-full max-w-5xl animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-left hover:bg-white/10 transition-colors">
            <Zap className="w-8 h-8 text-yellow-400 mb-4" />
            <h3 className="text-lg font-bold mb-2">Instant Alerts</h3>
            <p className="text-sm text-white/40">Real-time notifications sent to your phone via Discord as soon as a setup triggers.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-left hover:bg-white/10 transition-colors">
            <Shield className="w-8 h-8 text-emerald-400 mb-4" />
            <h3 className="text-lg font-bold mb-2">Safe & Manual</h3>
            <p className="text-sm text-white/40">We find the trade, you take the trade. No risk of bots losing your money.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-left hover:bg-white/10 transition-colors">
            <CheckCircle2 className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="text-lg font-bold mb-2">Proven Logic</h3>
            <p className="text-sm text-white/40">Built on standard indicators like VWAP, RSI, and Volume. No black/box magic.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
