import { NextResponse } from "next/server";
import { createUser } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as any;
  if (!body?.name || !body?.email || !body?.password) {
    return NextResponse.json({ ok: false, error: "INVALID" }, { status: 400 });
  }
  if (String(body.password).length < 6) {
    return NextResponse.json({ ok: false, error: "WEAK_PASSWORD" }, { status: 400 });
  }

  try {
    const user = createUser(String(body.name), String(body.email), String(body.password));
    return NextResponse.json({ ok: true, user });
  } catch (e: any) {
    if (e?.message === "EMAIL_TAKEN") {
      return NextResponse.json({ ok: false, error: "EMAIL_TAKEN" }, { status: 409 });
    }
    return NextResponse.json({ ok: false, error: "SERVER" }, { status: 500 });
  }
}
