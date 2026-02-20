"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function FAQSkeleton() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header Skeleton */}
            <div className="h-20 border-b-2 border-black flex items-center justify-between px-8 bg-white">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-8 w-64" />
            </div>

            <div className="container mx-auto px-4 md:px-8 py-20 flex flex-col items-center max-w-4xl">
                {/* Title */}
                <Skeleton className="h-16 w-3/4 mb-16" />

                <div className="w-full space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="border-2 border-black shadow-neo p-6 bg-white flex flex-col space-y-4">
                            <Skeleton className="h-6 w-3/4" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
