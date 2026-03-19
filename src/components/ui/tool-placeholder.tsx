"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AlertCircle } from "lucide-react"

export default function ToolPlaceholder() {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
            <div className="w-16 h-16 bg-yellow-100 border-2 border-black rounded-full flex items-center justify-center shadow-neo-sm mb-4">
                <AlertCircle className="w-8 h-8 text-black" />
            </div>

            <h1 className="text-3xl md:text-5xl font-black uppercase text-black">
                Coming Soon
            </h1>

            <p className="text-lg text-gray-700 max-w-lg mx-auto font-medium">
                This AI-powered tool is currently in closed beta. It will launch with the full platform release. Get started now to build your profile.
            </p>

            <div className="pt-8 w-full max-w-sm">
                <Link href="/create-profile">
                    <Button size="lg" className="w-full text-lg border-2 border-black bg-black text-white hover:bg-white hover:text-black shadow-neo hover:-translate-y-1 hover:-translate-x-1 hover:shadow-neo-lg transition-all h-14 font-bold">
                        Get Started
                    </Button>
                </Link>
            </div>
        </div>
    )
}
