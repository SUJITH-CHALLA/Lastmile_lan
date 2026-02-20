import { cn } from "@/lib/utils"

function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("animate-pulse bg-gray-200 border-2 border-black", className)}
            {...props}
        />
    )
}

export { Skeleton }
