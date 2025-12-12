"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data?.error === "EMAIL_TAKEN") setError("Этот email уже зарегистрирован");
        else if (data?.error === "WEAK_PASSWORD") setError("Пароль должен быть минимум 6 символов");
        else setError("Ошибка регистрации");
        return;
      }
      // auto-login
      const login = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (login.ok) {
        router.push("/");
        router.refresh();
      } else {
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 to-red-800 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white/95 dark:bg-slate-900/90 border border-white/20 shadow-2xl p-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white text-center">Регистрация</h1>
        <p className="text-center text-sm text-slate-600 dark:text-slate-300 mt-2">
          Создай аккаунт, чтобы бронировать туры и билеты.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Имя</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Bakтияр"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="example@mail.com"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Пароль</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="минимум 6 символов"
              required
            />
          </div>

          {error ? (
            <div className="rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 px-4 py-3 text-sm text-red-700 dark:text-red-200">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 font-semibold transition disabled:opacity-60"
          >
            {loading ? "Создаём..." : "Создать аккаунт"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-600 dark:text-slate-300 mt-6">
          Уже есть аккаунт?{" "}
          <a className="text-blue-700 dark:text-blue-300 font-semibold hover:underline" href="/login">
            Войти
          </a>
        </p>
      </div>
    </div>
  );
}
