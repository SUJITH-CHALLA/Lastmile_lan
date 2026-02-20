"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonLoader() {
    return (
        <div className="container mx-auto p-4 md:p-8 space-y-8 h-screen w-full bg-white z-[100] fixed top-0 left-0">
            <div className="flex flex-col gap-4 mb-8 pt-20">
                <Skeleton className="h-12 w-1/3" />
                <Skeleton className="h-4 w-2/3" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex flex-col gap-3">
                        <Skeleton className="h-48 w-full shadow-neo" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                ))}
            </div>
        </div>
    )
}
