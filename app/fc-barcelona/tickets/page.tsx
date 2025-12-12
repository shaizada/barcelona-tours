"use client";

import Navbar from "@/app/components/Navbar";
import { matches } from "@/lib/fcb";
import { useMemo, useState } from "react";

const multipliers: Record<string, number> = { Standard: 1.0, Premium: 1.6, VIP: 2.4 };

export default function TicketsPage() {
  const [matchId, setMatchId] = useState(matches[0]?.id ?? "");
  const [category, setCategory] = useState<"Standard" | "Premium" | "VIP">("Standard");
  const [qty, setQty] = useState(2);
  const [status, setStatus] = useState<null | "ok" | "err">(null);
  const [msg, setMsg] = useState("");

  const match = useMemo(() => matches.find(m => m.id === matchId), [matchId]);
  const total = useMemo(() => {
    const base = match?.priceFromEUR ?? 0;
    return Math.round(base * multipliers[category] * Math.max(1, qty));
  }, [match, category, qty]);

  const buy = async () => {
    setStatus(null);
    const res = await fetch("/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ matchId, category, qty, totalEUR: total }),
    });
    const data = await res.json();
    if (!res.ok) {
      setStatus("err");
      setMsg(data?.error === "UNAUTH" ? "Нужно войти" : "Ошибка покупки");
      return;
    }
    setStatus("ok");
    setMsg("Билет(ы) куплены ✅ (демо). Смотри Профиль.");
  };

  return (
    <div>
      <Navbar userName={null} />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-extrabold">Покупка билетов (демо)</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Выбери матч, категорию и количество. Запись сохраняется в data/tickets.json.
        </p>

        <div className="mt-6 rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white/90 dark:bg-slate-900/70 p-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Матч</label>
            <select
              value={matchId}
              onChange={(e) => setMatchId(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 outline-none"
            >
              {matches.map((m) => (
                <option key={m.id} value={m.id}>
                  vs {m.opponent} — {m.competition}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Категория</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 outline-none"
              >
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
                <option value="VIP">VIP</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Количество</label>
              <input
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(parseInt(e.target.value || "1", 10))}
                className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 outline-none"
              />
            </div>
          </div>

          <div className="text-sm text-slate-600 dark:text-slate-300">
            Итого: <span className="font-bold text-slate-900 dark:text-white">€{total}</span>
          </div>

          {status ? (
            <div className={
              "rounded-xl px-4 py-3 text-sm border " +
              (status === "ok"
                ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-200"
                : "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900 text-red-800 dark:text-red-200")
            }>
              {msg}
            </div>
          ) : null}

          <button
            onClick={buy}
            className="w-full rounded-xl bg-red-600 hover:bg-red-700 text-white py-2.5 font-semibold transition"
          >
            Купить билет
          </button>
        </div>
      </main>
    </div>
  );
}
