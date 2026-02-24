import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/layout/Navbar"

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="container mx-auto px-4 md:px-8 pt-28 pb-20 max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-black uppercase mb-8">Privacy Policy</h1>
                <div className="prose prose-lg max-w-none space-y-6 font-medium text-gray-700">
                    <p className="text-lg"><strong>Effective Date:</strong> February 2026</p>

                    <h2 className="text-2xl font-black uppercase mt-8">1. Information We Collect</h2>
                    <p>When you join the LastMile waitlist or create an account, we collect your name, email address, and organization. When using our tools, we process your resume content and job descriptions locally and do not share them with third parties.</p>

                    <h2 className="text-2xl font-black uppercase mt-8">2. How We Use Your Data</h2>
                    <p>Your data is used exclusively to provide our AI-powered job application services, including resume tailoring, ATS scoring, and application tracking. We never sell your data to recruiters or advertisers.</p>

                    <h2 className="text-2xl font-black uppercase mt-8">3. Data Storage & Security</h2>
                    <p>All data is stored securely on Supabase with industry-standard encryption. You can request deletion of your data at any time by contacting us.</p>

                    <h2 className="text-2xl font-black uppercase mt-8">4. Contact</h2>
                    <p>For privacy concerns, email us at <a href="mailto:contact@lastmile.work" className="underline font-bold">contact@lastmile.work</a>.</p>
                </div>

                <div className="mt-12">
                    <Link href="/">
                        <Button variant="outline" className="border-2 border-black shadow-neo font-bold">
                            ← Back to Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
