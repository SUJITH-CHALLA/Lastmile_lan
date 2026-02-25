"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FileText, Briefcase, User, Settings, LogOut, Home, CheckSquare, MessageSquare, Video, Globe, Bell } from "lucide-react"

export function Sidebar() {
    const pathname = usePathname()

    const primaryNav = [
        { name: "Feed", href: "/dashboard", icon: <LayoutDashboard size={20} /> },
        { name: "Resumes", href: "/dashboard/resumes", icon: <FileText size={20} /> },
        { name: "Applications", href: "/dashboard/applications", icon: <Briefcase size={20} /> },
        { name: "ATS Checker", href: "/dashboard/ats-checker", icon: <CheckSquare size={20} /> },
        { name: "Cover Letters", href: "/dashboard/cover-letters", icon: <MessageSquare size={20} /> },
        { name: "Mock Interview", href: "/dashboard/mock-interview", icon: <Video size={20} /> },
        { name: "Portfolio", href: "/dashboard/portfolio", icon: <Globe size={20} /> },
    ]

    const secondaryNav = [
        { name: "All Tools", href: "/tools", icon: <LayoutDashboard size={20} /> },
        { name: "Profile", href: "/dashboard/profile", icon: <User size={20} /> },
        { name: "Settings", href: "/dashboard/settings", icon: <Settings size={20} /> },
    ]

    return (
        <aside className="w-64 h-screen bg-white border-r-2 border-black flex flex-col sticky top-0 hidden md:flex">
            <div className="p-6 border-b-2 border-black">
                <Link href="/dashboard" className="text-xl font-black uppercase flex items-center gap-2 hover:opacity-80 transition-opacity whitespace-nowrap">
                    AI-E Console
                </Link>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Application Intelligence Engine</p>
            </div>

            <div className="flex-1 overflow-y-auto">
                <nav className="p-4 space-y-2">
                    {primaryNav.map((item) => {
                        const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href))
                        return (
                            <Link key={item.href} href={item.href}>
                                <Button
                                    variant="ghost"
                                    className={`w-full justify-start gap-3 h-12 text-base font-bold uppercase border-2 border-transparent hover:border-black hover:bg-primary hover:shadow-neo transition-all ${isActive ? "bg-primary border-black shadow-neo" : ""}`}
                                >
                                    {item.icon}
                                    {item.name}
                                </Button>
                            </Link>
                        )
                    })}

                    <div className="h-0.5 bg-black my-4 opacity-10" />

                    {secondaryNav.map((item) => {
                        const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href))
                        return (
                            <Link key={item.href} href={item.href}>
                                <Button
                                    variant="ghost"
                                    className={`w-full justify-start gap-3 h-12 text-base font-bold uppercase border-2 border-transparent hover:border-black hover:bg-primary hover:shadow-neo transition-all ${isActive ? "bg-primary border-black shadow-neo" : ""}`}
                                >
                                    {item.icon}
                                    {item.name}
                                </Button>
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 pt-0">
                    <Button className="w-full bg-yellow-300 hover:bg-yellow-400 text-black border-2 border-black shadow-neo font-bold uppercase">
                        Upgrade to Pro
                    </Button>
                </div>
            </div>

            <div className="p-4 border-t-2 border-black bg-gray-50 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full border-2 border-black bg-primary flex items-center justify-center font-black">
                            JD
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold leading-tight">John Doe</span>
                            <span className="text-[10px] font-black uppercase bg-green-300 border border-black px-1 mt-0.5 w-max">Free Plan</span>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" className="relative hover:bg-gray-200">
                        <Bell size={20} />
                        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                    </Button>
                </div>

                <div className="flex gap-2 w-full">
                    <Button variant="outline" onClick={() => { if (confirm('Are you sure you want to log out of AI-E Console?')) window.location.href = '/' }} className="flex-1 w-full justify-center gap-2 border-2 text-xs border-black hover:bg-black hover:text-white transition-all font-bold">
                        <LogOut size={16} />
                        Logout
                    </Button>
                </div>
            </div>
        </aside>
    )
}
