import Navbar from "@/app/components/Navbar";
import { Card } from "@/app/components/Card";
import { Badge } from "@/app/components/Badge";
import { matches } from "@/lib/fcb";
import { getCurrentUser } from "@/lib/auth";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("ru-RU", { dateStyle: "medium", timeStyle: "short" });
}

export default function MatchesPage() {
  const user = getCurrentUser();

  return (
    <div>
      <Navbar userName={user?.name} />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-extrabold">Матчи (демо)</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Список матчей с кнопкой перехода к покупке билетов.</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {matches.map((m) => (
            <Card
              key={m.id}
              title={`vs ${m.opponent}`}
              subtitle={`${formatDate(m.date)} • ${m.competition} • ${m.stadium}`}
              href="/fc-barcelona/tickets"
              right={<Badge>от €{m.priceFromEUR}</Badge>}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
