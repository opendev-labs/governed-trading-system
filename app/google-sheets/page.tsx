"use strict";
import Navigation from "@/components/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileSpreadsheet } from "lucide-react";

export default function SheetsPage() {
    return (
        <div className="min-h-screen bg-[#020202] text-white selection:bg-emerald-500/30 font-sans">
            <Navigation />

            <main className="container mx-auto px-6 py-16 flex flex-col items-center">
                <div className="text-center mb-16 max-w-2xl">
                    <h1 className="text-4xl font-black mb-4">The Brain: Google Sheets</h1>
                    <p className="text-white/40 text-lg">
                        We use Google Sheets as our logic engine because it is transparent, editable, and reliable.
                        <br /> <span className="text-white/80">If you can edit a spreadsheet, you can control ScanTrade.</span>
                    </p>
                </div>

                {/* Sheet Mockup */}
                <div className="w-full max-w-4xl bg-white text-black rounded-lg shadow-2xl overflow-hidden mb-12 border-4 border-white/10">
                    <div className="bg-[#1f8e3d] text-white px-4 py-2 flex items-center gap-2 font-bold text-sm">
                        <FileSpreadsheet className="w-4 h-4" /> ScanTrade_Logic_v1
                    </div>
                    <div className="p-8 overflow-x-auto bg-white">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-b-2 border-gray-200">
                                    <TableHead className="font-bold text-black w-[100px]">ID</TableHead>
                                    <TableHead className="font-bold text-black">SYMBOL</TableHead>
                                    <TableHead className="font-bold text-black">CONDITION</TableHead>
                                    <TableHead className="font-bold text-black">PRICE</TableHead>
                                    <TableHead className="font-bold text-black">STATUS</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow className="bg-emerald-50">
                                    <TableCell className="font-mono text-gray-500">001</TableCell>
                                    <TableCell className="font-bold">BTCUSDT</TableCell>
                                    <TableCell>VWAP_CROSS_UP</TableCell>
                                    <TableCell>$44,100</TableCell>
                                    <TableCell><span className="bg-emerald-200 text-emerald-800 px-2 py-1 rounded text-xs font-bold">SENT</span></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-mono text-gray-500">002</TableCell>
                                    <TableCell className="font-bold">ETHUSDT</TableCell>
                                    <TableCell>VOLUME_SPIKE</TableCell>
                                    <TableCell>$2,250</TableCell>
                                    <TableCell><span className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs font-bold">PENDING</span></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-mono text-gray-500">003</TableCell>
                                    <TableCell className="font-bold">SOLUSDT</TableCell>
                                    <TableCell>RSI_OVERSOLD</TableCell>
                                    <TableCell>$98.00</TableCell>
                                    <TableCell><span className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs font-bold">PENDING</span></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 text-xs text-gray-500 border-t border-gray-200 text-center">
                        User defined logic lives here. ScanTrade simply marks 'PENDING' rows as 'SENT'.
                    </div>
                </div>

            </main>
        </div>
    )
}
