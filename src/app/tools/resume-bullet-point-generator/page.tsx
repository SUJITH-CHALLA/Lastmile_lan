"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Loader2, Copy, Plus } from "lucide-react"

export default function ResumeBulletPointGenerator() {
    const [role, setRole] = useState("")
    const [metric, setMetric] = useState("")
    const [bullets, setBullets] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const handleGenerate = () => {
        setIsLoading(true)
        setTimeout(() => {
            setBullets([
                `Increased ${metric || "efficiency"} by 35% through optimizing legacy codebases.`,
                `Spearheaded the development of a new ${role || "feature"} resulting in $50k annual savings.`,
                `Led a team of 5 engineers to deliver high-priority projects 2 weeks ahead of schedule.`
            ])
            setIsLoading(false)
        }, 1500)
    }

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-black uppercase mb-2">Bullet Point Generator</h1>
                <p className="text-gray-600">Turn boring tasks into impact statements.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label className="font-bold">Role / Task</Label>
                    <input
                        className="w-full h-12 border-2 border-black px-3 text-sm focus:outline-none focus:ring-2 focus:ring-black shadow-neo-sm"
                        placeholder="e.g. Frontend Developer"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label className="font-bold">Metric / Impact (Optional)</Label>
                    <input
                        className="w-full h-12 border-2 border-black px-3 text-sm focus:outline-none focus:ring-2 focus:ring-black shadow-neo-sm"
                        placeholder="e.g. Reduced load time"
                        value={metric}
                        onChange={(e) => setMetric(e.target.value)}
                    />
                </div>
            </div>

            <Button
                onClick={handleGenerate}
                disabled={isLoading || !role}
                className="w-full h-12 text-lg font-bold border-2 border-black shadow-neo active:shadow-none"
            >
                {isLoading ? <><Loader2 className="animate-spin mr-2" /> Generating...</> : "Generate Bullets"}
            </Button>

            {bullets.length > 0 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                    {bullets.map((bullet, i) => (
                        <Card key={i} className="bg-white border-2 border-black p-4 flex justify-between items-center shadow-neo hover:translate-x-1 hover:translate-y-1 transition-all">
                            <p className="font-medium mr-4">{bullet}</p>
                            <Button size="icon" variant="ghost" onClick={() => navigator.clipboard.writeText(bullet)}>
                                <Copy size={16} />
                            </Button>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
