"use client"

import { Home, Briefcase, FileText, User, MessageSquare, Bell, Settings, Bookmark, X, Check, Lock, BellRing, ChevronRight, Folder } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

type NavItem = {
    icon: any;
    label: string;
    id: string;
    hasDot?: boolean;
    badge?: number | string;
}

const navItems: NavItem[] = [
    { icon: Home, label: "Home", id: "home" },
    { icon: Briefcase, label: "Jobs", id: "jobs" },
    { icon: FileText, label: "Resume", id: "resume", hasDot: true },
    { icon: Folder, label: "Portfolio", id: "portfolio" },
    { icon: Bookmark, label: "Saved", id: "saved" },
    { icon: User, label: "Profile", id: "profile" },
]

const bottomItems: NavItem[] = [
    { icon: Bell, label: "Notifs", id: "notifs", hasDot: true },
    { icon: Settings, label: "Prefs", id: "prefs" },
]

interface SidebarProps {
    activeView: string;
    setActiveView: (view: string) => void;
}

export function Sidebar({ activeView, setActiveView }: SidebarProps) {
    const [isHovered, setIsHovered] = useState(false)
    const [activePopup, setActivePopup] = useState<string | null>(null)
    const popupRef = useRef<HTMLDivElement>(null)

    // Click outside handler for popups
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setActivePopup(null)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <>
            <div className="w-[80px] shrink-0 h-screen bg-[#FAFAFA] border-r border-[#EEEEEE] hidden sm:block relative z-0" />

            <motion.aside
                initial={{ width: 80 }}
                animate={{ width: isHovered ? 240 : 80 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
                className="bg-[#FAFAFA] border-r border-[#EEEEEE] h-screen flex flex-col py-6 z-[100] fixed top-0 left-0 overflow-visible shadow-[4px_0_24px_rgba(0,0,0,0.02)]"
                style={{ paddingLeft: 16, paddingRight: 16 }}
            >
                <div
                    className="flex items-center gap-4 mb-8 cursor-pointer w-full pl-1 relative"
                    title="LastMile"
                >
                    <div className="w-[40px] h-[40px] shrink-0 bg-lm-yellow rounded-[12px] flex items-center justify-center hover:scale-105 transition-transform overflow-hidden relative shadow-sm border border-lm-border/50">
                        <Image
                            src="/logo.jpeg"
                            alt="Logo"
                            width={40}
                            height={40}
                            className="object-cover w-full h-full"
                            unoptimized
                        />
                    </div>
                    <AnimatePresence>
                        {isHovered && (
                            <motion.span
                                initial={{ opacity: 0, x: -10, filter: "blur(4px)" }}
                                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, x: -5, filter: "blur(4px)" }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                                className="font-black text-[18px] tracking-wider font-display uppercase text-lm-black whitespace-nowrap"
                            >
                                LastMile
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>

                <div className="flex flex-col gap-1.5 w-full">
                    {navItems.map((item) => {
                        const isActive = activeView === item.id
                        return (
                            <div
                                key={item.id}
                                onClick={() => { setActiveView(item.id); setActivePopup(null); }}
                                className={`rounded-[12px] cursor-pointer transition-colors relative group flex items-center w-full h-[44px] pl-[14px] gap-3.5
                                ${isActive ? "bg-lm-yellow text-lm-black shadow-sm font-bold border border-transparent" : "text-gray-500 hover:bg-gray-200/50 hover:text-lm-black font-semibold border border-transparent"}`}
                            >
                                <div className="flex items-center justify-center shrink-0 relative">
                                    <item.icon className="w-5 h-5 flex-shrink-0" strokeWidth={isActive ? 2.5 : 2} />
                                    {item.hasDot && (
                                        <span className="absolute top-0 right-[-2px] w-2 h-2 bg-lm-black rounded-full border-[1.5px] border-lm-yellow z-20" />
                                    )}
                                </div>

                                <AnimatePresence>
                                    {isHovered && (
                                        <motion.span
                                            initial={{ opacity: 0, width: 0, filter: "blur(2px)" }}
                                            animate={{ opacity: 1, width: "auto", filter: "blur(0px)" }}
                                            exit={{ opacity: 0, width: 0, filter: "blur(2px)" }}
                                            transition={{ duration: 0.25, ease: "easeOut" }}
                                            className="text-[14px] tracking-wide whitespace-nowrap overflow-hidden"
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>

                                {!isHovered && (
                                    <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 py-1.5 px-3 bg-lm-black text-white text-[12px] font-bold rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all z-[999] shadow-lg border border-lm-border/20 translate-x-2 group-hover:translate-x-0">
                                        {item.label}
                                        <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-2 h-2 bg-lm-black rotate-45" />
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                <div className="flex-1" />

                <div className={`h-px bg-lm-border my-2 w-full`} />

                <div className="flex flex-col gap-1.5 w-full relative" ref={popupRef}>
                    {bottomItems.map((item) => {
                        const isPopupActive = activePopup === item.id;
                        return (
                            <div
                                key={item.id}
                                onClick={() => setActivePopup(isPopupActive ? null : item.id)}
                                className={`rounded-[12px] cursor-pointer transition-colors relative group flex items-center w-full h-[44px] pl-[14px] gap-3.5
                                ${isPopupActive ? "bg-white text-lm-black shadow-sm font-bold border border-transparent border-gray-100" : "text-gray-500 hover:bg-gray-200/50 hover:text-lm-black font-semibold border border-transparent"}
                            `}
                            >
                                <div className="flex items-center justify-center shrink-0 relative">
                                    <item.icon className="w-5 h-5 flex-shrink-0" strokeWidth={isPopupActive ? 2.5 : 2} />
                                    {item.hasDot && (
                                        <span className="absolute top-0 right-[-2px] w-2 h-2 bg-lm-yellow rounded-full border-[1.5px] border-white z-20" />
                                    )}
                                </div>

                                <AnimatePresence>
                                    {isHovered && (
                                        <motion.span
                                            initial={{ opacity: 0, width: 0, filter: "blur(2px)" }}
                                            animate={{ opacity: 1, width: "auto", filter: "blur(0px)" }}
                                            exit={{ opacity: 0, width: 0, filter: "blur(2px)" }}
                                            transition={{ duration: 0.25, ease: "easeOut" }}
                                            className="text-[14px] tracking-wide whitespace-nowrap overflow-hidden"
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>

                                {!isHovered && !isPopupActive && (
                                    <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 py-1.5 px-3 bg-lm-black text-white text-[12px] font-bold rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all z-[999] shadow-lg border border-lm-border/20 translate-x-2 group-hover:translate-x-0">
                                        {item.label}
                                        <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-2 h-2 bg-lm-black rotate-45" />
                                    </div>
                                )}
                            </div>
                        )
                    })}

                    {/* Popups rendered as centralized viewport modal */}
                    <AnimatePresence>
                        {activePopup && (
                            <div
                                className="fixed inset-0 z-[9999] flex items-center justify-center bg-lm-black/30 backdrop-blur-md p-4"
                                onClick={(e) => {
                                    if (e.target === e.currentTarget) setActivePopup(null)
                                }}
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    className="w-[420px] max-w-full bg-white border border-[#EEEEEE] rounded-[24px] shadow-[0_24px_50px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col"
                                >
                                    {/* Header */}
                                    <div className="px-6 py-5 border-b border-[#EEEEEE] flex items-center justify-between bg-white relative z-10">
                                        <h3 className="text-[16px] font-black text-lm-black tracking-wide">
                                            {activePopup === 'notifs' ? 'Notifications' : 'Preferences'}
                                        </h3>
                                        <button onClick={() => setActivePopup(null)} className="p-1.5 text-gray-400 hover:text-lm-black hover:bg-gray-100 rounded-full transition-colors">
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    {/* Body Content based on activePopup */}
                                    <div className="flex flex-col bg-gray-50/50 max-h-[500px] overflow-y-auto slim-scroll relative z-0">
                                        {activePopup === 'notifs' && (
                                            <div className="flex flex-col pb-2">
                                                <div className="px-5 py-3 flex justify-end bg-white border-b border-gray-100">
                                                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-lm-black flex items-center gap-1.5"><Check className="w-3.5 h-3.5" /> Mark all read</span>
                                                </div>
                                                {[
                                                    { title: "Application Update", desc: "Stripe moved your application to Interview stage!", time: "2m ago" },
                                                    { title: "High AI Match", desc: "New Frontend role at Airbnb matches 94% of your profile.", time: "1h ago" },
                                                    { title: "Action Required", desc: "Your Shopify cover letter deletes in 24 hours.", time: "4h ago" }
                                                ].map((n, i) => (
                                                    <div key={i} className="px-5 py-4 border-b border-[#EEEEEE] hover:bg-white cursor-pointer transition-colors group">
                                                        <div className="flex justify-between items-start mb-1.5">
                                                            <span className="text-[14px] font-bold text-lm-black group-hover:text-lm-yellow-dark transition-colors">{n.title}</span>
                                                            <span className="text-[10px] font-bold text-gray-400">{n.time}</span>
                                                        </div>
                                                        <p className="text-[13px] font-medium text-gray-500 leading-snug">{n.desc}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {activePopup === 'prefs' && (
                                            <div className="flex flex-col p-3 gap-1.5">
                                                <div className="p-4 rounded-[14px] hover:bg-white cursor-pointer transition-colors flex items-center justify-between border border-transparent hover:border-gray-200">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600"><User className="w-5 h-5" /></div>
                                                        <span className="text-[14px] font-bold text-lm-black">Account Settings</span>
                                                    </div>
                                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                                </div>
                                                <div className="p-4 rounded-[14px] hover:bg-white cursor-pointer transition-colors flex items-center justify-between border border-transparent hover:border-gray-200">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600"><BellRing className="w-5 h-5" /></div>
                                                        <span className="text-[14px] font-bold text-lm-black">Notifications Options</span>
                                                    </div>
                                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                                </div>
                                                <div className="p-4 rounded-[14px] hover:bg-white cursor-pointer transition-colors flex items-center justify-between border border-transparent hover:border-gray-200">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600"><Lock className="w-5 h-5" /></div>
                                                        <span className="text-[14px] font-bold text-lm-black">Privacy & Security</span>
                                                    </div>
                                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.aside>
        </>
    )
}
