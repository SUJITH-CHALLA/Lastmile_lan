import { motion } from "framer-motion"

export function StatsBanner() {
    return (
        <section className="bg-black text-white border-b-2 border-black overflow-hidden relative">
            <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">

                {/* India-Specific Positioning Statement */}
                <div className="text-center mb-8 relative z-10">
                    <p className="text-lg md:text-2xl font-black uppercase text-yellow-300">
                        Built specifically for Indian job seekers — from campus placements to senior roles, across every major Indian and global job portal.
                    </p>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center relative z-10">
                    <div className="border-2 border-white/20 p-4 bg-white/5">
                        <div className="text-3xl md:text-5xl font-black text-primary mb-2">10k+</div>
                        <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-300">Waitlist Signups</div>
                    </div>
                    <div className="border-2 border-white/20 p-4 bg-white/5">
                        <div className="text-3xl md:text-5xl font-black text-primary mb-2">6</div>
                        <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-300">AI-Powered Tools</div>
                    </div>
                    <div className="border-2 border-white/20 p-4 bg-white/5">
                        <div className="text-3xl md:text-5xl font-black text-primary mb-2">10+</div>
                        <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-300">Supported Portals</div>
                    </div>
                    <div className="border-2 border-white/20 p-4 bg-white/5">
                        <div className="text-3xl md:text-5xl font-black text-primary mb-2">90%+</div>
                        <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-300">Avg Target Match</div>
                    </div>
                </div>

            </div>

            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full " style={{ backgroundImage: "radial-gradient(circle at 50% 150%, rgba(254, 215, 170, 0.15) 0%, transparent 50%)" }}></div>
        </section>
    )
}
