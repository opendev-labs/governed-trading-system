"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Terminal, Shield, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError("Invalid credentials. Try admin@scantrade.com / admin123");
            setIsLoading(false);
        } else {
            router.push("/master");
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 select-none font-sans">
            <div className="w-full max-w-[360px] animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex flex-col items-center mb-10">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 glow-primary">
                        <img src="/logo_transparent.png" alt="ScanTrade" className="w-10 h-10 object-contain" />
                    </div>
                    <h1 className="text-2xl font-black text-white tracking-tighter uppercase italic">ScanTrade <span className="text-zinc-700">Auth</span></h1>
                    <p className="text-zinc-600 text-xs mt-1 uppercase tracking-widest font-bold">Secure Intelligence Node</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Identity (Email)</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#141414] border border-border/50 rounded-sm py-2 px-3 text-sm text-white placeholder:text-zinc-800 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none transition-all"
                            placeholder="trader@scantrade.com"
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Access Key (Password)</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#141414] border border-border/50 rounded-sm py-2 px-3 text-sm text-white placeholder:text-zinc-800 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none transition-all"
                            required
                        />
                    </div>

                    {error && (
                        <div className="p-3 rounded-sm bg-red-500/10 border border-red-500/20 text-red-500 text-[11px] font-bold leading-tight">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary hover:bg-[#FF8A5E] disabled:bg-zinc-800 disabled:text-zinc-600 text-black font-black py-2.5 rounded-sm transition-all flex items-center justify-center gap-2 group shadow-xl active:scale-[0.98]"
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <>
                                INITIALIZATION SESSION <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-border/50 flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2 text-[10px] text-zinc-600 uppercase tracking-widest font-bold">
                        <Shield className="w-3 h-3" /> Encrypted non-custodial link
                    </div>
                    <p className="text-[10px] text-zinc-700 text-center max-w-[240px] leading-relaxed italic">
                        Unauthorized access to this intelligence node is strictly prohibited.
                    </p>
                </div>
            </div>
        </div>
    );
}
