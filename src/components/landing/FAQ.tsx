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
            answer: "LastMile is the unfair advantage you've been looking for. It uses AI to tailor your resume, write your cover letters, and track your applications automatically. We help you skip the line and get hired."
        },
        {
            question: "Is this cheating?",
            answer: "No more than companies using ATS to filter you out is 'cheating'. We just level the playing field. You still have to do the interview and get the job; we just get you the interview."
        },
        {
            question: "How does the 'Turbo' pack work?",
            answer: "The Turbo pack gives you priority access to our most advanced automation agents. It's for power users who want to apply to 100+ jobs a week with high component personalization."
        },
        {
            question: "Can I cancel specific plans?",
            answer: "Yes. You can cancel anytime from your dashboard settings. No hidden fees, no bullshit."
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
