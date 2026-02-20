"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Loader2, Check, Layout, Terminal, Globe, ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function PortfolioDeveloper() {
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
    const [isGenerating, setIsGenerating] = useState(false)
    const [isGenerated, setIsGenerated] = useState(false)

    const templates = [
        { id: "minimal", name: "Minimalist Dev", desc: "Clean, text-focused, fast.", color: "bg-gray-100" },
        { id: "visual", name: "Creative Visual", desc: "Image-heavy, grid layout.", color: "bg-yellow-100" },
        { id: "terminal", name: "Terminal Pro", desc: "Hacker style, dark mode.", color: "bg-black text-white" }
    ]

    const handleGenerate = () => {
        if (!selectedTemplate) return
        setIsGenerating(true)
        setTimeout(() => {
            setIsGenerating(false)
            setIsGenerated(true)
        }, 3000)
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b-2 border-black p-6 bg-primary">
                <div className="container mx-auto flex justify-between items-center">
                    <Link href="/" className="font-black text-2xl uppercase tracking-tighter">LastMile.</Link>
                    <nav className="flex gap-4">
                        <Link href="/dashboard" className="font-bold underline">Dashboard</Link>
                        <Link href="/" className="font-bold underline">Back to Home</Link>
                    </nav>
                </div>
            </header>

            <main className="container mx-auto px-4 py-12 max-w-5xl">
                <h1 className="text-4xl md:text-6xl font-black uppercase mb-4">Portfolio Developer</h1>
                <p className="text-xl font-medium text-gray-600 mb-12 max-w-2xl">
                    Turn your LastMile profile into a deployed portfolio website in seconds. Select a template, generate, and deploy.
                </p>

                {/* Step 1: Select Template */}
                <div className="mb-16">
                    <h2 className="text-2xl font-black uppercase mb-6 flex items-center gap-2">
                        <Layout className="w-6 h-6" /> 1. Select Template
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {templates.map((t) => (
                            <div
                                key={t.id}
                                onClick={() => setSelectedTemplate(t.id)}
                                className={`cursor-pointer border-2 border-black p-6 shadow-neo transition-all hover:-translate-y-1 ${selectedTemplate === t.id ? "ring-4 ring-black ring-offset-2" : ""
                                    } ${t.color}`}
                            >
                                <div className="h-32 border-2 border-black mb-4 bg-white/50 flex items-center justify-center font-bold uppercase tracking-widest">
                                    Preview
                                </div>
                                <h3 className="font-black text-xl uppercase mb-2">{t.name}</h3>
                                <p className="font-medium text-sm lg:text-base opacity-80">{t.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Step 2: Generate */}
                <div className="mb-16 border-t-2 border-black pt-12">
                    <h2 className="text-2xl font-black uppercase mb-6 flex items-center gap-2">
                        <Terminal className="w-6 h-6" /> 2. Generate Code
                    </h2>

                    {!isGenerated ? (
                        <div className="bg-gray-50 border-2 border-black p-12 text-center">
                            <Button
                                size="lg"
                                onClick={handleGenerate}
                                disabled={!selectedTemplate || isGenerating}
                                className="h-16 px-12 text-xl border-2 border-black shadow-neo active:shadow-none"
                            >
                                {isGenerating ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="animate-spin" /> Building...
                                    </span>
                                ) : (
                                    "Generate Portfolio"
                                )}
                            </Button>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-green-100 border-2 border-black p-8 flex flex-col md:flex-row items-center gap-6"
                        >
                            <div className="bg-green-500 text-white p-4 rounded-full border-2 border-black shadow-neo-sm">
                                <Check size={32} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-black uppercase mb-2">Build Complete!</h3>
                                <p className="font-bold">Your portfolio code is ready. Follow the steps below to deploy it live.</p>
                            </div>
                            <Button variant="outline" className="border-2 border-black shadow-neo bg-white font-bold h-12">
                                Download Source Code
                            </Button>
                        </motion.div>
                    )}
                </div>

                {/* Step 3: Deployment Guide */}
                <div className="mb-16 border-t-2 border-black pt-12">
                    <h2 className="text-2xl font-black uppercase mb-6 flex items-center gap-2">
                        <Globe className="w-6 h-6" /> 3. Deploy to World
                    </h2>

                    <Accordion type="single" collapsible className="w-full space-y-4">
                        <AccordionItem value="vercel" className="border-2 border-black shadow-neo bg-white px-6">
                            <AccordionTrigger className="text-xl font-black uppercase hover:no-underline">
                                Deploy to Vercel (Recommended)
                            </AccordionTrigger>
                            <AccordionContent className="text-lg font-medium space-y-4 pt-4">
                                <p>1. Install Vercel CLI: <code className="bg-gray-100 p-1 border border-black">npm i -g vercel</code></p>
                                <p>2. Run command: <code className="bg-gray-100 p-1 border border-black">vercel login</code></p>
                                <p>3. Run command: <code className="bg-gray-100 p-1 border border-black">vercel</code> inside your project folder.</p>
                                <p className="text-green-600 font-bold">Done! You'll get a URL like `my-portfolio.vercel.app`.</p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="netlify" className="border-2 border-black shadow-neo bg-white px-6">
                            <AccordionTrigger className="text-xl font-black uppercase hover:no-underline">
                                Deploy to Netlify
                            </AccordionTrigger>
                            <AccordionContent className="text-lg font-medium space-y-4 pt-4">
                                <p>1. Drag and drop your `dist` or `out` folder to <a href="#" className="underline text-blue-600">netlify.com/drop</a>.</p>
                                <p>2. Or use CLI: <code className="bg-gray-100 p-1 border border-black">npm i -g netlify-cli</code></p>
                                <p>3. Run: <code className="bg-gray-100 p-1 border border-black">netlify deploy --prod</code></p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="render" className="border-2 border-black shadow-neo bg-white px-6">
                            <AccordionTrigger className="text-xl font-black uppercase hover:no-underline">
                                Deploy to Render
                            </AccordionTrigger>
                            <AccordionContent className="text-lg font-medium space-y-4 pt-4">
                                <p>1. Push your code to a GitHub repository.</p>
                                <p>2. Go to Render Dashboard &rarr; New &rarr; Static Site.</p>
                                <p>3. Connect your GitHub repo and click "Create Static Site".</p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

            </main>
        </div>
    )
}
