"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function DashboardSkeleton() {
    return (
        <div className="min-h-screen bg-white flex">
            {/* Sidebar Skeleton */}
            <div className="w-64 border-r-2 border-black p-4 hidden md:flex flex-col gap-4">
                <Skeleton className="h-12 w-full mb-8" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <div className="mt-auto">
                    <Skeleton className="h-12 w-full" />
                </div>
            </div>

            {/* Main Content (Feed) */}
            <div className="flex-1 p-8 space-y-6">
                <Skeleton className="h-12 w-1/3 mb-8" />

                {/* Job Cards */}
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="border-2 border-black p-6 space-y-4 shadow-neo-sm">
                        <div className="flex justify-between">
                            <div className="flex gap-4">
                                <Skeleton className="h-12 w-12" />
                                <div>
                                    <Skeleton className="h-6 w-48 mb-2" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Skeleton className="h-6 w-20" />
                            <Skeleton className="h-6 w-20" />
                        </div>
                    </div>
                ))}
            </div>

            {/* AI Copilot (Right Panel) */}
            <div className="w-80 border-l-2 border-black p-4 hidden lg:flex flex-col gap-4">
                <Skeleton className="h-12 w-full mb-4" />
                <Skeleton className="h-full w-full" />
            </div>
        </div>
    )
}
