import Navbar from "./components/Navbar";
import TourCard from "./components/TourCard";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* 1️⃣ HERO */}
        <section className="relative h-[520px] rounded-[48px] overflow-hidden mb-24">
          <img
            src="/images/4K.jpg"
            className="absolute inset-0 w-full h-full object-cover"
            alt="Barcelona"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/40 to-transparent" />
          <div className="relative z-10 h-full flex items-end p-12 text-white">
            <div>
              <h1 className="text-6xl font-extrabold">Barcelona Tours</h1>
              <p className="mt-4 text-lg max-w-xl">
                Город, футбол и эмоции. Открой Барселону по-настоящему.
              </p>
            </div>
          </div>
        </section>

        {/* 2️⃣ КАРТОЧКИ (ТУРЫ / FC / ПРОФИЛЬ) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          {[
            ["🧭", "Туры по городу", "Маршруты и гид"],
            ["⚽", "FC Barcelona", "Матчи и билеты"],
            ["🎟", "Профиль", "Бронирования"],
          ].map(([icon, title, text]) => (
            <div
              key={title}
              className="bg-white/80 backdrop-blur rounded-3xl p-6 shadow-lg"
            >
              <div className="text-3xl mb-3">{icon}</div>
              <h3 className="font-bold text-lg">{title}</h3>
              <p className="text-gray-600">{text}</p>
            </div>
          ))}
        </section>

        {/* 3️⃣ 👉 СЕКЦИЯ ТУРОВ — ВСТАВЛЯТЬ ИМЕННО СЮДА 👈 */}
        <section className="mb-32">
          <h2 className="text-4xl font-extrabold mb-10">
            Популярные маршруты
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TourCard
              id="gaudi"
              title="Гауди и Саграда Фамилия"
              price={79}
              image="/images/tours/gastro.jpg"
            />

            <TourCard
              id="beach"
              title="Пляжи и закаты"
              price={49}
              image="/images/tours/beach.jpg"
            />

            <TourCard
              id="football"
              title="FC Barcelona & Camp Nou"
              price={99}
              image="/images/tours/football.jpg"
            />
          </div>
        </section>

      </main>
    </>
  );
}
