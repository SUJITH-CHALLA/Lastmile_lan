import React from "react"
import Image from "next/image"

export function Logo({ className = "w-8 h-8", ...props }: React.ComponentProps<"div">) {
    return (
        <div className={`relative ${className}`} {...props}>
            <Image
                src="/logo_f.png"
                alt="LastMile Logo"
                fill
                className="object-contain mix-blend-multiply"
                unoptimized // User requested "dont compress or dont change anything"
                priority
            />
        </div>
    )
}
