"use client";

import { ArrowRight, Activity, Terminal, Shield, CheckCircle2, Zap, BarChart3, Bell, TrendingUp, Github, Mail } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/components/providers/auth-provider";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#020202] overflow-auto">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[180px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[180px]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10 text-center py-20">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-primary">Live Intelligence Systems</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl sm:text-7xl lg:text-8xl font-black text-white tracking-tighter italic uppercase mb-6 leading-none"
          >
            PROFESSIONAL
            <br />
            <span className="text-primary glow-text-primary">MARKET INTELLIGENCE</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl sm:text-2xl text-zinc-400 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Advanced screeners, real-time Discord alerts, and institutional-grade analysis.
            Your competitive edge in modern markets.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            {user ? (
              <Link
                href="/master"
                className="px-8 py-4 bg-primary hover:bg-[#FF8A5E] text-black font-black text-sm uppercase tracking-wider rounded-sm transition-all shadow-2xl hover:shadow-primary/50 flex items-center gap-2 group"
              >
                Enter Dashboard <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <Link
                href="/signin"
                className="px-8 py-4 bg-primary hover:bg-[#FF8A5E] text-black font-black text-sm uppercase tracking-wider rounded-sm transition-all shadow-2xl hover:shadow-primary/50 flex items-center gap-2 group"
              >
                Get Started Free <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
            <Link
              href="/how-it-works"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm uppercase tracking-wider rounded-sm transition-all flex items-center gap-2"
            >
              How It Works
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-8 text-[10px] text-zinc-600 uppercase tracking-widest font-black"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary/50" />
              <span>Non-Custodial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary/50" />
              <span>Open Source</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary/50" />
              <span>Real-Time Alerts</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter italic uppercase mb-4">
              Built for <span className="text-primary">Serious Traders</span>
            </h2>
            <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
              Professional tools that give you an institutional advantage without the institutional overhead.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Terminal,
                title: "Advanced Screeners",
                description: "Scan thousands of assets with institutional-grade indicators. VWAP, RSI, MVWAP, and custom logic.",
                link: "/screeners"
              },
              {
                icon: Bell,
                title: "Discord Alerts",
                description: "Instant notifications to your Discord server when opportunities match your criteria.",
                link: "/discord"
              },
              {
                icon: BarChart3,
                title: "Google Sheets Integration",
                description: "Your strategy lives in spreadsheets. We execute it automatically.",
                link: "/google-sheets"
              },
              {
                icon: Activity,
                title: "Live Signal Feed",
                description: "Unified stream of all intelligence generated by your deployed agents.",
                link: "/master"
              },
              {
                icon: TrendingUp,
                title: "LEO AI Assistant",
                description: "Ask questions, analyze patterns, get insights from your market data using AI.",
                link: "/leo"
              },
              {
                icon: Shield,
                title: "Non-Custodial Safety",
                description: "Your capital stays with you. We never touch your funds or trading accounts.",
                link: "/how-it-works"
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={feature.link}
                  className="group block p-8 rounded-sm bg-[#050505] border border-border hover:border-primary/50 transition-all shadow-xl h-full"
                >
                  <feature.icon className="w-8 h-8 text-primary mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-black text-white uppercase tracking-widest mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn More <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-32 px-4 sm:px-6 bg-[#050505]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter italic uppercase mb-4">
              Simple <span className="text-primary">Workflow</span>
            </h2>
            <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
              From market data to actionable alerts in seconds. No complexity, just results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Define Logic", desc: "Set your criteria in Google Sheets or use our prebuilt screeners" },
              { step: "02", title: "Deploy Scanners", desc: "Activate intelligent agents to monitor markets 24/7" },
              { step: "03", title: "Get Alerts", desc: "Receive instant Discord notifications when signals fire" },
              { step: "04", title: "Take Action", desc: "Review data and execute trades manually on your terms" },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-6xl font-black text-primary/10 mb-4">{item.step}</div>
                <h3 className="text-xl font-black text-white uppercase tracking-wider mb-2">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-12 -right-4 text-primary/30">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl sm:text-6xl font-black text-white tracking-tighter italic uppercase mb-6">
              Ready to <span className="text-primary">Elevate</span> Your Trading?
            </h2>
            <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
              Join professional traders using ScanTrade for market intelligence and real-time alerts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {user ? (
                <Link
                  href="/master"
                  className="px-10 py-5 bg-primary hover:bg-[#FF8A5E] text-black font-black text-base uppercase tracking-wider rounded-sm transition-all shadow-2xl hover:shadow-primary/50 flex items-center gap-3 group"
                >
                  Open Dashboard <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <Link
                  href="/signin"
                  className="px-10 py-5 bg-primary hover:bg-[#FF8A5E] text-black font-black text-base uppercase tracking-wider rounded-sm transition-all shadow-2xl hover:shadow-primary/50 flex items-center gap-3 group"
                >
                  Start Free Today <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
              <Link
                href="/pricing"
                className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-base uppercase tracking-wider rounded-sm transition-all flex items-center gap-3"
              >
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-border/50 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Activity className="w-4 h-4 text-primary" />
                </div>
                <span className="text-white font-black text-lg tracking-tighter uppercase italic">ScanTrade</span>
              </div>
              <p className="text-zinc-600 text-xs leading-relaxed">
                Professional market intelligence for serious traders.
              </p>
            </div>

            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-widest mb-4">Product</h4>
              <ul className="space-y-2 text-zinc-600 text-xs">
                <li><Link href="/screeners" className="hover:text-primary transition-colors">Screeners</Link></li>
                <li><Link href="/discord" className="hover:text-primary transition-colors">Discord Alerts</Link></li>
                <li><Link href="/leo" className="hover:text-primary transition-colors">LEO AI</Link></li>
                <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-widest mb-4">Learn</h4>
              <ul className="space-y-2 text-zinc-600 text-xs">
                <li><Link href="/how-it-works" className="hover:text-primary transition-colors">How It Works</Link></li>
                <li><Link href="/google-sheets" className="hover:text-primary transition-colors">Google Sheets</Link></li>
                <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-widest mb-4">Legal</h4>
              <ul className="space-y-2 text-zinc-600 text-xs">
                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-700 text-[10px] uppercase tracking-widest font-bold">
              © 2026 OpenDev Labs. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="https://github.com/opendev-labs/scantrade" className="text-zinc-700 hover:text-primary transition-colors">
                <Github className="w-4 h-4" />
              </Link>
              <Link href="mailto:contact@opendev-labs.com" className="text-zinc-700 hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
