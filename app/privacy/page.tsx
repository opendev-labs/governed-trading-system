"use strict";
import Navigation from "@/components/navigation";

export default function Privacy() {
    return (
        <div className="min-h-screen bg-[#020202] text-white selection:bg-emerald-500/30 font-sans">
            <Navigation />

            <main className="container mx-auto px-6 py-16 flex flex-col items-center">
                <div className="max-w-3xl prose prose-invert">
                    <h1 className="text-4xl font-black mb-8 text-center">Privacy Policy</h1>

                    <h3>1. Data Collection</h3>
                    <p>
                        We collect minimal data required to provide the service: your Discord User ID (for alerts) and generic usage analytics (page views). We do not collect personal financial data or brokerage login credentials.
                    </p>

                    <h3>2. Google Sheets Access</h3>
                    <p>
                        When utilizing the Google Sheets integration, the script runs entirely within your own Google account. We do not have access to your private spreadsheet data unless you explicitly share it for support purposes.
                    </p>

                    <h3>3. Data Sharing</h3>
                    <p>
                        We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users.
                    </p>

                    <h3>4. Security</h3>
                    <p>
                        We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access.
                    </p>

                    <p className="text-sm text-white/30 mt-12 text-center">
                        Last Updated: January 2026
                    </p>
                </div>
            </main>
        </div>
    )
}
