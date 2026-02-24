import { ArrowRight, FileText, Search, MousePointerClick, Edit3, CheckCircle, Send, LayoutList } from "lucide-react"

export function HowItWorks() {
    const steps = [
        { icon: <FileText size={24} />, text: "Profile Setup" },
        { icon: <Search size={24} />, text: "Job Discovery" },
        { icon: <MousePointerClick size={24} />, text: "One-Click Apply" },
        { icon: <Edit3 size={24} />, text: "AI Fills Form" },
        { icon: <CheckCircle size={24} />, text: "User Confirms" },
        { icon: <Send size={24} />, text: "Application Submitted" },
        { icon: <LayoutList size={24} />, text: "Tracker Updated" }
    ]

    return (
        <section id="how-it-works" className="py-20 bg-white border-b-2 border-black overflow-hidden relative">
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black uppercase mb-4 text-black">
                        HOW IT <span className="bg-green-300 px-2 border-2 border-black shadow-neo-sm transform -rotate-2 inline-block">ACTUALLY WORKS</span>
                    </h2>
                    <p className="text-base text-gray-600 max-w-2xl mx-auto font-medium">
                        The fully automated pipeline from raw profile to submitted application.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2 flex-wrap">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col md:flex-row items-center gap-2">
                            <div className="flex flex-col items-center p-4 w-40 h-32 justify-center bg-white border-2 border-black shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo-lg hover:bg-yellow-50 transition-all text-center">
                                <div className="mb-3 p-2 bg-black text-white">{step.icon}</div>
                                <span className="text-sm font-bold uppercase">{step.text}</span>
                            </div>

                            {/* Connector Arrow (hidden on last item) */}
                            {index < steps.length - 1 && (
                                <div className="py-2 md:px-2 flex items-center justify-center">
                                    <ArrowRight className="text-black rotate-90 md:rotate-0" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
