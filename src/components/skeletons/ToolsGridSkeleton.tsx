"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function ToolsGridSkeleton() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header / Nav area */}
            <div className="h-20 border-b-2 border-black bg-white flex items-center justify-between px-8">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-8 w-64" />
            </div>

            <div className="container mx-auto px-4 md:px-8 py-20 flex flex-col items-center">
                {/* TOOLKIT Title Placeholder */}
                <Skeleton className="h-16 w-64 mb-12 max-w-full" />

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="border-2 border-black shadow-neo p-8 bg-white flex flex-col min-h-[200px]">
                            <div className="flex justify-between items-start mb-6">
                                <Skeleton className="h-8 w-16" /> {/* Tag Placeholder */}
                                <Skeleton className="h-8 w-8 rounded-full" /> {/* Icon Placeholder */}
                            </div>
                            <div className="mt-auto space-y-3">
                                <Skeleton className="h-8 w-3/4" /> {/* Title */}
                                <Skeleton className="h-4 w-full" /> {/* Desc Line 1 */}
                                <Skeleton className="h-4 w-5/6" /> {/* Desc Line 2 */}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Button Placeholder */}
                <div className="mt-12 text-center">
                    <Skeleton className="h-14 w-48 inline-block" />
                </div>
            </div>
        </div>
    )
}
