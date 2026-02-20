"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area" // Need to install ScrollArea or use div
import { Send, Bot, Sparkles } from "lucide-react"

export function AICopilot() {
    return (
        <aside className="w-80 h-screen bg-white border-l-2 border-black flex flex-col sticky top-0 hidden lg:flex">
            <div className="p-4 border-b-2 border-black bg-primary/10">
                <h2 className="font-black uppercase flex items-center gap-2">
                    <Bot size={24} />
                    AI-E
                    <Sparkles className="w-5 h-5 fill-black text-black" />
                </h2>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {/* Mock Chat History */}
                <div className="flex gap-2 items-start">
                    <div className="w-8 h-8 bg-black rounded-full shrink-0"></div>
                    <div className="bg-gray-100 p-3 border-2 border-black text-sm font-medium">
                        I found 3 jobs that match your "Frontend" skill. Want me to draft cover letters?
                    </div>
                </div>

                <div className="flex gap-2 items-start flex-row-reverse">
                    <div className="w-8 h-8 bg-gray-300 rounded-full shrink-0"></div>
                    <div className="bg-primary p-3 border-2 border-black text-sm font-bold">
                        Yes, focus on the Google listing first.
                    </div>
                </div>
            </div>

            <div className="p-4 border-t-2 border-black bg-white">
                <div className="flex gap-2">
                    <Input placeholder="Ask AI-E ✦..." className="border-2 border-black" />
                    <Button size="icon" className="border-2 border-black shadow-neo active:shadow-none bg-black text-white hover:bg-gray-800">
                        <Send size={16} />
                    </Button>
                </div>
            </div>
        </aside>
    )
}
