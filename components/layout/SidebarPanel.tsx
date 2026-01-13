"use client"

import { useState } from "react"
import { Search, ChevronDown, ChevronRight, Plus, Folder, Layout, Database, Terminal, Cpu, MessageSquare, Info, CreditCard, FileSpreadsheet, X } from "lucide-react"

interface SidebarPanelProps {
    onClose?: () => void
}
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarSectionProps {
    title: string
    isOpenInitial?: boolean
    children: React.ReactNode
}

function SidebarSection({ title, isOpenInitial = true, children }: SidebarSectionProps) {
    const [isOpen, setIsOpen] = useState(isOpenInitial)

    return (
        <div className="mb-2">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center gap-1 px-3 py-1.5 text-zinc-400 hover:bg-white/5 transition-colors group"
            >
                {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                <span className="text-[11px] font-bold uppercase tracking-wider flex-1 text-left">{title}</span>
                <Plus className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity hover:text-white" />
            </button>
            {isOpen && <div className="mt-0.5">{children}</div>}
        </div>
    )
}

interface SidebarItemProps {
    icon: React.ElementType
    label: string
    href: string
    active?: boolean
    level?: number
}

function SidebarItem({ icon: Icon, label, href, active, level = 0 }: SidebarItemProps) {
    const pathname = usePathname()
    const isCurrent = active || pathname === href

    return (
        <Link href={href} className="block w-full">
            <button
                className={`
                    w-full flex items-center gap-2 py-1.5 px-3 transition-colors text-left group
                    ${isCurrent
                        ? "bg-[#FF6C37]/10 text-[#FF6C37]"
                        : "text-zinc-300 hover:bg-white/5 hover:text-white"
                    }
                `}
                style={{ paddingLeft: `${(level + 1) * 12}px` }}
            >
                <Icon className={`w-4 h-4 ${isCurrent ? 'text-[#FF6C37]' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
                <span className={`text-[12px] truncate ${isCurrent ? 'font-bold' : ''}`}>{label}</span>
            </button>
        </Link>
    )
}

export function SidebarPanel({ onClose }: SidebarPanelProps) {
    return (
        <div className="h-full bg-[#050505] flex flex-col w-full border-r border-border overflow-hidden">
            <div className="p-3 flex items-center gap-2">
                <div className="relative group flex-1">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Search Collections"
                        className="w-full bg-[#141414] border border-transparent focus:border-border/50 focus:ring-1 focus:ring-primary/40 rounded-sm py-1.5 pl-8 pr-3 text-[12px] text-zinc-300 placeholder:text-zinc-700 outline-none transition-all"
                    />
                </div>
                <button
                    onClick={onClose}
                    className="p-1 px-1.5 rounded-sm hover:bg-white/5 text-zinc-600 hover:text-zinc-300 md:hidden"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pt-1">
                <SidebarSection title="Personal Workspace">
                    <SidebarItem icon={Layout} label="Master Hub" href="/master" />
                    <SidebarItem icon={Cpu} label="Active Screeners" href="/screeners" />
                    <SidebarItem icon={Terminal} label="LEO Architect" href="/leo" />
                    <SidebarItem icon={MessageSquare} label="Discord Alerts" href="/discord" />
                    <SidebarItem icon={FileSpreadsheet} label="Sheet Scanner" href="/google-sheets" />
                </SidebarSection>

                <SidebarSection title="Resources">
                    <SidebarItem icon={Info} label="How it Works" href="/how-it-works" />
                    <SidebarItem icon={CreditCard} label="Pricing" href="/pricing" />
                </SidebarSection>

                <SidebarSection title="Collections" isOpenInitial={false}>
                    <SidebarItem icon={Folder} label="HFT Screeners" href="#" />
                    <SidebarItem icon={Folder} label="Risk Alerts" href="#" />
                </SidebarSection>

                <SidebarSection title="Environments" isOpenInitial={false}>
                    <SidebarItem icon={Database} label="Production" href="#" />
                    <SidebarItem icon={Database} label="Staging" href="#" />
                </SidebarSection>
            </div>

            <div className="p-2 border-t border-[#222222]">
                <button className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-[#FF6C37] hover:bg-[#FF5511] text-[#050505] font-semibold rounded-sm text-xs transition-colors">
                    <Plus className="w-3.5 h-3.5" />
                    New Collection
                </button>
            </div>
        </div>
    )
}
