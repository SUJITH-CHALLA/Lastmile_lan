"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function AboutSkeleton() {
    return (
        <div className="min-h-screen bg-white">
            {/* Navbar Skeleton */}
            <div className="h-20 border-b-2 border-black flex items-center justify-between px-8">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-8 w-64" />
            </div>

            <div className="container mx-auto px-4 md:px-8 py-20">
                {/* Title: MEET THE BUILDERS */}
                <div className="text-center mb-16 flex flex-col items-center">
                    <Skeleton className="h-16 w-3/4 max-w-lg mb-4" />
                    <Skeleton className="h-6 w-96" />
                </div>

                {/* Founders Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 max-w-4xl mx-auto">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="border-2 border-black p-8 flex flex-col items-center space-y-4 shadow-neo">
                            <Skeleton className="w-40 h-40 rounded-full border-2 border-black" />
                            <Skeleton className="h-8 w-48" />
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-4 w-64" />
                        </div>
                    ))}
                </div>

                {/* Join Waitlist Card */}
                <div className="max-w-4xl mx-auto border-2 border-black p-12 bg-black flex flex-col items-center shadow-neo">
                    <Skeleton className="h-12 w-12 rounded-full border-2 border-white mb-6" />
                    <Skeleton className="h-10 w-64 bg-gray-700 mb-4" />
                    <Skeleton className="h-6 w-96 bg-gray-700 mb-8" />
                    <Skeleton className="h-12 w-48 bg-white" />
                </div>
            </div>
        </div>
    )
}
