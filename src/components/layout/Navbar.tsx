"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Logo } from "@/components/ui/logo"
import { JoinWaitlistDialog } from "@/components/ui/join-waitlist-dialog"

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navLinks = [
        { name: "Features", href: "/#features" },
        { name: "About", href: "/#about" },
        { name: "Tools", href: "/#tools" },
        { name: "Pricing", href: "/#pricing" },
        { name: "FAQ", href: "/#faq" },
    ]

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-2 border-black ${isScrolled ? "bg-primary py-3" : "bg-white py-5"
                }`}
        >
            <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-black tracking-tighter uppercase flex items-center gap-2">
                    <Logo className="w-10 h-10" />
                    LastMile.
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-bold uppercase hover:underline underline-offset-4"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link href="/dashboard">
                        <Button variant="outline" className="border-2 border-black shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] font-bold">
                            Dashboard
                        </Button>
                    </Link>
                    <JoinWaitlistDialog>
                        <Button variant="default" className="shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px]">
                            Join Waitlist
                        </Button>
                    </JoinWaitlistDialog>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 border-2 border-black shadow-neo active:translate-x-[2px] active:translate-y-[2px] active:shadow-none bg-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
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
                            <JoinWaitlistDialog>
                                <Button className="w-full">Join Waitlist</Button>
                            </JoinWaitlistDialog>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
