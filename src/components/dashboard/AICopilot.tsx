"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Bot, Sparkles, Lightbulb } from "lucide-react"
import Image from "next/image"

export function AICopilot() {
    const [messages, setMessages] = useState([
        { role: "ai", text: "I found 4 jobs that match your 'Frontend' skill. Want me to draft cover letters?" },
        { role: "user", text: "Yes, focus on the CRED listing first." }
    ])
    const [inputValue, setInputValue] = useState("")
    const [isTyping, setIsTyping] = useState(false)

    const handleSend = () => {
        if (!inputValue.trim()) return

        // Add user message
        setMessages(prev => [...prev, { role: "user", text: inputValue }])
        setInputValue("")
        setIsTyping(true)

        // Mock AI response delay
        setTimeout(() => {
            setMessages(prev => [...prev, {
                role: "ai",
                text: "AI-E is warming up — join the waitlist to get full access and automated one-click apply functionality."
            }])
            setIsTyping(false)
        }, 1000)
    }

    const suggestions = [
        "Find me remote jobs at top startups.",
        "Improve my resume for CRED."
    ]

    return (
        <aside className="w-80 h-screen bg-white border-l-2 border-black flex flex-col sticky top-0 hidden lg:flex">
            <div className="p-4 border-b-2 border-black bg-primary/10 flex items-center justify-between">
                <div>
                    <h2 className="font-black uppercase flex items-center gap-2">
                        <Bot size={24} />
                        AI-E
                        <Sparkles className="w-5 h-5 fill-black text-black" />
                    </h2>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Your personal job application assistant</p>
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-black bg-white flex items-center justify-center overflow-hidden shrink-0">
                    <Image src="https://api.dicebear.com/7.x/bottts/svg?seed=AIE" alt="AI-E Avatar" width={32} height={32} unoptimized className="w-full h-full object-cover bg-gray-100" />
                </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {/* Chat History */}
                {messages.map((msg, i) => (
                    msg.role === "ai" ? (
                        <div key={i} className="flex gap-2 items-start">
                            <div className="w-8 h-8 rounded-full border-2 border-black shrink-0 overflow-hidden bg-white mt-1">
                                <Image src="https://api.dicebear.com/7.x/bottts/svg?seed=AIE" alt="AI" width={32} height={32} unoptimized className="w-full h-full object-cover bg-gray-100" />
                            </div>
                            <div className="bg-gray-100 p-3 border-2 border-black font-medium text-sm rounded-br-none max-w-[85%]">
                                {msg.text}
                            </div>
                        </div>
                    ) : (
                        <div key={i} className="flex gap-2 items-start flex-row-reverse">
                            <div className="w-8 h-8 bg-primary border-2 border-black rounded-full shrink-0 flex items-center justify-center font-black text-xs mt-1">
                                JD
                            </div>
                            <div className="bg-primary p-3 border-2 border-black font-bold text-sm rounded-bl-none max-w-[85%]">
                                {msg.text}
                            </div>
                        </div>
                    )
                ))}
                {isTyping && (
                    <div className="flex gap-2 items-start">
                        <div className="w-8 h-8 rounded-full border-2 border-black shrink-0 overflow-hidden bg-white mt-1">
                            <Image src="https://api.dicebear.com/7.x/bottts/svg?seed=AIE" alt="AI" width={32} height={32} unoptimized className="w-full h-full object-cover bg-gray-100" />
                        </div>
                        <div className="bg-gray-100 p-3 border-2 border-black font-medium text-sm flex gap-1 items-center h-10 px-4">
                            <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce delay-75"></span>
                            <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce delay-150"></span>
                            <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce delay-300"></span>
                        </div>
                    </div>
                )}
            </div>

            {/* Suggested Prompts */}
            <div className="px-4 py-2 border-t-2 border-black bg-gray-50 flex flex-col gap-2">
                <div className="flex items-center gap-1 text-xs font-bold text-gray-500 uppercase">
                    <Lightbulb size={12} /> Suggested
                </div>
                <div className="flex flex-col gap-2">
                    {suggestions.map((sug, i) => (
                        <button
                            key={i}
                            onClick={() => { setInputValue(sug); handleSend(); }} // Actually auto-send or just populate. Lets populate for demo
                            className="text-left text-xs font-bold text-gray-700 bg-white border-2 border-black p-2 hover:bg-yellow-50 hover:shadow-neo transition-all rounded transition-all truncate"
                        >
                            &quot;{sug}&quot;
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-4 border-t-2 border-black bg-white">
                <div className="flex gap-2">
                    <Input
                        placeholder="Ask AI-E ✦..."
                        className="border-2 border-black font-medium"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <Button
                        size="icon"
                        onClick={handleSend}
                        className="border-2 border-black shadow-neo active:shadow-none bg-black text-white hover:bg-gray-800 shrink-0"
                    >
                        <Send size={16} />
                    </Button>
                </div>
            </div>
        </aside>
    )
}
