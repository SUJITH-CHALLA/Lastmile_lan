"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Bell, Lock, CreditCard, User, Shield, Zap, Link as LinkIcon, Bot, Trash2 } from "lucide-react"

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("Portals")

    const renderContent = () => {
        switch (activeTab) {
            case "Portals":
                return (
                    <Card className="p-6 border-2 border-black shadow-neo bg-white">
                        <h3 className="font-black uppercase mb-2 flex items-center gap-2"><LinkIcon size={20} /> Portal Connections</h3>
                        <p className="text-sm font-bold text-gray-600 mb-6 pb-4 border-b-2 border-black">Connect your job portal accounts for AI-E auto-apply capability.</p>

                        <div className="space-y-4">
                            {[
                                { name: "LinkedIn", connected: true, id: "li", badge: "Primary" },
                                { name: "Naukri", connected: true, id: "naukri", badge: "Primary" },
                                { name: "Internshala", connected: false, id: "internshala" },
                                { name: "Foundit (Monster)", connected: false, id: "foundit" },
                                { name: "Indeed", connected: false, id: "indeed" }
                            ].map(portal => (
                                <div key={portal.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-2 border-black hover:bg-gray-50 transition-colors gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 border-2 border-black bg-white flex items-center justify-center font-black uppercase text-sm shrink-0">
                                            {portal.name[0]}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-black uppercase">{portal.name}</p>
                                                {portal.badge && <span className="bg-yellow-200 text-black text-[10px] font-bold px-1 uppercase border border-black">{portal.badge}</span>}
                                            </div>
                                            <p className={`text-xs font-bold ${portal.connected ? 'text-green-600' : 'text-gray-500'}`}>
                                                {portal.connected ? 'Connected successfully' : 'Not connected'}
                                            </p>
                                        </div>
                                    </div>
                                    <Button variant={portal.connected ? "outline" : "default"} className={`border-2 border-black font-bold uppercase text-xs w-full sm:w-auto ${portal.connected ? 'shadow-none bg-gray-100 hover:bg-red-50 hover:text-red-600' : 'shadow-neo active:shadow-none'}`}>
                                        {portal.connected ? 'Disconnect' : 'Connect Account'}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </Card>
                )
            case "AI-E":
                return (
                    <Card className="p-6 border-2 border-black shadow-neo bg-white">
                        <h3 className="font-black uppercase mb-2 flex items-center gap-2"><Bot size={20} /> AI-E Preferences</h3>
                        <p className="text-sm font-bold text-gray-600 mb-6 pb-4 border-b-2 border-black">Customize how the AI Copilot applies and communicates on your behalf.</p>

                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-black uppercase text-sm mb-1">Cover Letter Tone</h4>
                                    <p className="text-sm text-gray-500 font-bold mb-3">How should AI-E sound when generating intro notes?</p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {["Professional", "Enthusiastic", "Direct"].map(tone => (
                                        <Button key={tone} variant="outline" className={`border-2 border-black font-bold ${tone === 'Professional' ? 'bg-primary shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'hover:bg-gray-50'}`}>
                                            {tone}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t-2 border-gray-100">
                                <div className="flex justify-between items-start gap-4">
                                    <div>
                                        <h4 className="font-black uppercase text-sm mb-1">Auto-Confirm Apply</h4>
                                        <p className="text-sm text-gray-500 font-bold max-w-sm">Skip the final review screen and let AI-E submit applications automatically when match score &gt; 85%.</p>
                                    </div>
                                    <Switch className="border-2 border-black" />
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t-2 border-gray-100">
                                <div>
                                    <h4 className="font-black uppercase text-sm mb-1">Company Blacklist</h4>
                                    <p className="text-sm text-gray-500 font-bold mb-3">AI-E will never apply to jobs from these companies.</p>
                                </div>
                                <div className="flex gap-2">
                                    <Input placeholder="e.g. Acme Corp..." className="border-2 border-black bg-white focus-visible:ring-0 focus-visible:shadow-neo" />
                                    <Button className="border-2 border-black font-bold uppercase shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all">Add</Button>
                                </div>
                                <div className="flex flex-wrap gap-2 pt-2">
                                    <Badge variant="outline" className="border-black font-bold gap-1 group cursor-pointer hover:bg-red-50 hover:text-red-600 hover:border-red-600">
                                        Witch Companies <Trash2 size={12} className="opacity-0 group-hover:opacity-100" />
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </Card>
                )
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

                        <div className="mb-8 p-6 bg-primary/10 border-2 border-black relative overflow-hidden">
                            <div className="absolute -right-12 -top-12 opacity-10">
                                <Zap size={150} />
                            </div>
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <p className="font-bold text-gray-600 text-sm uppercase mb-1">Current Plan</p>
                                    <h4 className="text-3xl font-black uppercase flex items-center gap-2">Free Plan <Badge className="bg-green-400 text-black border-2 border-black uppercase text-xs">Active</Badge></h4>
                                </div>
                            </div>

                            <h5 className="font-black uppercase text-sm mb-2">Usage Limits (Resets in 12 days)</h5>
                            <div className="space-y-3">
                                <div>
                                    <div className="flex justify-between text-xs font-bold mb-1"><span>ATS Checks</span> <span>3 / 5</span></div>
                                    <div className="w-full bg-white h-3 border-2 border-black rounded-none">
                                        <div className="bg-yellow-400 h-full w-[60%] border-r-2 border-black"></div>
                                    </div>
                                </div>
                            </div>

                            <Button className="mt-6 w-full sm:w-auto border-2 border-black shadow-neo active:shadow-none font-bold uppercase bg-black text-white hover:bg-gray-800">
                                Manage Subscription
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-black uppercase text-lg border-b-2 border-black pb-2">Available Upgrades</h4>

                            <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-2 border-black hover:bg-primary/5 transition-colors group gap-4 relative overflow-hidden">
                                <div className="absolute top-0 right-0 bg-primary border-b-2 border-l-2 border-black px-2 py-0.5 text-[8px] font-black uppercase">Most Popular</div>
                                <div className="flex items-center gap-4 w-full sm:w-auto">
                                    <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-none group-hover:scale-110 transition-transform shrink-0">
                                        <Zap size={24} />
                                    </div>
                                    <div>
                                        <p className="font-black uppercase text-lg">Pro Plan</p>
                                        <p className="text-xs font-bold text-gray-600">Unlimited applies on Naukri & LinkedIn.</p>
                                    </div>
                                </div>
                                <div className="text-left sm:text-right w-full sm:w-auto flex flex-row sm:flex-col items-center sm:items-end justify-between">
                                    <p className="text-xl font-black">₹1,499<span className="text-xs font-bold text-gray-500">/mo</span></p>
                                    <Button size="sm" className="mt-0 sm:mt-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all h-8 text-xs font-bold uppercase">Upgrade</Button>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-2 border-black hover:bg-yellow-50 transition-colors group gap-4 relative">
                                <div className="flex items-center gap-4 w-full sm:w-auto">
                                    <div className="w-12 h-12 bg-yellow-400 border-2 border-black text-black flex items-center justify-center rounded-none group-hover:scale-110 transition-transform shrink-0">
                                        <Zap size={24} className="fill-black" />
                                    </div>
                                    <div>
                                        <p className="font-black uppercase text-lg">Turbo Plan</p>
                                        <p className="text-xs font-bold text-gray-600">Priority queue + Dedicated onboarding.</p>
                                    </div>
                                </div>
                                <div className="text-left sm:text-right w-full sm:w-auto flex flex-row sm:flex-col items-center sm:items-end justify-between">
                                    <p className="text-xl font-black">₹1,999<span className="text-xs font-bold text-gray-500">/mo</span></p>
                                    <Button size="sm" variant="outline" className="mt-0 sm:mt-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all h-8 text-xs font-bold uppercase bg-white">Select</Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                )
            case "Security":
                return (
                    <Card className="p-6 border-2 border-black shadow-neo bg-white">
                        <h3 className="font-black uppercase mb-6 flex items-center gap-2"><Shield size={20} /> Security & Privacy</h3>

                        <div className="space-y-6">
                            <div className="space-y-4">
                                <h4 className="font-bold border-b-2 border-black pb-2">Change Password</h4>
                                <div className="grid gap-2">
                                    <Label className="font-bold text-xs uppercase text-gray-600">Current Password</Label>
                                    <Input type="password" className="border-2 border-black" />
                                </div>
                                <div className="grid gap-2">
                                    <Label className="font-bold text-xs uppercase text-gray-600">New Password</Label>
                                    <Input type="password" className="border-2 border-black" />
                                </div>
                                <Button className="w-full md:w-auto border-2 border-black font-bold uppercase text-xs shadow-neo active:shadow-none">Update Password</Button>
                            </div>

                            <div className="space-y-4 pt-4">
                                <h4 className="font-bold border-b-2 border-black pb-2">Two-Factor Authentication</h4>
                                <div className="flex items-center justify-between border-2 border-gray-100 p-4">
                                    <div className="max-w-[70%] sm:max-w-[80%]">
                                        <p className="font-bold">Enable 2FA</p>
                                        <p className="text-xs font-medium text-gray-500">Secure your account with an extra layer of protection using an authenticator app.</p>
                                    </div>
                                    <Switch className="border-2 border-black" />
                                </div>
                            </div>

                            <div className="pt-8 border-t-2 border-black mt-8">
                                <h3 className="font-black uppercase mb-4 flex items-center gap-2 text-red-600"><Lock size={20} /> Danger Zone</h3>
                                <div className="space-y-4">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-2 border-black gap-4">
                                        <div>
                                            <p className="font-bold">Export Data</p>
                                            <p className="text-xs font-medium text-gray-600">Download a JSON copy of your profile and tracking data.</p>
                                        </div>
                                        <Button variant="outline" className="border-2 border-black font-bold text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shrink-0">Export JSON</Button>
                                    </div>

                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-2 border-red-200 bg-red-50 gap-4">
                                        <div>
                                            <p className="font-bold text-red-900">Delete Account</p>
                                            <p className="text-xs font-medium text-red-700">Permanently delete your account and all associated data. This action cannot be undone.</p>
                                        </div>
                                        <Button variant="destructive" className="border-2 border-black font-bold uppercase text-xs shadow-[2px_2px_0px_0px_rgba(220,38,38,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all shrink-0">Delete Profile</Button>
                                    </div>
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
                    {["Portals", "AI-E", "Account", "Notifications", "Billing", "Security"].map((item) => (
                        <button
                            key={item}
                            onClick={() => setActiveTab(item)}
                            className={`w-full text-left px-4 py-3 font-bold border-2 transition-all uppercase text-sm tracking-wide ${activeTab === item ? "bg-primary border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]" : "bg-white border-transparent hover:border-black text-gray-500 hover:text-black"}`}
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
