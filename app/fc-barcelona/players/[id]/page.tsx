import Navbar from "@/app/components/Navbar";
import { Badge } from "@/app/components/Badge";
import { getPlayer } from "@/lib/fcb";
import { getCurrentUser } from "@/lib/auth";

const posLabel: Record<string, string> = { GK: "Вратарь", DF: "Защитник", MF: "Полузащитник", FW: "Нападающий" };

export default function PlayerPage({ params }: { params: { id: string } }) {
  const user = getCurrentUser();
  const p = getPlayer(params.id);

  if (!p) {
    return (
      <div>
        <Navbar userName={user?.name} />
        <main className="mx-auto max-w-6xl px-4 py-10">
          <h1 className="text-2xl font-bold">Игрок не найден</h1>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Navbar userName={user?.name} />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="rounded-3xl bg-gradient-to-br from-blue-950 to-red-800 text-white p-8 border border-white/10">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-3xl font-extrabold">{p.name}</h1>
            <Badge>#{p.number}</Badge>
          </div>
          <p className="mt-2 opacity-90">{posLabel[p.position]} • {p.country}</p>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white/90 dark:bg-slate-900/70 p-6">
          <h2 className="text-xl font-bold">Описание</h2>
          <p className="mt-3 text-slate-700 dark:text-slate-200">{p.bio}</p>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
            Можно добавить: статистику, достижения, фото, любимую позицию, годы в клубе.
          </p>
        </div>
      </main>
    </div>
  );
}
