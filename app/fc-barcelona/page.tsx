import Link from "next/link";

export default function FCBarcelonaPage() {
  return (
    <main className="min-h-screen px-6 py-12">
      {/* HERO */}
      <section className="glass max-w-5xl mx-auto p-10 mb-12">
        <h1 className="text-4xl font-extrabold mb-4">FC Barcelona</h1>
        <p className="text-lg text-gray-700">
          Мини-сайт клуба: история, легендарные игроки и покупка билетов на матчи.
        </p>
      </section>

      {/* НАПОЛНЕННЫЕ БЛОКИ */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* HISTORY */}
        <Link href="/fc-barcelona/history">
          <div className="glass p-8 hover-lift cursor-pointer">
            <h2 className="text-2xl font-bold mb-2">История клуба</h2>
            <p className="text-gray-600 mb-4">
              Основание в 1899 году, философия «Més que un club», главные трофеи.
            </p>
            <ul className="text-sm text-gray-700 list-disc pl-5">
              <li>Дата основания</li>
              <li>Эпохи и легенды</li>
              <li>Философия игры</li>
            </ul>
          </div>
        </Link>

        {/* PLAYERS */}
        <Link href="/fc-barcelona/players">
          <div className="glass p-8 hover-lift cursor-pointer">
            <h2 className="text-2xl font-bold mb-2">Игроки</h2>
            <p className="text-gray-600 mb-4">
              Актуальный состав и позиции футболистов.
            </p>
            <div className="flex gap-3 text-sm">
              <span className="badge">Нападающие</span>
              <span className="badge">Полузащита</span>
              <span className="badge">Вратари</span>
            </div>
          </div>
        </Link>

        {/* TICKETS */}
        <Link href="/fc-barcelona/tickets">
          <div className="glass p-8 hover-lift cursor-pointer">
            <h2 className="text-2xl font-bold mb-2">Билеты</h2>
            <p className="text-gray-600 mb-4">
              Демонстрация покупки билетов на домашние матчи.
            </p>
            <p className="font-semibold">Цены от €49</p>
          </div>
        </Link>

        {/* MATCHES */}
        <div className="glass p-8 opacity-70">
          <h2 className="text-2xl font-bold mb-2">Матчи</h2>
          <p className="text-gray-600">
            Календарь матчей (в разработке).
          </p>
        </div>
      </section>
    </main>
  );
}
