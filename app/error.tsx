'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle, RotateCcw } from 'lucide-react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('CRITICAL APP ERROR:', error)
    }, [error])

    return (
        <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center mb-6">
                <AlertCircle className="w-10 h-10 text-destructive" />
            </div>

            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">
                Neural Link Severed
            </h2>

            <p className="text-zinc-500 mb-8 max-w-md text-sm leading-relaxed">
                A client-side exception has occurred. This could be due to missing configuration or a synchronization error.
                <br />
                <span className="text-[10px] font-mono mt-4 block text-zinc-700">
                    ERROR_CODE: {error.digest || 'UNKNOWN'}
                </span>
            </p>

            <div className="flex gap-4">
                <Button
                    onClick={() => reset()}
                    variant="default"
                    className="bg-primary hover:bg-[#FF8A5E] text-black font-black uppercase text-xs px-8"
                >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Attempt Re-sync
                </Button>

                <Button
                    onClick={() => window.location.href = '/'}
                    variant="outline"
                    className="border-white/10 text-white font-bold uppercase text-xs px-8"
                >
                    Return to Core
                </Button>
            </div>

            <div className="mt-12 p-4 bg-zinc-900/50 border border-white/5 rounded-sm max-w-2xl w-full text-left overflow-auto max-h-[200px]">
                <p className="text-[10px] font-mono text-zinc-600 uppercase mb-2">Diagnostic Trace:</p>
                <pre className="text-[10px] font-mono text-zinc-400 whitespace-pre-wrap">
                    {error.message}
                    {error.stack}
                </pre>
            </div>
        </div>
    )
}
