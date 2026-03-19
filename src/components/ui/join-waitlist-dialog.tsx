"use client"

import { useState } from "react"
import {
    Dialog, DialogContent, DialogHeader,
    DialogTitle, DialogDescription, DialogTrigger
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, Loader2, Mail } from "lucide-react"

type Step = "form" | "otp" | "success"

export function JoinWaitlistDialog({
    children
}: {
    children: React.ReactNode
}) {
    const [open, setOpen] = useState(false)
    const [step, setStep] = useState<Step>("form")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [position, setPosition] = useState<number>(0)
    const [userId, setUserId] = useState<string>("")
    const [otp, setOtp] = useState<string>("")

    const [formData, setFormData] = useState({
        name: "",
        organization: "",
        email: ""
    })

    // STEP 1: Submit form → send OTP
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const res = await fetch("/api/waitlist/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email
                })
            })

            const data = await res.json()

            if (res.ok) {
                setUserId(data.userId)
                setStep("otp")
            } else {
                setError(data.message || "Failed to send OTP")
            }
        } catch {
            setError("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    // STEP 2: Verify OTP
    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const res = await fetch("/api/waitlist/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId,
                    otp,
                    name: formData.name,
                    organisation: formData.organization,
                    email: formData.email
                })
            })

            const data = await res.json()

            if (res.ok) {
                setPosition(data.position)
                setStep("success")
                setTimeout(() => {
                    setOpen(false)
                    setStep("form")
                    setOtp("")
                    setFormData({ name: "", organization: "", email: "" })
                }, 4000)
            } else {
                setError(data.message || "Invalid OTP")
            }
        } catch {
            setError("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const handleOpenChange = (val: boolean) => {
        setOpen(val)
        if (!val) {
            setStep("form")
            setError(null)
            setOtp("")
            setFormData({ name: "", organization: "", email: "" })
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white border-2 
      border-black shadow-neo">

                {/* STEP: FORM */}
                {step === "form" && (
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black uppercase">
                                Join the Waitlist
                            </DialogTitle>
                            <DialogDescription className="font-bold text-gray-500">
                                Get early access to LastMile.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleFormSubmit} className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name" className="font-bold">Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({
                                        ...formData, name: e.target.value
                                    })}
                                    className="border-2 border-black bg-gray-50"
                                    placeholder="Your full name"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="organization" className="font-bold">
                                    Organization
                                </Label>
                                <Input
                                    id="organization"
                                    value={formData.organization}
                                    onChange={(e) => setFormData({
                                        ...formData, organization: e.target.value
                                    })}
                                    className="border-2 border-black bg-gray-50"
                                    placeholder="University or Company"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="font-bold">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({
                                        ...formData, email: e.target.value
                                    })}
                                    className="border-2 border-black bg-gray-50"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                            {error && (
                                <p className="text-red-500 text-xs font-bold bg-red-50 
                p-2 border border-red-200">
                                    {error}
                                </p>
                            )}
                            <Button
                                type="submit"
                                disabled={loading}
                                className="mt-2 border-2 border-black shadow-neo 
                active:shadow-none font-bold text-lg"
                            >
                                {loading
                                    ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    : null
                                }
                                {loading ? "Sending OTP..." : "Get Early Access"}
                            </Button>
                        </form>
                    </>
                )}

                {/* STEP: OTP */}
                {step === "otp" && (
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black uppercase">
                                Verify Your Email
                            </DialogTitle>
                            <DialogDescription className="font-bold text-gray-500">
                                Enter the 6-digit code sent to {formData.email}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col items-center py-4 gap-2">
                            <div className="w-14 h-14 bg-primary rounded-full border-2 
              border-black flex items-center justify-center">
                                <Mail className="w-7 h-7" />
                            </div>
                            <p className="text-sm font-bold text-gray-500 text-center">
                                Check your inbox and spam folder
                            </p>
                        </div>
                        <form onSubmit={handleOtpSubmit} className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="otp" className="font-bold">
                                    6-Digit Code
                                </Label>
                                <Input
                                    id="otp"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="border-2 border-black bg-gray-50 
                  text-center text-2xl font-black tracking-widest"
                                    placeholder="000000"
                                    maxLength={6}
                                    required
                                />
                            </div>
                            {error && (
                                <p className="text-red-500 text-xs font-bold bg-red-50 
                p-2 border border-red-200">
                                    {error}
                                </p>
                            )}
                            <Button
                                type="submit"
                                disabled={loading || otp.length !== 6}
                                className="border-2 border-black shadow-neo 
                active:shadow-none font-bold text-lg"
                            >
                                {loading
                                    ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    : null
                                }
                                {loading ? "Verifying..." : "Verify & Join"}
                            </Button>
                            <button
                                type="button"
                                onClick={() => setStep("form")}
                                className="text-sm font-bold text-gray-500 
                hover:text-black underline"
                            >
                                ← Back to form
                            </button>
                        </form>
                    </>
                )}

                {/* STEP: SUCCESS */}
                {step === "success" && (
                    <div className="py-10 flex flex-col items-center 
          justify-center text-center space-y-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full 
            flex items-center justify-center border-2 border-black">
                            <Check className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-black uppercase text-green-600">
                            You're verified!
                        </h3>
                        <p className="text-3xl font-black">
                            You're{" "}
                            <span className="bg-primary px-2">#{position}</span>
                            {" "}in the queue
                        </p>
                        <p className="font-bold text-gray-500 text-sm">
                            Check your email — we'll notify you when access is ready.
                        </p>
                    </div>
                )}

            </DialogContent>
        </Dialog>
    )
}
