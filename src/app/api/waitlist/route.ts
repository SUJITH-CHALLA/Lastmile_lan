import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { name, organization, email } = body

        if (!name || !organization || !email) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 })
        }

        const csvLine = `"${name}","${organization}","${email}","${new Date().toISOString()}"\n`
        const filePath = path.join(process.cwd(), "waitlist.csv")

        // Add header if file doesn't exist
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, "Name,Organization,Email,Date\n")
        }

        fs.appendFileSync(filePath, csvLine)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Waitlist API Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
