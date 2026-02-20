"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function PricingSkeleton() {
    return (
        <div className="min-h-screen bg-yellow-50">
            {/* Header */}
            <div className="h-20 border-b-2 border-black flex items-center justify-between px-8 bg-white">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-8 w-64" />
            </div>

            <div className="container mx-auto px-4 md:px-8 py-20 flex flex-col items-center">
                <Skeleton className="h-16 w-1/2 mb-4" />
                <Skeleton className="h-6 w-1/3 mb-16" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="border-2 border-black shadow-neo p-8 bg-white flex flex-col space-y-6 h-[500px]">
                            <Skeleton className="h-8 w-1/2" />
                            <Skeleton className="h-16 w-3/4" />
                            <div className="space-y-4 pt-4 flex-1">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                                <Skeleton className="h-4 w-4/5" />
                                <Skeleton className="h-4 w-full" />
                            </div>
                            <Skeleton className="h-12 w-full mt-auto" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
