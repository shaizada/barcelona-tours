import { NextResponse } from "next/server";
import { createSession, setSessionCookie, verifyUser } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as any;
  if (!body?.email || !body?.password) {
    return NextResponse.json({ ok: false, error: "INVALID" }, { status: 400 });
  }

  const user = verifyUser(String(body.email), String(body.password));
  if (!user) return NextResponse.json({ ok: false, error: "BAD_CREDENTIALS" }, { status: 401 });

  const token = createSession(user.id);
  setSessionCookie(token);
  return NextResponse.json({ ok: true, user });
}
