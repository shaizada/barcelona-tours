"use client";

import { createContext, useContext, useEffect, useState } from "react";

type User = {
  name: string;
  email: string;
};

type AppContextType = {
  user: User | null;
  setUser: (u: User | null) => void;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // читаем пользователя из localStorage
  useEffect(() => {
    const raw = localStorage.getItem("barcelona_user");
    if (raw) setUser(JSON.parse(raw));
  }, []);

  // сохраняем пользователя
  useEffect(() => {
    if (user) {
      localStorage.setItem("barcelona_user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProviders");
  return ctx;
}
