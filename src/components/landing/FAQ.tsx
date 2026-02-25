"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQ() {
    const faqs = [
        {
            question: "What the f*ck is LastMile?",
            answer: "LastMile is an AI-powered job application platform built for Indian job seekers. At its core is AI-E — the Application Intelligence Engine — which reads job descriptions, tailors your resume, fills application forms, and generates cover letters. You click apply once. AI-E handles everything else."
        },
        {
            question: "Does this work on Naukri and Internshala?",
            answer: "Yes, AI-E works on Naukri, LinkedIn, Internshala, Foundit, Indeed, and company career pages."
        },
        {
            question: "Will this get my account banned on LinkedIn or Naukri?",
            answer: "No. Unlike bots that apply without your knowledge, AI-E fills forms and waits for your confirmation before submitting. You are always in control."
        },
        {
            question: "Is this cheating?",
            answer: "No. We never write fake experience or lie about your skills. AI-E makes sure your actual qualifications are presented in the format the hiring system rewards. That is not cheating — that is levelling the playing field."
        },
        {
            question: "Is my resume data safe?",
            answer: "Your data is stored securely on Supabase and never shared with third parties. You can delete your profile at any time."
        },
        {
            question: "Do I need to pay to start using LastMile?",
            answer: "No. The Free tier gives you access to the ATS Score Checker, basic Job Tracker, and 5 resume scans per month at no cost."
        },
        {
            question: "How does the Turbo pack work?",
            answer: "Turbo gives you everything in Pro plus priority processing on all applications, faster AI-E response times, and a dedicated onboarding session to set up your profile for maximum match scores."
        },
        {
            question: "Can I cancel or change my plan?",
            answer: "Yes. You can cancel or change your plan at any time from your dashboard settings. No lock-in, no hidden fees. Your data stays yours even after cancellation."
        }
    ]

    return (
        <section id="faq" className="py-20 bg-white border-b-2 border-black">
            <div className="container mx-auto px-4 md:px-8 max-w-3xl">
                <h2 className="text-4xl md:text-5xl font-black uppercase mb-12 text-center">
                    Frequently Asked <br /><span className="bg-primary px-2">Questions</span>
                </h2>

                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqs.map((faq, i) => (
                        <AccordionItem key={i} value={`item-${i}`} className="border-2 border-black shadow-neo bg-white px-4">
                            <AccordionTrigger className="text-xl font-bold hover:no-underline text-left">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-lg font-medium text-gray-600">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    )
}
