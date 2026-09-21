import { NextResponse } from "next/server";
import { getRegisteredEmails } from "@/lib/actions/email.actions";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const emails = await getRegisteredEmails();
    return NextResponse.json({ emails }, { status: 200 });
  } catch (error) {
    console.error("GET /api/registered-emails error:", error);
    return NextResponse.json(
      { message: "Failed to fetch registered emails", emails: [] },
      { status: 500 },
    );
  }
}
