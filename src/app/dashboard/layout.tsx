"use client"

import { Sidebar } from "@/components/dashboard/Sidebar"
import { AICopilot } from "@/components/dashboard/AICopilot"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans">
            {/* Mobile Header (Visible only on small screens) */}
            <div className="md:hidden bg-white border-b-2 border-black p-4 flex justify-between items-center sticky top-0 z-50">
                <Link href="/">
                    <Button variant="ghost" className="gap-2 pl-0 hover:bg-transparent font-bold">
                        <ArrowLeft size={20} /> Back to Home
                    </Button>
                </Link>
                <div className="font-black uppercase">AI-E Console_.</div>
            </div>

            {/* Left Sidebar (Navigation) - Fixed width */}
            <Sidebar />

            {/* Main Content Area - Scrollable */}
            <main className="flex-1 overflow-y-auto h-screen p-6 border-r-2 border-black">
                {children}
            </main>

            {/* Right Sidebar (AI Copilot) - Fixed width */}
            <AICopilot />
        </div>
    )
}
