"use client"

import { useState } from "react"
import { X, AlertTriangle } from "lucide-react"

export function DemoBanner() {
    const [dismissed, setDismissed] = useState(false)

    if (dismissed) return null

    return (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-amber-400 border-b-2 border-black py-2 px-4 flex items-center justify-center gap-3 text-sm font-bold text-black">
            <AlertTriangle size={16} className="shrink-0" />
            <span>Demo Mode — This is a preview. Data shown is sample data and no real applications are being sent.</span>
            <button
                onClick={() => setDismissed(true)}
                className="ml-2 p-1 hover:bg-black/10 rounded transition-colors shrink-0"
            >
                <X size={16} />
            </button>
        </div>
    )
}
