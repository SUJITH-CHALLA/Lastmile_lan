"use client"

import { JoinWaitlistDialog } from "@/components/ui/join-waitlist-dialog"
import { Card } from "@/components/ui/card"
import { Users, UserPlus } from "lucide-react"
import Image from "next/image"

export function About() {
    // ... (founders array remains same)

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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    {/* Founder 1 */}
                    <Card className="p-8 border-2 border-black shadow-neo bg-white flex flex-col items-center text-center">
                        <div className="w-40 h-40 rounded-full border-2 border-black overflow-hidden mb-6 bg-gray-200">
                            <img
                                src="/Founder_f.png"
                                alt="Founder"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="text-2xl font-black uppercase mb-1">SUJITH.C</h3>
                        <p className="text-sm font-bold text-primary bg-black px-2 py-1 mb-2">FOUNDER & CHIEF AI ARCHITECT</p>
                        <p className="text-gray-600 font-medium leading-tight">
                            "Building the brain that makes getting hired inevitable."
                        </p>
                    </Card>

                    {/* Founder 2 */}
                    <Card className="p-8 border-2 border-black shadow-neo bg-white flex flex-col items-center text-center">
                        <div className="w-40 h-40 rounded-full border-2 border-black overflow-hidden mb-6 bg-gray-200">
                            <img
                                src="/Co-founder-f.png"
                                alt="Co-Founder"
                                className="w-full h-full object-cover object-[center_25%]"
                            />
                        </div>
                        <h3 className="text-2xl font-black uppercase mb-1">GUNA SHEKHAR.G</h3>
                        <p className="text-sm font-bold text-primary bg-black px-2 py-1 mb-2">CO-FOUNDER & LEAD DEVELOPER</p>
                        <p className="text-gray-600 font-medium leading-tight">
                            "Engineering the engine that powers your career growth."
                        </p>
                    </Card>
                </div>

                {/* Team / Hiring Section */}
                <div className="max-w-4xl mx-auto">
                    <Card className="p-12 border-2 border-black shadow-neo bg-black text-white text-center relative overflow-hidden">
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="bg-white text-black p-4 rounded-full border-2 border-white mb-6">
                                <UserPlus size={40} />
                            </div>
                            <h3 className="text-3xl font-black uppercase mb-4">The Team is Growing</h3>
                            <p className="text-lg font-medium text-gray-300 max-w-lg mx-auto mb-8">
                                We haven't hired the rest of the squad yet. But big things are coming.
                            </p>
                            <JoinWaitlistDialog>
                                <div className="inline-block border-2 border-white px-8 py-3 font-bold uppercase bg-white text-black hover:bg-transparent hover:text-white transition-colors cursor-pointer">
                                    Join The Waitlist
                                </div>
                            </JoinWaitlistDialog>
                        </div>

                        {/* Decoration */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-white to-primary opacity-50"></div>
                    </Card>
                </div>
            </div>
        </section>
    )
}
