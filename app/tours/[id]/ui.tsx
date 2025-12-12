"use client";

import { useMemo, useState } from "react";

export default function BookingForm({ tourId, priceEUR }: { tourId: string; priceEUR: number }) {
  const [qty, setQty] = useState(2);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [status, setStatus] = useState<null | "ok" | "err">(null);
  const [msg, setMsg] = useState<string>("");

  const total = useMemo(() => Math.max(1, qty) * priceEUR, [qty, priceEUR]);

  const submit = async () => {
    setStatus(null);
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId: tourId, qty, date, totalEUR: total }),
    });
    const data = await res.json();
    if (!res.ok) {
      setStatus("err");
      setMsg(data?.error === "UNAUTH" ? "Нужно войти" : "Ошибка бронирования");
      return;
    }
    setStatus("ok");
    setMsg("Бронирование создано ✅ (смотри Профиль)");
  };

  return (
    <div className="mt-4 space-y-4">
      <div>
        <label className="text-sm font-medium">Дата</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 outline-none"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Кол-во людей</label>
        <input
          type="number"
          min={1}
          value={qty}
          onChange={(e) => setQty(parseInt(e.target.value || "1", 10))}
          className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 outline-none"
        />
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
        onClick={submit}
        className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white py-2.5 font-semibold transition"
      >
        Забронировать
      </button>
    </div>
  );
}
