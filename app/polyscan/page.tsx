"use client"

import { motion } from "framer-motion"
import { Zap, Shield, Activity, ArrowRight, PieChart, Users, Globe, Database } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function PolyscanHub() {
    return (
        <div className="min-h-screen bg-[#020202] text-white p-8">
            <div className="max-w-6xl mx-auto space-y-16">
                {/* Hero */}
                <header className="space-y-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <Zap className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-xl font-black italic tracking-tighter uppercase text-white">POLYSCAN</span>
                        <Badge variant="outline" className="ml-2 border-primary/20 text-primary text-[10px]">EVOLUTION ACTIVE</Badge>
                    </div>

                    <h1 className="text-6xl sm:text-7xl font-black italic uppercase tracking-tighter leading-none">
                        Probability <br />
                        <span className="text-primary glow-text-primary">Intelligence</span>
                    </h1>

                    <p className="text-xl text-zinc-400 max-w-2xl font-medium leading-relaxed">
                        The decision intelligence layer for decentralized forecasting.
                        Transforming raw market noise into peer-derived probability signals.
                    </p>
                </header>

                {/* Core Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            title: "Market Screeners",
                            desc: "Real-time probability indexing across global event markets.",
                            icon: PieChart,
                            href: "/markets"
                        },
                        {
                            title: "LEO Architect",
                            desc: "Hyper-intelligent agent for probability synthesis and risk modeling.",
                            icon: Zap,
                            href: "/leo"
                        },
                        {
                            title: "Data Rails",
                            desc: "Clean, USDC-denominated data verified by decentralized oracles.",
                            icon: Database,
                            href: "/google-sheets"
                        }
                    ].map((pillar, i) => (
                        <motion.div
                            key={pillar.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-xl bg-[#080808] border border-white/5 hover:border-primary/30 transition-all group"
                        >
                            <pillar.icon className="w-8 h-8 text-primary mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-lg font-black uppercase tracking-widest mb-2">{pillar.title}</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed mb-6">{pillar.desc}</p>
                            <Link href={pillar.href}>
                                <Button variant="link" className="p-0 text-primary uppercase text-xs font-black tracking-widest h-auto">
                                    Access Feature <ArrowRight className="w-3 h-3 ml-2" />
                                </Button>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Status Section */}
                <div className="p-12 rounded-2xl bg-gradient-to-br from-[#0A0A0A] to-black border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Activity className="w-64 h-64 text-primary" />
                    </div>

                    <div className="relative z-10 space-y-8">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black italic uppercase">Parallel Evolution Status</h2>
                            <p className="text-zinc-500 max-w-xl">
                                Polyscan operates in a non-destructive parallel namespace. Your existing ScanTrade dashboard remains untouched and fully operational.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { label: "Namespace", value: "polyscan_*" },
                                { label: "Data Rails", value: "USDC / Polygon" },
                                { label: "Logic Layer", value: "Probability-First" },
                                { label: "Mode", value: "Intelligence Hub" }
                            ].map(stat => (
                                <div key={stat.label}>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-1">{stat.label}</div>
                                    <div className="text-sm font-bold text-zinc-200 uppercase">{stat.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <footer className="pt-16 border-t border-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-zinc-700">
                    <span>© 2026 Polyscan Protocol</span>
                    <div className="flex gap-6">
                        <Link href="/master" className="hover:text-primary transition-colors">Classic Dashboard</Link>
                        <Link href="/markets" className="hover:text-primary transition-colors">Intelligence Hub</Link>
                    </div>
                </footer>
            </div>
        </div>
    )
}
