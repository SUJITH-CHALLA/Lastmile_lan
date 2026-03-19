import { NextRequest, NextResponse } from "next/server"
import { Client, Account } from "node-appwrite"

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!)

const account = new Account(client)

export async function POST(request: NextRequest) {
    try {
        const { email, name } = await request.json()

        if (!email || !name) {
            return NextResponse.json(
                { success: false, message: "Email and name required" },
                { status: 400 }
            )
        }

        // Create email OTP token via Appwrite
        // userId = email (sanitized) as unique identifier
        const userId = email.replace(/[^a-zA-Z0-9]/g, "_").slice(0, 36)

        const token = await account.createEmailToken(
            userId,
            email,
            false // false = OTP mode (6 digit code), not magic link
        )

        return NextResponse.json({
            success: true,
            userId: token.userId,
            message: "OTP sent to your email"
        })

    } catch (error: unknown) {
        const err = error as { message?: string; code?: number }
        console.error("Send OTP Error:", err)
        return NextResponse.json(
            { success: false, message: err?.message || "Failed to send OTP" },
            { status: 500 }
        )
    }
}
