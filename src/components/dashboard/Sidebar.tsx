"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FileText, Briefcase, User, Settings, LogOut, Home } from "lucide-react"
import { Logo } from "@/components/ui/logo"

export function Sidebar() {
    const pathname = usePathname()

    const navItems = [
        { name: "Feed", href: "/dashboard", icon: <LayoutDashboard size={20} /> },
        { name: "Resumes", href: "/dashboard/resumes", icon: <FileText size={20} /> },
        { name: "Applications", href: "/dashboard/applications", icon: <Briefcase size={20} /> },
        { name: "Profile", href: "/dashboard/profile", icon: <User size={20} /> },
        { name: "Settings", href: "/dashboard/settings", icon: <Settings size={20} /> },
    ]
    return (
        <aside className="w-64 h-screen bg-white border-r-2 border-black flex flex-col sticky top-0 hidden md:flex">
            <div className="p-6 border-b-2 border-black">
                <Link href="/" className="text-xl font-black uppercase flex items-center gap-2 hover:opacity-80 transition-opacity whitespace-nowrap">
                    AI-E Console_.
                </Link>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                <Link href="/">
                    <Button variant="ghost" className="w-full justify-start gap-3 h-12 text-base font-bold uppercase border-2 border-transparent hover:border-black hover:bg-gray-100 transition-all text-gray-500">
                        <Home size={20} />
                        Back to Home
                    </Button>
                </Link>
                <div className="h-px bg-gray-300 my-2 mx-4" />
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link key={item.href} href={item.href}>
                            <Button
                                variant="ghost"
                                className={`w-full justify-start gap-3 h-12 text-base font-bold uppercase border-2 border-transparent hover:border-black hover:bg-primary hover:shadow-neo transition-all ${isActive ? "bg-primary border-black" : ""}`}
                            >
                                {item.icon}
                                {item.name}
                            </Button>
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t-2 border-black">
                <Button variant="outline" className="w-full justify-start gap-3 border-2 border-black hover:bg-black hover:text-white transition-all font-bold">
                    <LogOut size={20} />
                    Logout
                </Button>
            </div>
        </aside>
    )
}
