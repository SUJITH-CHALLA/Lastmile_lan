"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, Loader2 } from "lucide-react"

export function JoinWaitlistDialog({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        organization: "",
        email: ""
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                setSuccess(true)
                setTimeout(() => {
                    setOpen(false)
                    setSuccess(false)
                    setFormData({ name: "", organization: "", email: "" })
                }, 2000)
            }
        } catch (error) {
            console.error("Failed to submit", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white border-2 border-black shadow-neo">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black uppercase">Join the Waitlist</DialogTitle>
                    <DialogDescription className="font-bold text-gray-500">
                        Get early access to LastMile.
                    </DialogDescription>
                </DialogHeader>

                {success ? (
                    <div className="py-10 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center border-2 border-black">
                            <Check className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-black uppercase">You're on the list!</h3>
                        <p className="font-bold text-gray-500">We'll be in touch soon.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="font-bold">Name</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="border-2 border-black bg-gray-50"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="organization" className="font-bold">Organization</Label>
                            <Input
                                id="organization"
                                value={formData.organization}
                                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                                className="border-2 border-black bg-gray-50"
                                placeholder="University or Company"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email" className="font-bold">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="border-2 border-black bg-gray-50"
                                required
                            />
                        </div>
                        <Button type="submit" disabled={loading} className="mt-4 border-2 border-black shadow-neo active:shadow-none font-bold text-lg">
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Join Waitlist
                        </Button>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    )
}
