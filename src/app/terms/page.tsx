import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/layout/Navbar"

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="container mx-auto px-4 md:px-8 pt-28 pb-20 max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-black uppercase mb-8">Terms of Service</h1>
                <div className="prose prose-lg max-w-none space-y-6 font-medium text-gray-700">
                    <p className="text-lg"><strong>Effective Date:</strong> February 2026</p>

                    <h2 className="text-2xl font-black uppercase mt-8">1. Acceptance of Terms</h2>
                    <p>By accessing and using LastMile, you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform.</p>

                    <h2 className="text-2xl font-black uppercase mt-8">2. Service Description</h2>
                    <p>LastMile provides AI-powered tools for resume tailoring, job application tracking, ATS optimization, and career support. The platform is designed to assist — not guarantee — job placement.</p>

                    <h2 className="text-2xl font-black uppercase mt-8">3. User Responsibilities</h2>
                    <p>You are responsible for the accuracy of information provided. Misuse of automation tools (e.g., spam-applying to jobs) may result in account termination.</p>

                    <h2 className="text-2xl font-black uppercase mt-8">4. Billing</h2>
                    <p>Free tier users have access to limited features. Paid plans are billed monthly or yearly as selected. Cancellation takes effect at the end of the billing cycle.</p>

                    <h2 className="text-2xl font-black uppercase mt-8">5. Contact</h2>
                    <p>For questions about these terms, email us at <a href="mailto:contact@lastmile.work" className="underline font-bold">contact@lastmile.work</a>.</p>
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
