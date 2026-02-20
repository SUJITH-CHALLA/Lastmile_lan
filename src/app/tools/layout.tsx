"use client"

import { Navbar } from "@/components/layout/Navbar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ToolLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <div className="container mx-auto px-4 md:px-8 py-8 pt-28">
                <div className="mb-8">
                    <Link href="/">
                        <Button variant="ghost" className="gap-2 pl-0 hover:bg-transparent hover:underline font-bold text-lg">
                            <ArrowLeft size={20} /> Back to Home
                        </Button>
                    </Link>
                </div>

                <div className="max-w-4xl mx-auto border-2 border-black p-8 shadow-neo bg-white">
                    {children}
                </div>
            </div>
        </div>
    )
}
