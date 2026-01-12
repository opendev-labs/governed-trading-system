"use strict";
import Navigation from "@/components/navigation";

export default function Terms() {
    return (
        <div className="min-h-screen bg-[#020202] text-white selection:bg-emerald-500/30 font-sans">
            <Navigation />

            <main className="container mx-auto px-6 py-16 flex flex-col items-center">
                <div className="max-w-3xl prose prose-invert">
                    <h1 className="text-4xl font-black mb-8 text-center">Terms of Service</h1>

                    <h3>1. Educational Purpose Only</h3>
                    <p>
                        ScanTrade is a software tool for market analysis and alerts. It does not provide financial advice, investment recommendations, or trading signals that guarantee profit. You are solely responsible for your trading decisions.
                    </p>

                    <h3>2. No Automated Execution</h3>
                    <p>
                        The software is strictly prohibited from being modified to perform automated trade execution. We provide alerts; the execution is manual and at the user's discretion.
                    </p>

                    <h3>3. Limitation of Liability</h3>
                    <p>
                        ScanTrade and its developers are not liable for any financial losses incurred while using this software. Markets are volatile and software can experience delays or errors.
                    </p>

                    <h3>4. Usage Rights</h3>
                    <p>
                        You are granted a limited, personal, non-transferable license to use the software. You agree not to resell or redistribute the source code or access credentials.
                    </p>

                    <p className="text-sm text-white/30 mt-12 text-center">
                        Last Updated: January 2026
                    </p>
                </div>
            </main>
        </div>
    )
}
