import Link from "next/link"
import { Button } from "@/components/ui/button"
import { JoinWaitlistDialog } from "@/components/ui/join-waitlist-dialog"

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 text-black px-4 bg-[url('/grid.svg')] bg-center relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/4 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-green-300/20 rounded-full blur-3xl"></div>

            <div className="max-w-md w-full text-center relative z-10 border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="text-8xl md:text-9xl font-black text-black mb-4 tracking-tighter mix-blend-multiply">404</div>

                <h1 className="text-2xl md:text-3xl font-black uppercase mb-4 bg-primary px-2 inline-block -rotate-2 shadow-neo-sm">
                    Dead End.
                </h1>

                <p className="text-gray-600 font-medium mb-8 text-base md:text-lg">
                    This page got filtered by the ATS. Or it never existed. Let's get you back to landing interviews.
                </p>

                <div className="flex flex-col gap-4">
                    <Link href="/">
                        <Button className="w-full h-14 text-lg border-2 border-black shadow-neo active:shadow-none bg-black text-white hover:bg-black/80 font-bold transition-all hover:-translate-x-1 hover:-translate-y-1">
                            Back to Homepage
                        </Button>
                    </Link>

                    <JoinWaitlistDialog>
                        <Button variant="outline" className="w-full h-14 text-lg border-2 border-black shadow-neo active:shadow-none bg-white font-bold transition-all hover:bg-gray-50 hover:-translate-x-1 hover:-translate-y-1">
                            Join Free Waitlist
                        </Button>
                    </JoinWaitlistDialog>
                </div>
            </div>

            <div className="absolute bottom-8 text-sm font-bold text-gray-500">
                LastMile AI-E Intelligence
            </div>
        </div>
    )
}
