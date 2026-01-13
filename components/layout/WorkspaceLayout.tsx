"use client"

import { useState, useEffect, useCallback } from 'react'
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels'
import { ActivityBar } from '@/components/layout/ActivityBar'
import { SidebarPanel } from '@/components/layout/SidebarPanel'
import { TopHeader } from '@/components/layout/TopHeader'
import { TooltipProvider } from '@/components/ui/tooltip'

export function WorkspaceLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true)
    const [isMounted, setIsMounted] = useState(false)

    // Persist sidebar state
    useEffect(() => {
        setIsMounted(true)
        const savedState = localStorage.getItem('scantrade-sidebar-visible')
        if (savedState !== null) {
            setIsSidebarVisible(savedState === 'true')
        }
    }, [])

    const toggleSidebar = useCallback(() => {
        setIsSidebarVisible(prev => {
            const newState = !prev
            localStorage.setItem('scantrade-sidebar-visible', String(newState))
            return newState
        })
    }, [])

    // Keyboard shortcut Ctrl+B
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
                e.preventDefault()
                toggleSidebar()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [toggleSidebar])

    if (!isMounted) return null

    return (
        <TooltipProvider delayDuration={0}>
            <div className="flex flex-col h-screen bg-[#050505]">
                <TopHeader onToggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} />
                <div className="flex-1 flex overflow-hidden">
                    <ActivityBar />

                    <PanelGroup direction="horizontal">
                        {isSidebarVisible && (
                            <>
                                <Panel defaultSize={20} minSize={15} maxSize={40} className="border-r border-border shadow-2xl z-10 transition-all duration-300">
                                    <SidebarPanel onClose={toggleSidebar} />
                                </Panel>
                                <PanelResizeHandle className="w-[1.5px] bg-border hover:bg-primary/50 transition-colors cursor-col-resize active:bg-primary" />
                            </>
                        )}

                        <Panel className="bg-background relative">
                            <main className="h-full overflow-auto custom-scrollbar">
                                {children}
                            </main>
                        </Panel>
                    </PanelGroup>
                </div>
            </div>
        </TooltipProvider>
    )
}
