import Navbar from "@/app/components/Navbar";
import { Badge } from "@/app/components/Badge";
import { getCurrentUser } from "@/lib/auth";
import { getTour } from "@/lib/tours";
import BookingForm from "./ui";

export default function TourDetails({ params }: { params: { id: string } }) {
  const user = getCurrentUser();
  const tour = getTour(params.id);

  if (!tour) {
    return (
      <div>
        <Navbar userName={user?.name} />
        <main className="mx-auto max-w-6xl px-4 py-10">
          <h1 className="text-2xl font-bold">Тур не найден</h1>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Navbar userName={user?.name} />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-700 text-white p-8 border border-white/10">
          <h1 className="text-3xl md:text-4xl font-extrabold">{tour.title}</h1>
          <p className="mt-3 opacity-90">{tour.short}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge>€{tour.priceEUR}</Badge>
            <Badge>{tour.durationHours}h</Badge>
            {tour.tags.map((x) => (
              <Badge key={x}>{x}</Badge>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white/90 dark:bg-slate-900/70 p-6">
            <h2 className="text-xl font-bold">Что включено</h2>
            <ul className="mt-3 list-disc pl-5 text-slate-700 dark:text-slate-200 space-y-2">
              {tour.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 p-4 text-sm text-slate-600 dark:text-slate-300">
              Это демо-бронирование. Оплаты нет — запись сохраняется в local JSON (data/).
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white/90 dark:bg-slate-900/70 p-6">
            <h2 className="text-xl font-bold">Бронирование</h2>
            <BookingForm tourId={tour.id} priceEUR={tour.priceEUR} />
          </div>
        </div>
      </main>
    </div>
  );
}
