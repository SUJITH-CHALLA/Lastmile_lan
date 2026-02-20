"use client"

import { Button } from "@/components/ui/button"
import { Chrome } from "lucide-react"

export default function AutoApplyCopilot() {
    return (
        <div className="text-center py-20 space-y-6">
            <h1 className="text-4xl font-black uppercase">Auto-Apply Copilot</h1>
            <p className="text-xl max-w-md mx-auto">
                The Chrome extension that fills out Workday, Lever, and Greenhouse forms automatically.
            </p>

            <div className="flex justify-center my-8">
                <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center">
                    <Chrome className="text-white w-10 h-10" />
                </div>
            </div>

            <Button size="lg" className="border-2 border-black shadow-neo font-bold h-14 bg-primary text-black hover:bg-black hover:text-white">
                Add to Chrome
            </Button>
            <p className="text-sm font-bold text-gray-500">v1.0.0 • Free for Beta Users</p>
        </div>
    )
}
