"use client"

import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"
import { motion } from "framer-motion"

export function Testimonials() {
    const reviews = [
        {
            name: "Alex M.",
            role: "Software Engineer",
            text: "I applied to 50 jobs with this. Got 12 interviews. The resume rewrite is insane.",
            stars: 5,
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
        },
        {
            name: "Sarah K.",
            role: "Product Manager",
            text: "Finally a tool that doesn't just spit out generic AI trash. It actually sounds like me.",
            stars: 5,
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
        },
        {
            name: "David R.",
            role: "New Grad",
            text: "Landed my first job in 2 weeks. The auto-apply extension saved me hours.",
            stars: 5,
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David"
        },
        {
            name: "Michael T.",
            role: "Data Scientist",
            text: "The scanner found keywords I missed. Hired at a top tech co in 3 weeks.",
            stars: 5,
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
        },
        {
            name: "Emily R.",
            role: "UX Designer",
            text: "Love the design. The portfolio builder is a game changer for creatives.",
            stars: 5,
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily"
        },
        {
            name: "James L.",
            role: "Marketing Lead",
            text: "Applying used to be a chore. Now it's almost fun? Worth every penny.",
            stars: 5,
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James"
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
                        className="flex gap-8 w-max"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 30
                        }}
                    >
                        {[...reviews, ...reviews].map((review, i) => (
                            <Card key={i} className="bg-primary/5 p-8 border-2 border-black shadow-neo w-[350px] shrink-0">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(review.stars)].map((_, j) => (
                                        <Star key={j} className="fill-black text-black w-5 h-5" />
                                    ))}
                                </div>
                                <p className="text-lg font-bold mb-6 line-clamp-3">"{review.text}"</p>
                                <div className="flex items-center gap-4">
                                    <img
                                        src={review.image}
                                        alt={review.name}
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
