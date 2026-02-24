"use client"

import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"
import { motion } from "framer-motion"

export function Testimonials() {
    const reviews = [
        {
            name: "Arjun S.",
            role: "IT Professional",
            text: "“Applied to 30 companies on Naukri and LinkedIn in one week. Got 6 interview calls. Used to take me a month to apply to this many properly.”",
            stars: 5,
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun"
        },
        {
            name: "Priya M.",
            role: "Fresher",
            text: "“The ATS score checker showed me my resume was only 34% matched. After the tailoring it hit 89%. Got shortlisted at TCS and Infosys the same week.”",
            stars: 5,
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya"
        },
        {
            name: "Rahul K.",
            role: "Campus Placements",
            text: "“Finally stopped copy-pasting my experience into every job form. One click and it’s done. Game changer for campus placements.”",
            stars: 5,
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul"
        },
        {
            name: "Sneha R.",
            role: "MBA Graduate",
            text: "“Got my first job offer 3 weeks after signing up. The cover letter generator actually sounds like me, not like ChatGPT.”",
            stars: 5,
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha"
        },
        {
            name: "Karan P.",
            role: "Product @ Indian Startup",
            text: "“The auto-apply extension is mental. I just click once and it fills the entire application perfectly.”",
            stars: 5,
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karan"
        },
        {
            name: "Divya T.",
            role: "Senior Developer",
            text: "“The job tracker alone is worth it. No more messy Excel sheets. I know exactly where I am in every interview pipeline.”",
            stars: 5,
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Divya"
        }
    ]

    return (
        <section className="py-20 bg-white border-b-2 border-black overflow-hidden">
            <div className="container mx-auto px-4 md:px-8">
                <h2 className="text-4xl md:text-6xl font-black uppercase mb-12 text-center">
                    DON'T TRUST US. <br /> TRUST <span className="bg-primary px-2">THEM</span>.
                </h2>

                {/* Marquee Container */}
                <div className="relative w-full overflow-hidden mask-linear-fade">
                    <motion.div
                        className="flex gap-8 w-max pr-8"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 40
                        }}
                    >
                        {[...reviews, ...reviews].map((review, i) => (
                            <Card key={i} className="bg-primary/5 p-8 border-2 border-black shadow-neo w-[350px] shrink-0">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(review.stars)].map((_, j) => (
                                        <Star key={j} className="fill-black text-black w-5 h-5" />
                                    ))}
                                </div>
                                <p className="text-lg font-bold mb-6 line-clamp-3">{review.text}</p>
                                <div className="flex items-center gap-4">
                                    <img
                                        src={review.image}
                                        alt={review.name}
                                        loading="lazy"
                                        className="w-12 h-12 rounded-full border-2 border-black bg-gray-100"
                                    />
                                    <div>
                                        <p className="font-bold">{review.name}</p>
                                        <p className="text-sm text-gray-600 uppercase font-bold">{review.role}</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
