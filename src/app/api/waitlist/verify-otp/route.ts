import { NextRequest, NextResponse } from "next/server"
import { Client, Account, Databases, Query, ID } from "node-appwrite"
import { Resend } from "resend"

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!)

const account = new Account(client)
const databases = new Databases(client)
const resend = new Resend(process.env.RESEND_API_KEY!)

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID!
const COLLECTION_ID = process.env.APPWRITE_WAITLIST_COLLECTION_ID!

export async function POST(request: NextRequest) {
    try {
        const { userId, otp, name, organisation, email } = await request.json()

        if (!userId || !otp || !email) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                { status: 400 }
            )
        }

        // Step 1: Verify OTP with Appwrite
        try {
            await account.createSession(userId, otp)
        } catch {
            return NextResponse.json(
                { success: false, message: "Invalid or expired OTP. Please try again." },
                { status: 401 }
            )
        }

        // Step 2: Check duplicate email
        const existing = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [Query.equal("email", email)]
        )

        if (existing.total > 0) {
            return NextResponse.json(
                { success: false, message: "Already on the waitlist!" },
                { status: 409 }
            )
        }

        // Step 3: Get position
        const allDocs = await databases.listDocuments(DATABASE_ID, COLLECTION_ID)
        const position = allDocs.total + 1

        // Step 4: Save to Appwrite
        await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            ID.unique(),
            {
                name,
                email,
                organisation: organisation || "",
                referredBy: ""
            }
        )

        // Step 5: Send welcome email
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "You're on the LastMile waitlist 🚀",
            html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;
        padding:32px;border:2px solid black">
          <h1 style="font-size:24px;font-weight:900;text-transform:uppercase">
            You're verified & on the list!
          </h1>
          <p style="font-size:16px">Hi ${name},</p>
          <p style="font-size:16px">
            You're <strong>#${position}</strong> on the LastMile waitlist.
          </p>
          <p style="font-size:14px;color:#666">
            LastMile is an AI-powered job application platform that 
            auto-fills applications, tailors your resume per job, 
            and tracks everything in one place.
          </p>
          <p style="font-size:14px;color:#666">
            We'll email you the moment your access is ready.
          </p>
          <div style="margin-top:32px;padding:16px;
          background:#F5C300;border:2px solid black">
            <strong>— The LastMile Team</strong>
          </div>
        </div>
      `
        })

        return NextResponse.json({
            success: true,
            position,
            message: "Email verified! You're on the waitlist."
        })

    } catch (error: unknown) {
        const err = error as { message?: string; code?: number }
        console.error("Verify OTP Error:", err)
        return NextResponse.json(
            { success: false, message: err?.message || "Verification failed" },
            { status: 500 }
        )
    }
}
