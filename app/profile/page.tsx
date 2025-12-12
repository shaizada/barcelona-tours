"use client";

import { useEffect, useMemo, useState } from "react";

type TourBooking = {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  people: number;
};

type TicketCategory = "Standard" | "VIP" | "Ultra";

type TicketBooking = {
  id: string;
  match: string;
  category: TicketCategory;
  qty: number;
  total: number;
  createdAt: string; // ISO
};

type ProfileData = {
  name: string;
  email: string;
  tours: TourBooking[];
  tickets: TicketBooking[];
};

const STORAGE_KEY = "barcelona_profile_v1";

const demoToursCatalog: Array<{ title: string; date: string }> = [
  { title: "Гауди + Саграда Фамилия", date: "2025-01-10" },
  { title: "Пляжи и набережная Барселонеты", date: "2025-01-12" },
  { title: "Гастро-тур: тапас и рынок Бокерия", date: "2025-01-15" },
  { title: "Монжуик и панорамы", date: "2025-01-18" },
  { title: "Футбольный день: Barça Experience", date: "2025-01-20" },
];

const matches: string[] = [
  "FC Barcelona vs Real Madrid — La Liga",
  "FC Barcelona vs Atlético — La Liga",
  "FC Barcelona vs Sevilla — La Liga",
  "FC Barcelona vs PSG — UCL",
];

const prices: Record<TicketCategory, number> = {
  Standard: 120,
  VIP: 240,
  Ultra: 390,
};

