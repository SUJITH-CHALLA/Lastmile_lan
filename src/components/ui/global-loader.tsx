"use client"

import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
    LandingSkeleton,
    DashboardSkeleton,
    ToolSkeleton,
    ToolsGridSkeleton,
    AboutSkeleton,
    FeaturesSkeleton,
    PricingSkeleton,
    FAQSkeleton
} from "@/components/skeletons"

export function GlobalLoader() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [isLoading, setIsLoading] = useState(true)
    const [currentHash, setCurrentHash] = useState("")

    useEffect(() => {
        // Set initial hash
        let lastHash = window.location.hash
        setCurrentHash(lastHash)

        // Poll for hash changes to avoid Next.js router useInsertionEffect conflicts
        // when monkey-patching history.pushState.
        const interval = setInterval(() => {
            const currentHash = window.location.hash
            if (currentHash !== lastHash) {
                lastHash = currentHash
                setCurrentHash(currentHash)

                // Trigger loader on hash change
                setIsLoading(true)
                setTimeout(() => {
                    setIsLoading(false)
                }, 1100)
            }
        }, 50) // 50ms is fast enough to feel instant but doesn't block main thread

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        setIsLoading(true)
        const timeout = setTimeout(() => {
            setIsLoading(false)
        }, 1100)
        return () => clearTimeout(timeout)
    }, [pathname, searchParams])

    // Determine which skeleton to render
    const renderSkeleton = () => {
        if (pathname === "/") {
            if (currentHash === "#about") return <AboutSkeleton />
            if (currentHash === "#features") return <FeaturesSkeleton />
            if (currentHash === "#pricing") return <PricingSkeleton />
            if (currentHash === "#faq") return <FAQSkeleton />
            if (currentHash === "#tools") return <ToolsGridSkeleton />
            return <LandingSkeleton />
        }

        if (pathname.startsWith("/dashboard")) return <DashboardSkeleton />
        if (pathname.startsWith("/tools")) return <ToolSkeleton />

        // Default fallback
        return <LandingSkeleton />
    }

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="global-loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[9999] bg-white overflow-hidden pointer-events-none"
                >
                    {renderSkeleton()}
                </motion.div>
            )}
        </AnimatePresence>
    )
}
