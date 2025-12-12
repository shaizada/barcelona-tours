import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { readJson, writeJson, getPaths } from "@/lib/db";

type Booking = {
  id: string;
  userId: string;
  type: "tour";
  itemId: string;
  qty: number;
  date: string;
  totalEUR: number;
  createdAt: string;
};

export async function POST(request: Request) {
  const user = getCurrentUser();
  if (!user) return NextResponse.json({ ok: false, error: "UNAUTH" }, { status: 401 });

  const body = await request.json().catch(() => null) as any;
  if (!body?.itemId || !body?.qty || !body?.date || !body?.totalEUR) {
    return NextResponse.json({ ok: false, error: "INVALID" }, { status: 400 });
  }

  const { bookingsPath } = getPaths();
  const bookings = readJson<Booking[]>(bookingsPath);
  const booking: Booking = {
    id: crypto.randomUUID(),
    userId: user.id,
    type: "tour",
    itemId: String(body.itemId),
    qty: Number(body.qty),
    date: String(body.date),
    totalEUR: Number(body.totalEUR),
    createdAt: new Date().toISOString(),
  };
  bookings.push(booking);
  writeJson(bookingsPath, bookings);
  return NextResponse.json({ ok: true, booking });
}

export async function GET() {
  const user = getCurrentUser();
  if (!user) return NextResponse.json({ ok: false, error: "UNAUTH" }, { status: 401 });

  const { bookingsPath } = getPaths();
  const bookings = readJson<Booking[]>(bookingsPath).filter(b => b.userId === user.id);
  return NextResponse.json({ ok: true, bookings });
}
