"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Logo } from "@/components/ui/logo"
import { JoinWaitlistDialog } from "@/components/ui/join-waitlist-dialog"



export function Navbar({ onGetStarted, hideLinks, rightSlot }: { onGetStarted?: () => void, hideLinks?: boolean, rightSlot?: React.ReactNode }) {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [hoveredLink, setHoveredLink] = useState<string | null>(null)
    const [activeSection, setActiveSection] = useState<string>("")
    const pathname = usePathname()
    const isCreateProfilePage = pathname === "/create-profile" || hideLinks
    const isWaitlistMode = process.env.NEXT_PUBLIC_WAITLIST_MODE === "true"

    const navLinks = [
        { name: "Features", href: "/#features" },
        { name: "Tools", href: "/#tools" },
        { name: "Pricing", href: "/#pricing" },
        { name: "About", href: "/#about" },
        { name: "FAQ", href: "/#faq" },
    ]

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)

            // active section tracking
            let current = "";
            for (const link of navLinks) {
                const id = link.href.split('#')[1];
                if (id) {
                    const element = document.getElementById(id);
                    if (element) {
                        const rect = element.getBoundingClientRect();
                        // Trigger when the top of the section goes above 60% of the viewport
                        if (rect.top <= window.innerHeight * 0.6) {
                            current = link.name;
                        }
                    }
                }
            }

            // If user scrolled to the very bottom, highlight the last valid section
            if (window.innerHeight + Math.round(window.scrollY) >= document.documentElement.scrollHeight - 50) {
                current = "FAQ";
            }

            setActiveSection(current || "Features");
        }
        window.addEventListener("scroll", handleScroll)
        handleScroll() // Initialize on mount
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-2 border-black ${isScrolled ? "bg-primary py-2" : "bg-white py-4"
                }`}
        >
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-3 shrink-0">
                    <Link href="/" className="text-2xl font-black tracking-tighter uppercase flex items-center gap-2 leading-none">
                        <Logo className="w-10 h-10" />
                        LastMile.
                    </Link>
                    <span className="hidden lg:inline-flex items-center bg-yellow-200 border-2 border-black text-[10px] font-bold px-2 py-0.5 shadow-neo-sm transform transition-transform hover:-translate-y-0.5 leading-none shrink-0 whitespace-nowrap" title="AI-E: Application Intelligence Engine">
                        India's #1 AI Job Intelligence
                    </span>
                </div>

                {/* Desktop Nav — centered links */}
                {!hideLinks && (
                    <div className="hidden md:flex items-center gap-1 flex-1 min-w-0 justify-center">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onMouseEnter={() => setHoveredLink(link.name)}
                                onMouseLeave={() => setHoveredLink(null)}
                                className="relative px-3 py-1.5 text-base font-bold uppercase whitespace-nowrap transition-colors z-10"
                            >
                                {((hoveredLink === link.name) || (!hoveredLink && activeSection === link.name)) && (
                                    <motion.div
                                        layoutId="nav-hover-pill"
                                        className={`absolute inset-0 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-full -z-10 ${isScrolled ? "bg-white" : "bg-primary"
                                            }`}
                                        transition={{ type: "spring", duration: 0.4, bounce: 0 }}
                                    />
                                )}
                                {link.name}
                            </Link>
                        ))}
                    </div>
                )}

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-3 shrink-0">
                    {rightSlot ? rightSlot : (
                        isWaitlistMode ? (
                            <JoinWaitlistDialog>
                                <Button className="border-2 border-black bg-primary text-black shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo-lg transition-all font-bold h-10 px-6">
                                    Get Started
                                </Button>
                            </JoinWaitlistDialog>
                        ) : (
                            <Button
                                onClick={() => window.location.href = '/create-profile'}
                                className="border-2 border-black bg-primary text-black shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo-lg transition-all font-bold h-10 px-6">
                                Get Started
                            </Button>
                        )
                    )}
                </div>

                {/* Mobile Toggle & CTA */}
                <div className="flex md:hidden items-center gap-3">
                    {rightSlot ? rightSlot : (
                        isWaitlistMode ? (
                            <JoinWaitlistDialog>
                                <Button className="border-2 border-black bg-primary text-black shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo-lg transition-all font-bold text-xs px-3 h-9">
                                    Get Started
                                </Button>
                            </JoinWaitlistDialog>
                        ) : (
                            <Button
                                onClick={() => window.location.href = '/create-profile'}
                                className="border-2 border-black bg-primary text-black shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo-lg transition-all font-bold text-xs px-3 h-9">
                                Get Started
                            </Button>
                        )
                    )}
                    <button
                        className="p-2 border-2 border-black shadow-neo active:translate-x-[2px] active:translate-y-[2px] active:shadow-none bg-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b-2 border-black overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-bold uppercase hover:text-primary transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
