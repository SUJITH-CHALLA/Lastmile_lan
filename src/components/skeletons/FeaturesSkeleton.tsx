"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function FeaturesSkeleton() {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header */}
            <div className="h-20 border-b-2 border-black bg-white flex items-center justify-between px-8">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-8 w-64" />
            </div>

            <div className="container mx-auto px-4 md:px-8 py-20 flex flex-col items-center flex-1">
                <Skeleton className="h-16 w-3/4 max-w-2xl mb-4" />
                <Skeleton className="h-6 w-96 mb-16" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="border-2 border-black p-8 flex flex-col h-[280px] bg-white shadow-neo rounded-none">
                            <Skeleton className="h-16 w-16 mb-6 rounded-none border-2 border-black" />
                            <Skeleton className="h-8 w-3/4 mb-4" />
                            <div className="space-y-2 w-full">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                                <Skeleton className="h-4 w-4/5" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
