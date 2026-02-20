"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Bell, Lock, CreditCard, User, Shield, Zap } from "lucide-react"

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("Account")

    const renderContent = () => {
        switch (activeTab) {
            case "Account":
                return (
                    <Card className="p-6 border-2 border-black shadow-neo bg-white">
                        <h3 className="font-black uppercase mb-6 flex items-center gap-2"><User size={20} /> Account Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="font-bold">First Name</Label>
                                <Input defaultValue="John" className="bg-gray-50 border-black" />
                            </div>
                            <div className="space-y-2">
                                <Label className="font-bold">Last Name</Label>
                                <Input defaultValue="Doe" className="bg-gray-50 border-black" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label className="font-bold">Email Address</Label>
                                <Input defaultValue="john.doe@example.com" className="bg-gray-50 border-black" />
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <Button className="font-bold border-2 border-black shadow-neo active:shadow-none">Save Changes</Button>
                        </div>
                    </Card>
                )
            case "Notifications":
                return (
                    <Card className="p-6 border-2 border-black shadow-neo bg-white">
                        <h3 className="font-black uppercase mb-6 flex items-center gap-2"><Bell size={20} /> Notifications</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 border-2 border-gray-100 hover:border-black transition-colors">
                                <div>
                                    <p className="font-bold">Email Alerts</p>
                                    <p className="text-sm text-gray-500">Receive daily job digests.</p>
                                </div>
                                <Switch className="border-2 border-black" />
                            </div>
                            <div className="flex items-center justify-between p-3 border-2 border-gray-100 hover:border-black transition-colors">
                                <div>
                                    <p className="font-bold">Application Updates</p>
                                    <p className="text-sm text-gray-500">Notify when status changes.</p>
                                </div>
                                <Switch defaultChecked className="border-2 border-black" />
                            </div>
                            <div className="flex items-center justify-between p-3 border-2 border-gray-100 hover:border-black transition-colors">
                                <div>
                                    <p className="font-bold">Marketing Emails</p>
                                    <p className="text-sm text-gray-500">Receive tips and offers.</p>
                                </div>
                                <Switch className="border-2 border-black" />
                            </div>
                        </div>
                    </Card>
                )
            case "Billing":
                return (
                    <Card className="p-6 border-2 border-black shadow-neo bg-white">
                        <h3 className="font-black uppercase mb-6 flex items-center gap-2"><CreditCard size={20} /> Billing & Plans</h3>

                        <div className="mb-8 p-4 bg-gray-50 border-2 border-black">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-bold text-gray-500 text-sm uppercase">Current Plan</p>
                                    <h4 className="text-2xl font-black uppercase">Free Plan</h4>
                                </div>
                                <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 border border-green-800">Active</span>
                            </div>
                            <div className="mt-4 w-full bg-gray-200 h-2 border border-black rounded-full overflow-hidden">
                                <div className="bg-primary h-full w-[30%]"></div>
                            </div>
                            <p className="text-xs font-bold mt-1 text-right">3/10 Credits Used</p>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-black uppercase text-lg">Available Upgrades</h4>

                            <div className="flex items-center justify-between p-4 border-2 border-black hover:bg-yellow-50 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-none group-hover:scale-110 transition-transform">
                                        <Zap size={20} />
                                    </div>
                                    <div>
                                        <p className="font-black uppercase text-lg">AI-e Turbo Pack</p>
                                        <p className="text-sm font-bold text-gray-600">Maximum speed & automation.</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-black">$25<span className="text-sm font-bold text-gray-500">/mo</span></p>
                                    <Button size="sm" className="mt-1 border-2 border-black shadow-neo active:shadow-none h-8 text-xs font-bold">Upgrade</Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                )
            case "Security":
                return (
                    <Card className="p-6 border-2 border-black shadow-neo bg-white">
                        <h3 className="font-black uppercase mb-6 flex items-center gap-2"><Shield size={20} /> Security</h3>

                        <div className="space-y-6">
                            <div className="space-y-4">
                                <h4 className="font-bold border-b-2 border-gray-200 pb-2">Change Password</h4>
                                <div className="grid gap-2">
                                    <Label>Current Password</Label>
                                    <Input type="password" />
                                </div>
                                <div className="grid gap-2">
                                    <Label>New Password</Label>
                                    <Input type="password" />
                                </div>
                                <Button className="w-full md:w-auto border-2 border-black font-bold">Update Password</Button>
                            </div>

                            <div className="space-y-4 pt-4">
                                <h4 className="font-bold border-b-2 border-gray-200 pb-2">Two-Factor Authentication</h4>
                                <div className="flex items-center justify-between">
                                    <div className="max-w-[80%]">
                                        <p className="font-bold">Enable 2FA</p>
                                        <p className="text-sm text-gray-500">Secure your account with an extra layer of protection.</p>
                                    </div>
                                    <Switch className="border-2 border-black" />
                                </div>
                            </div>

                            <div className="pt-8 border-t-2 border-black mt-8">
                                <h3 className="font-black uppercase mb-4 flex items-center gap-2 text-red-600"><Lock size={20} /> Danger Zone</h3>
                                <div className="flex justify-between items-center p-4 border-2 border-red-200 bg-red-50">
                                    <div>
                                        <p className="font-bold text-red-900">Delete Account</p>
                                        <p className="text-sm text-red-700">This action cannot be undone.</p>
                                    </div>
                                    <Button variant="destructive" className="border-2 border-black font-bold shadow-neo active:shadow-none">Delete</Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                )
            default:
                return null
        }
    }

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="bg-white border-2 border-black p-6 shadow-neo">
                <h1 className="text-3xl font-black uppercase mb-1">Settings</h1>
                <p className="text-gray-600 font-bold">Manage your account preferences.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Sidebar Nav (Internal) */}
                <div className="space-y-2">
                    {["Account", "Notifications", "Billing", "Security"].map((item) => (
                        <button
                            key={item}
                            onClick={() => setActiveTab(item)}
                            className={`w-full text-left px-4 py-3 font-bold border-2 transition-all ${activeTab === item ? "bg-primary border-black shadow-neo-sm translate-x-[-2px] translate-y-[-2px]" : "bg-white border-transparent hover:border-black text-gray-500 hover:text-black"}`}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="md:col-span-3">
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}
