import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const url = new URL(request.url);
  const lang = url.searchParams.get("lang") || "ru";
  cookies().set("bt_lang", lang, { path: "/", sameSite: "lax" });
  return NextResponse.json({ ok: true, lang });
}
