import React from "react"
import Image from "next/image"

export function Logo({ className = "w-8 h-8", ...props }: React.ComponentProps<"div">) {
    return (
        <div className={`relative overflow-hidden ${className}`} {...props}>
            <Image
                src="/logo.svg"
                alt="LastMile — AI Job Application Intelligence"
                fill
                className="object-contain"
                unoptimized // User requested "dont compress or dont change anything"
                priority
            />
        </div>
    )
}
