"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
    LayoutDashboard,
    Search,
    MessageSquare,
    Activity,
    Files,
    Cpu,
    Settings,
    Globe,
    Plus
} from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const activityItems = [
    { id: 'dashboard', label: "Master Hub", href: "/master", icon: LayoutDashboard },
    { id: 'leo', label: "LEO Architect", href: "/leo", icon: Cpu },
    { id: 'screeners', label: "Screeners", href: "/screeners", icon: Search },
    { id: 'discord', label: "Alerts", href: "/discord", icon: MessageSquare },
    { id: 'history', label: "Resources", href: "/how-it-works", icon: Files },
]

export function ActivityBar() {
    const pathname = usePathname()

    return (
        <aside className="w-[50px] bg-sidebar border-r border-border flex flex-col items-center py-3 z-50 select-none shadow-2xl">
            <div className="mb-4">
                <Link href="/master">
                    <div className="w-8 h-8 rounded-md bg-transparent flex items-center justify-center hover:scale-110 transition-transform overflow-hidden px-1">
                        <img src="/logo_transparent.png" alt="ScanTrade" className="w-full h-full object-contain" />
                    </div>
                </Link>
            </div>

            <nav className="flex-1 w-full flex flex-col items-center gap-1">
                <TooltipProvider delayDuration={0}>
                    {activityItems.map((item) => {
                        const isActive = pathname.startsWith(item.href)
                        return (
                            <Tooltip key={item.id}>
                                <TooltipTrigger asChild>
                                    <Link href={item.href} className="w-full flex justify-center group relative">
                                        <div
                                            className={`
                        p-2 rounded-md transition-all duration-150
                        ${isActive
                                                    ? "text-[#FF6C37] bg-white/5"
                                                    : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                                                }
                      `}
                                        >
                                            <item.icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                                        </div>
                                        {isActive && (
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#FF6C37] rounded-r-full" />
                                        )}
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right" className="bg-[#141414] border-[#404040] text-xs">
                                    {item.label}
                                </TooltipContent>
                            </Tooltip>
                        )
                    })}
                </TooltipProvider>
            </nav>

            <div className="flex flex-col items-center gap-1 pb-2">
                <TooltipProvider delayDuration={0}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button className="p-2 text-zinc-500 hover:text-zinc-300 hover:bg-white/5 rounded-md transition-all">
                                <Settings className="w-5 h-5" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="bg-[#141414] border-[#404040] text-xs">
                            Settings
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </aside>
    )
}
