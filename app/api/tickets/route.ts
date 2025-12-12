import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { readJson, writeJson, getPaths } from "@/lib/db";

type Ticket = {
  id: string;
  userId: string;
  matchId: string;
  category: "Standard" | "Premium" | "VIP";
  qty: number;
  totalEUR: number;
  createdAt: string;
};

export async function POST(request: Request) {
  const user = getCurrentUser();
  if (!user) return NextResponse.json({ ok: false, error: "UNAUTH" }, { status: 401 });

  const body = await request.json().catch(() => null) as any;
  if (!body?.matchId || !body?.category || !body?.qty || !body?.totalEUR) {
    return NextResponse.json({ ok: false, error: "INVALID" }, { status: 400 });
  }

  const { ticketsPath } = getPaths();
  const tickets = readJson<Ticket[]>(ticketsPath);
  const ticket: Ticket = {
    id: crypto.randomUUID(),
    userId: user.id,
    matchId: String(body.matchId),
    category: body.category,
    qty: Number(body.qty),
    totalEUR: Number(body.totalEUR),
    createdAt: new Date().toISOString(),
  };
  tickets.push(ticket);
  writeJson(ticketsPath, tickets);
  return NextResponse.json({ ok: true, ticket });
}

export async function GET() {
  const user = getCurrentUser();
  if (!user) return NextResponse.json({ ok: false, error: "UNAUTH" }, { status: 401 });

  const { ticketsPath } = getPaths();
  const tickets = readJson<Ticket[]>(ticketsPath).filter(t => t.userId === user.id);
  return NextResponse.json({ ok: true, tickets });
}
