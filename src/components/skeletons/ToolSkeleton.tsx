"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function ToolSkeleton() {
    return (
        <div className="min-h-screen bg-white">
            {/* Navbar Skeleton */}
            <div className="h-20 border-b-2 border-black flex items-center justify-between px-8 bg-white">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-8 w-64" />
            </div>

            <div className="container mx-auto px-4 md:px-8 py-8 pt-28">
                {/* Back button skeleton */}
                <div className="mb-8">
                    <Skeleton className="h-8 w-32 border-none" />
                </div>

                {/* Main Content Area mapping to ToolLayout and Tool pages */}
                <div className="max-w-4xl mx-auto border-2 border-black p-8 shadow-neo bg-white">
                    {/* Header */}
                    <div className="text-center mb-10 flex flex-col items-center">
                        <Skeleton className="h-10 w-3/4 mb-4" />
                        <Skeleton className="h-6 w-1/2" />
                    </div>

                    {/* Inputs/Fields Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-40 w-full" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-48" />
                            <Skeleton className="h-40 w-full" />
                        </div>
                    </div>

                    {/* Button */}
                    <Skeleton className="h-12 w-full" />
                </div>
            </div>
        </div>
    )
}
