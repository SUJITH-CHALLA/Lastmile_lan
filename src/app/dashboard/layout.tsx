import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Feed — AI-E Console | LastMile",
    description: "Manage your AI-powered job applications.",
}
import { Sidebar } from "@/components/dashboard/Sidebar"
import { AICopilot } from "@/components/dashboard/AICopilot"
import { DemoBanner } from "@/components/dashboard/DemoBanner"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Zap } from "lucide-react"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans">
            {/* Demo Mode Banner */}
            <DemoBanner />

            {/* Mobile Header (Visible only on small screens) */}
            <div className="md:hidden bg-white border-b-2 border-black p-4 flex justify-between items-center sticky top-0 z-50">
                <Link href="/dashboard">
                    <Button variant="ghost" className="gap-2 pl-0 hover:bg-transparent font-bold">
                        <ArrowLeft size={20} /> Dashboard
                    </Button>
                </Link>
                <div className="font-black uppercase">AI-E Console</div>
            </div>

            {/* Left Sidebar (Navigation) - Fixed width */}
            <Sidebar />

            {/* Main Content Area - Scrollable */}
            <main className="flex-1 overflow-y-auto h-screen p-6 border-r-2 border-black">
                {children}
            </main>

            {/* Right Sidebar (AI Intelligence) - Fixed width */}
            <AICopilot />

            {/* Global Floating Action Button */}
            <div className="fixed bottom-6 right-6 lg:right-[340px] z-50">
                <Button className="h-14 px-6 md:px-8 text-base md:text-lg font-black uppercase bg-green-400 hover:bg-green-500 text-black border-2 border-black shadow-neo hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all rounded-full flex items-center gap-2">
                    <Zap className="fill-black" size={24} />
                    <span className="hidden sm:inline">One-Click Apply</span>
                </Button>
            </div>
        </div>
    )
}
