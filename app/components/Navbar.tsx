"use client";

import Link from "next/link";
import { useApp } from "@/app/providers";

export default function Navbar() {
  const { user, setUser } = useApp();

  const logout = () => {
    localStorage.removeItem("barcelona_profile_v1");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <header className="mb-10">
      <div className="flex items-center justify-between px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-900 to-red-800 text-white shadow-lg">
        <Link href="/" className="font-bold text-xl">
          BarcelonaTours
        </Link>

        <nav className="flex gap-6">
          <Link href="/tours" className="hover:underline">Туры</Link>
          <Link href="/fc-barcelona" className="hover:underline">FC Barcelona</Link>
          <Link href="/profile" className="hover:underline">Профиль</Link>
        </nav>

        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link href="/login" className="hover:underline">Вход</Link>
              <Link href="/register" className="hover:underline">Регистрация</Link>
            </>
          ) : (
            <>
              <span className="text-sm">👤 {user.name}</span>
              <button
                onClick={logout}
                className="px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 transition"
              >
                Выйти
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
