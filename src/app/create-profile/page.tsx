"use client"

import FlowContainer from "@/components/flow/FlowContainer"
import { Navbar } from "@/components/layout/Navbar"

export default function CreateProfilePage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar hideLinks={true} onGetStarted={() => window.location.href = '/'} />
            <FlowContainer />
        </main>
    )
}