function uid() {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export default function ProfilePage() {
  // ---- state
  const [name, setName] = useState("Barcelona Fan");
  const [email, setEmail] = useState("fan@barcelona.com");
  const [tours, setTours] = useState<TourBooking[]>([]);
  const [tickets, setTickets] = useState<TicketBooking[]>([]);

  // UI state
  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  // Tour form
  const [tourTitle, setTourTitle] = useState(demoToursCatalog[0].title);
  const [tourDate, setTourDate] = useState(demoToursCatalog[0].date);
  const [tourPeople, setTourPeople] = useState<number>(2);

  // Ticket form
  const [match, setMatch] = useState(matches[0]);
  const [category, setCategory] = useState<TicketCategory>("Standard");
  const [qty, setQty] = useState<number>(2);

  const ticketTotal = useMemo(
    () => prices[category] * Math.max(1, qty),
    [category, qty]
  );

  // ---- load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as ProfileData;

      if (typeof parsed?.name === "string") setName(parsed.name);
      if (typeof parsed?.email === "string") setEmail(parsed.email);
      if (Array.isArray(parsed?.tours)) setTours(parsed.tours);
      if (Array.isArray(parsed?.tickets)) setTickets(parsed.tickets);
    } catch {
      // ignore broken storage
    }
  }, []);

  // ---- save helper
  const persist = (next?: Partial<ProfileData>) => {
    const data: ProfileData = {
      name,
      email,
      tours,
      tickets,
      ...next,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const showSaved = (text: string) => {
    setSavedMsg(text);
    window.setTimeout(() => setSavedMsg(null), 1400);
  };

  // ---- actions
  const saveProfile = () => {
    persist({ name, email });
    showSaved("✅ Профиль сохранён");
  };

  const addTour = () => {
    const safePeople = Math.max(1, Number(tourPeople) || 1);
    const item: TourBooking = {
      id: uid(),
      title: tourTitle.trim() || "Тур",
      date: tourDate || new Date().toISOString().slice(0, 10),
      people: safePeople,
    };
    const next = [item, ...tours];
    setTours(next);
    persist({ tours: next });
    showSaved("✅ Тур добавлен");
  };

  const removeTour = (id: string) => {
    const next = tours.filter((t) => t.id !== id);
    setTours(next);
    persist({ tours: next });
  };

  const addTicket = () => {
    const safeQty = Math.max(1, Number(qty) || 1);
    const item: TicketBooking = {
      id: uid(),
      match,
      category,
      qty: safeQty,
      total: prices[category] * safeQty,
      createdAt: new Date().toISOString(),
    };
    const next = [item, ...tickets];
    setTickets(next);
    persist({ tickets: next });
    showSaved("✅ Билет куплен");
  };

  const removeTicket = (id: string) => {
    const next = tickets.filter((t) => t.id !== id);
    setTickets(next);
    persist({ tickets: next });
  };

  const clearAll = () => {
    setTours([]);
    setTickets([]);
    persist({ tours: [], tickets: [] });
    showSaved("🧹 Очищено");
  };

  return (
    <main className="px-8 max-w-6xl mx-auto pb-16">
      {/* HEADER */}
      <section className="glass p-10 mb-10">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <h1 className="text-3xl font-extrabold mb-2">👤 Профиль</h1>
            <p className="text-gray-700">
              Редактирование данных + бронирования туров + билеты на матчи (demo)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={clearAll}
              className="px-4 py-2 rounded-xl bg-white/60 hover:bg-white transition border"
              title="Очистить бронирования и билеты"
            >
              Очистить
            </button>

            {savedMsg && (
              <span className="px-4 py-2 rounded-xl bg-green-100 text-green-800 border border-green-200">
                {savedMsg}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* PROFILE EDIT */}
      <section className="glass p-8 mb-10">
        <h2 className="text-xl font-bold mb-6">Редактирование профиля</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-700">Имя</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 px-4 py-2 rounded-xl border bg-white/80"
              placeholder="Ваше имя"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 rounded-xl border bg-white/80"
              placeholder="example@mail.com"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={saveProfile}
            className="px-6 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition font-semibold"
          >
            Сохранить
          </button>

          <span className="text-sm text-gray-600">
            (После перезагрузки данные останутся)
          </span>
        </div>
      </section>

      {/* FORMS + LISTS */}
      <section className="grid md:grid-cols-2 gap-8">
        {/* TOURS */}
        <div className="glass p-8">
          <h2 className="text-2xl font-extrabold mb-6">🧳 Бронирование туров</h2>

          {/* add form */}
          <div className="rounded-2xl border bg-white/70 p-4 mb-6">
            <div className="grid gap-4">
              <div>
                <label className="text-sm text-gray-700">Тур</label>
                <select
                  value={tourTitle}
                  onChange={(e) => {
                    const value = e.target.value;
                    setTourTitle(value);
                    const found = demoToursCatalog.find((x) => x.title === value);
                    if (found) setTourDate(found.date);
                  }}
                  className="w-full mt-1 px-4 py-3 rounded-xl border bg-white"
                >
                  {demoToursCatalog.map((t) => (
                    <option key={t.title} value={t.title}>
                      {t.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-700">Дата</label>
                  <input
                    type="date"
                    value={tourDate}
                    onChange={(e) => setTourDate(e.target.value)}
                    className="w-full mt-1 px-4 py-3 rounded-xl border bg-white"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-700">Людей</label>
                  <input
                    type="number"
                    min={1}
                    value={tourPeople}
                    onChange={(e) => setTourPeople(Number(e.target.value))}
                    className="w-full mt-1 px-4 py-3 rounded-xl border bg-white"
                  />
                </div>
              </div>

              <button
                onClick={addTour}
                className="px-4 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700 font-extrabold transition"
              >
                + Добавить тур
              </button>
            </div>
          </div>

          {/* list */}
          {tours.length === 0 ? (
            <p className="text-gray-600">Пока нет бронирований</p>
          ) : (
            <ul className="space-y-4">
              {tours.map((t) => (
                <li
                  key={t.id}
                  className="p-4 rounded-2xl bg-white shadow flex items-start justify-between gap-4"
                >
                  <div>
                    <p className="font-semibold">{t.title}</p>
                    <p className="text-sm text-gray-600">
                      📅 {t.date} · 👥 {t.people}
                    </p>
                  </div>
                  <button
                    onClick={() => removeTour(t.id)}
                    className="px-3 py-1 rounded-lg bg-black/5 hover:bg-black/10 text-sm"
                    title="Удалить"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* TICKETS (BEAUTIFUL BUY UI) */}
        <div className="glass p-8">
          <h2 className="text-2xl font-extrabold mb-6">🎟 Купить билет</h2>

          {/* Match */}
          <div className="mb-6">
            <label className="text-sm text-gray-700">Матч</label>
            <select
              value={match}
              onChange={(e) => setMatch(e.target.value)}
              className="w-full mt-1 px-4 py-3 rounded-xl border bg-white"
            >
              {matches.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Category cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {(["Standard", "VIP", "Ultra"] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`rounded-2xl p-5 text-left transition-all border ${
                  category === cat
                    ? "bg-gradient-to-br from-red-600 to-blue-600 text-white scale-[1.02]"
                    : "bg-white hover:shadow-lg"
                }`}
              >
                <h3 className="text-lg font-extrabold">{cat}</h3>
                <p className="text-sm opacity-80">€{prices[cat]} / билет</p>
              </button>
            ))}
          </div>

          {/* Quantity */}
          <div className="flex items-center justify-between mb-6">
            <span className="font-medium">Количество</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 text-xl font-bold"
              >
                −
              </button>
              <span className="text-lg font-extrabold">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 text-xl font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between text-lg mb-6">
            <span>Итого:</span>
            <strong className="text-2xl">€{ticketTotal}</strong>
          </div>

          {/* Buy */}
          <button
            onClick={addTicket}
            className="w-full py-4 rounded-2xl bg-red-600 text-white text-lg font-extrabold hover:bg-red-700 transition"
          >
            Купить билет
          </button>

          {/* Tickets list */}
          <div className="mt-8">
            <h3 className="font-bold mb-3">Мои билеты</h3>

            {tickets.length === 0 ? (
              <p className="text-gray-600">Пока нет билетов</p>
            ) : (
              <ul className="space-y-4">
                {tickets.map((t) => (
                  <li
                    key={t.id}
                    className="p-4 rounded-2xl bg-white shadow flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold">{t.match}</p>
                      <p className="text-sm text-gray-600">
                        🎟 {t.category} · x{t.qty} · <strong>€{t.total}</strong>
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(t.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => removeTicket(t.id)}
                      className="px-3 py-1 rounded-lg bg-black/10 hover:bg-black/20"
                      title="Удалить"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
