"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function LandingSkeleton() {
    return (
        <div className="min-h-screen bg-white">
            {/* Navbar Skeleton */}
            <div className="h-20 border-b-2 border-black flex items-center justify-between px-8">
                <Skeleton className="h-10 w-32" />
                <div className="flex gap-4">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-16" />
                </div>
            </div>

            {/* Hero Skeleton (Split Layout) */}
            <div className="grid grid-cols-1 md:grid-cols-2 h-[calc(100vh-80px)]">
                {/* Left: Text */}
                <div className="p-12 flex flex-col justify-center space-y-6">
                    <Skeleton className="h-20 w-3/4" />
                    <Skeleton className="h-20 w-1/2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <div className="flex gap-4 pt-8">
                        <Skeleton className="h-14 w-40" />
                        <Skeleton className="h-14 w-40" />
                    </div>
                </div>

                {/* Right: Image/Graphic */}
                <div className="bg-gray-100 p-12 flex items-center justify-center border-l-2 border-black">
                    <Skeleton className="h-3/4 w-3/4 shadow-neo" />
                </div>
            </div>
        </div>
    )
}
