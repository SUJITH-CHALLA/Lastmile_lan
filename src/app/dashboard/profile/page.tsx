"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Plus, Edit } from "lucide-react"

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

            <div className="pt-12 px-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
                <div>
                    <h1 className="text-4xl font-black uppercase">John Doe</h1>
                    <p className="text-xl font-bold text-gray-600">Senior Frontend Engineer (React/Next.js)</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="font-bold border-2 border-black shadow-neo active:shadow-none hover:bg-blue-50 text-blue-700 bg-white group">
                        <svg className="w-4 h-4 mr-2 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                        Import LinkedIn
                    </Button>
                    <Button className="font-bold border-2 border-black shadow-neo active:shadow-none uppercase">
                        Edit Profile
                    </Button>
                </div>
            </div>

            {/* Profile Strength Bar */}
            <div className="bg-white border-2 border-black p-4 shadow-neo flex flex-col sm:flex-row items-center gap-4">
                <div className="font-black uppercase whitespace-nowrap">Profile Strength</div>
                <div className="flex-1 w-full h-8 bg-gray-200 border-2 border-black relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-primary w-[72%] border-r-2 border-black transition-all"></div>
                </div>
                <div className="font-black text-xl w-16 text-right">72%</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Left Column: Contact & Skills */}
                <div className="space-y-8">
                    <Card className="p-6 border-2 border-black shadow-neo bg-white">
                        <h3 className="font-black uppercase mb-4 border-b-2 border-black pb-2">Contact</h3>
                        <div className="space-y-4 font-medium text-sm md:text-base overflow-hidden">
                            <div className="flex items-start gap-3">
                                <Mail size={18} className="shrink-0 mt-0.5" />
                                <span className="break-all">john.doe@example.com</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone size={18} className="shrink-0 mt-0.5" />
                                <span>+91 98765 43210</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin size={18} className="shrink-0 mt-0.5" />
                                <span>Bangalore, India</span>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 border-2 border-black shadow-neo bg-white">
                        <div className="flex justify-between items-center mb-4 border-b-2 border-black pb-2">
                            <h3 className="font-black uppercase">Preferences</h3>
                            <Button size="icon" variant="ghost" className="h-6 w-6"><Plus size={14} /></Button>
                        </div>
                        <div className="space-y-4 font-medium text-sm">
                            <div>
                                <h4 className="font-black text-gray-500 uppercase text-xs mb-1">Target Roles</h4>
                                <p>SDE II, Senior Frontend Eng, Full Stack Eng</p>
                            </div>
                            <div>
                                <h4 className="font-black text-gray-500 uppercase text-xs mb-1">Job Type</h4>
                                <div className="flex gap-2 mt-1">
                                    <Badge variant="outline" className="border-black">Full Time</Badge>
                                    <Badge variant="outline" className="border-black">Contract</Badge>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-black text-gray-500 uppercase text-xs mb-1">Target Locations</h4>
                                <p>Bangalore, Hyderabad, Remote</p>
                            </div>
                            <div>
                                <h4 className="font-black text-gray-500 uppercase text-xs mb-1">Expected Salary (₹)</h4>
                                <p className="font-black text-lg">35L - 45L / annum</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 border-2 border-black shadow-neo bg-white">
                        <div className="flex justify-between items-center mb-4 border-b-2 border-black pb-2">
                            <h3 className="font-black uppercase">Skills</h3>
                            <Button size="icon" variant="ghost" className="h-6 w-6"><Plus size={14} /></Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { name: "React", level: "Expert" },
                                { name: "Next.js", level: "Expert" },
                                { name: "TypeScript", level: "Advanced" },
                                { name: "Tailwind", level: "Advanced" },
                                { name: "Node.js", level: "Intermediate" },
                                { name: "GraphQL", level: "Intermediate" }
                            ].map(skill => (
                                <div key={skill.name} className="flex items-center group">
                                    <Badge variant="secondary" className="border-2 border-black font-bold bg-yellow-50 group-hover:bg-yellow-200 transition-colors uppercase py-1">
                                        {skill.name} <span className="text-[10px] text-gray-500 lowercase ml-1 font-medium bg-white px-1 border border-black rounded-sm hidden group-hover:inline-block absolute -translate-y-6">{skill.level}</span>
                                    </Badge>
                                </div>
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
                                <p className="font-bold text-gray-600">Swiggy • Bangalore • 2021 - Present</p>
                                <p className="text-sm mt-2 text-gray-700 font-medium">Leading the frontend core web vitals initiative for the main consumer app.</p>
                                <ul className="list-disc list-inside mt-2 text-gray-700 font-medium text-sm">
                                    <li>Architected micro-frontend migration scaling to 5M+ daily active users.</li>
                                    <li>Improved core web vitals (LCP) by 40%.</li>
                                    <li>Mentored 3 junior developers.</li>
                                </ul>
                            </div>

                            <div className="relative pl-6 border-l-2 border-gray-200">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-gray-400 border-2 border-black rounded-full"></div>
                                <h4 className="font-black text-lg">Software Developer (SDE I)</h4>
                                <p className="font-bold text-gray-600">Freshworks • Chennai • 2018 - 2021</p>
                                <p className="text-sm mt-2 text-gray-700 font-medium">Full stack developer for the Freshdesk merchant portal.</p>
                                <ul className="list-disc list-inside mt-2 text-gray-700 font-medium text-sm">
                                    <li>Built reporting dashboard MVP using React and Highcharts.</li>
                                    <li>Implemented Stripe payment processing APIs.</li>
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
                            <div className="absolute -left-[9px] top-0 w-4 h-4 bg-black border-2 border-black rounded-full"></div>
                            <h4 className="font-black text-lg">B.Tech Computer Science</h4>
                            <p className="font-bold text-gray-600">VIT Vellore • 2014 - 2018</p>
                            <p className="text-sm font-bold text-gray-500 mt-1">CGPA: 8.4/10</p>
                        </div>
                    </Card>

                    <Card className="p-6 border-2 border-black shadow-neo bg-white">
                        <div className="flex justify-between items-center mb-6 border-b-2 border-black pb-2">
                            <h3 className="font-black uppercase flex items-center gap-2"><Briefcase size={20} /> Saved Answers</h3>
                            <Button size="sm" variant="outline" className="h-8 border-black font-bold"><Plus size={14} className="mr-1" /> Add</Button>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-gray-50 border-2 border-gray-200 p-4 relative group">
                                <Button size="icon" variant="ghost" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 h-6 w-6"><Edit size={12} /></Button>
                                <h4 className="font-black text-sm uppercase mb-1">Why should we hire you?</h4>
                                <p className="text-sm font-medium text-gray-700 line-clamp-2 italic">"I combine deep technical expertise in React architecture with a product-first mindset. Having scaled systems at Swiggy..."</p>
                            </div>
                            <div className="bg-gray-50 border-2 border-gray-200 p-4 relative group">
                                <Button size="icon" variant="ghost" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 h-6 w-6"><Edit size={12} /></Button>
                                <h4 className="font-black text-sm uppercase mb-1">Are you willing to relocate?</h4>
                                <p className="text-sm font-medium text-gray-700 italic">"Yes, open to relocating to Bangalore or Hyderabad for the right hybrid/in-office opportunity."</p>
                            </div>
                        </div>
                    </Card>
                </div>

            </div>
        </div>
    )
}
