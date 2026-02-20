"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Plus } from "lucide-react"

export default function ProfilePage() {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="relative h-40 bg-zinc-900 border-2 border-black shadow-neo">
                <div className="absolute -bottom-12 left-8">
                    <div className="w-24 h-24 bg-primary border-2 border-black flex items-center justify-center">
                        <span className="text-4xl font-black">JD</span>
                    </div>
                </div>
            </div>

            <div className="pt-12 px-2 flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black uppercase">John Doe</h1>
                    <p className="text-xl font-bold text-gray-600">Senior Frontend Engineer</p>
                </div>
                <Button className="font-bold border-2 border-black shadow-neo active:shadow-none">
                    Edit Profile
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Left Column: Contact & Skills */}
                <div className="space-y-8">
                    <Card className="p-6 border-2 border-black shadow-neo bg-white">
                        <h3 className="font-black uppercase mb-4 border-b-2 border-black pb-2">Contact</h3>
                        <div className="space-y-3 font-medium">
                            <div className="flex items-center gap-2">
                                <Mail size={16} /> john.doe@example.com
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={16} /> +1 (555) 123-4567
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin size={16} /> San Francisco, CA
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 border-2 border-black shadow-neo bg-white">
                        <div className="flex justify-between items-center mb-4 border-b-2 border-black pb-2">
                            <h3 className="font-black uppercase">Skills</h3>
                            <Button size="icon" variant="ghost" className="h-6 w-6"><Plus size={14} /></Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {["React", "Next.js", "TypeScript", "Tailwind", "Node.js", "GraphQL"].map(skill => (
                                <Badge key={skill} variant="secondary" className="border-black font-bold rounded-none">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Right Column: Experience & Education */}
                <div className="md:col-span-2 space-y-8">
                    <Card className="p-6 border-2 border-black shadow-neo bg-white">
                        <div className="flex justify-between items-center mb-6 border-b-2 border-black pb-2">
                            <h3 className="font-black uppercase flex items-center gap-2"><Briefcase size={20} /> Experience</h3>
                            <Button size="sm" variant="outline" className="h-8 border-black font-bold"><Plus size={14} className="mr-1" /> Add</Button>
                        </div>

                        <div className="space-y-6">
                            <div className="relative pl-6 border-l-2 border-gray-200">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-black border-2 border-white rounded-full"></div>
                                <h4 className="font-black text-lg">Senior Frontend Engineer</h4>
                                <p className="font-bold text-gray-600">TechCorp Inc. • 2021 - Present</p>
                                <ul className="list-disc list-inside mt-2 text-gray-700 font-medium">
                                    <li>Led migration of legacy PHP app to Next.js.</li>
                                    <li>Improved core web vitals by 40%.</li>
                                    <li>Mentored 3 junior developers.</li>
                                </ul>
                            </div>

                            <div className="relative pl-6 border-l-2 border-gray-200">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-gray-400 border-2 border-white rounded-full"></div>
                                <h4 className="font-black text-lg">Software Developer</h4>
                                <p className="font-bold text-gray-600">StartUp ly • 2019 - 2021</p>
                                <ul className="list-disc list-inside mt-2 text-gray-700 font-medium">
                                    <li>Built MVP for flagship product using React.</li>
                                    <li>Implemented Stripe payment processing.</li>
                                </ul>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 border-2 border-black shadow-neo bg-white">
                        <div className="flex justify-between items-center mb-6 border-b-2 border-black pb-2">
                            <h3 className="font-black uppercase flex items-center gap-2"><GraduationCap size={20} /> Education</h3>
                            <Button size="sm" variant="outline" className="h-8 border-black font-bold"><Plus size={14} className="mr-1" /> Add</Button>
                        </div>

                        <div className="relative pl-6 border-l-2 border-gray-200">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 bg-black border-2 border-white rounded-full"></div>
                            <h4 className="font-black text-lg">BS Computer Science</h4>
                            <p className="font-bold text-gray-600">University of Technology • 2015 - 2019</p>
                        </div>
                    </Card>
                </div>

            </div>
        </div>
    )
}
