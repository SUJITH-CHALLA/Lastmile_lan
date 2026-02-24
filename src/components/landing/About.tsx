"use client"

import { JoinWaitlistDialog } from "@/components/ui/join-waitlist-dialog"
import { Card } from "@/components/ui/card"
import { Users, UserPlus } from "lucide-react"
import Image from "next/image"

export function About() {
    const team = [
        { name: "SUJITH.C", role: "FOUNDER & CHIEF AI ARCHITECT", desc: '"Building the brain that makes getting hired inevitable."', img: "/founder.png" },
        { name: "GUNA SHEKHAR.G", role: "CO-FOUNDER & LEAD DEVELOPER", desc: '"Engineering the engine that powers your career growth."', img: "/co-founder.png" },
        { name: "SASI BHARGAV", role: "CORE DEVELOPER", desc: '"Scaling the systems that never sleep."', img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sasi" },
        { name: "MOHAN SAI", role: "PRODUCT ENGINEER", desc: '"Building intuitive user experiences."', img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohan" },
        { name: "DEEPTHI", role: "UX/UI DESIGNER", desc: '"Designing the future of job hunting."', img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Deepthi" },
        { name: "VARSHINI", role: "DATA ENGINEER", desc: '"Transforming data into an unfair advantage."', img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Varshini" },
        { name: "TEJESRI", role: "QA ENGINEER", desc: '"Ensuring flawless execution in every application."', img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tejesri" },
        { name: "VENKATESH", role: "AUTOMATION ENGINEER", desc: '"Automating the manual work away."', img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Venkatesh" },
    ]

    return (
        <section id="about" className="py-20 bg-yellow-50 border-b-2 border-black">
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black uppercase mb-4 text-black">
                        MEET THE <br /> <span className="bg-primary px-2 text-black">BUILDERS.</span>
                    </h2>
                    <p className="text-base text-gray-600 max-w-2xl mx-auto font-medium">
                        We are just shipping code and breaking things.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                    {team.map((member, i) => (
                        <Card key={i} className="p-6 md:p-8 border-2 border-black shadow-neo bg-white flex flex-col items-center text-center hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo-lg transition-all">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-black overflow-hidden mb-6 bg-gray-200 shrink-0">
                                <img
                                    src={member.img}
                                    alt={member.name}
                                    width={160}
                                    height={160}
                                    loading="lazy"
                                    className="w-full h-full object-cover object-[center_25%]"
                                />
                            </div>
                            <h3 className="text-xl md:text-2xl font-black uppercase mb-1">{member.name}</h3>
                            <p className="text-[10px] md:text-xs font-bold text-primary bg-black px-2 py-1 mb-3">{member.role}</p>
                            <p className="text-gray-600 font-medium leading-tight text-sm">
                                {member.desc}
                            </p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
