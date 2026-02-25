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
            answer: "LastMile is the unfair advantage you've been looking for. At its core is AI-E — the Application Intelligence Engine. It reads job descriptions, rewrites your resume, fills application forms, and generates cover letters — all triggered by a single click from you. We help you skip the line and get hired."
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
            answer: "No more than companies using ATS to filter you out is 'cheating'. We just level the playing field. You still have to do the interview and get the job; we just get you the interview."
        },
        {
            question: "Is my resume data safe?",
            answer: "Your data is stored securely on Supabase and never shared with third parties. You can delete your profile at any time."
        },
        {
            question: "Do I need to pay to start using LastMile?",
            answer: "No. The Free tier gives you access to the ATS Score Checker, basic Job Tracker, and 5 resume scans per month at no cost."
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
