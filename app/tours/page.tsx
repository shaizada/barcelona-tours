import Navbar from "../components/Navbar";

const TOURS = [
  {
    id: "gaudi",
    title: "Гауди + Саграда Фамилия",
    desc: "Архитектура, история и лучшие фото-точки",
    price: 79,
    image: "/tours/gaudi.jpg",
  },
  {
    id: "beach",
    title: "Пляжи и набережная",
    desc: "Барселонета, море и закаты",
    price: 49,
    image: "/tours/beach.jpg",
  },
  {
    id: "gastro",
    title: "Гастро-тур: рынок Бокерия",
    desc: "Тапас, вино и каталонская кухня",
    price: 89,
    image: "/tours/gastro.jpg",
  },
  {
    id: "football",
    title: "Футбольный день: Barça Experience",
    desc: "Камп Ноу, музей и атмосфера матча",
    price: 99,
    image: "/tours/football.jpg",
  },
  {
    id: "night",
    title: "Ночная Барселона",
    desc: "Огни города, бары и прогулки",
    price: 59,
    image: "/tours/NOCH.jpg",
  },
  {
    id: "montjuic",
    title: "Монжуик и панорамы",
    desc: "Лучшие виды на город",
    price: 39,
    image: "/tours/MONZH.jpg",
  },
];

export default function ToursPage() {
  return (
    <>
      <Navbar />

      {/* BACKGROUND */}
      <div className="min-h-screen bg-gradient-to-br from-red-600 via-purple-700 to-blue-700">
        <div className="max-w-7xl mx-auto px-6 py-20">

          {/* GLASS CONTAINER */}
          <div className="rounded-3xl bg-white/70 backdrop-blur-xl shadow-xl p-12">

            {/* HEADER */}
            <header className="mb-14">
              <h1 className="text-5xl font-extrabold text-gray-900">
                Туры по Барселоне
              </h1>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl">
                Лучшие маршруты, гастро-туры и футбольные эмоции.
                Выбери путешествие под себя.
              </p>
            </header>

            {/* FILTERS */}
            <div className="flex flex-wrap gap-3 mb-14">
              {["🏛 Архитектура", "🏖 Пляжи", "🍷 Гастро", "⚽ Футбол"].map(
                (tag) => (
                  <button
                    key={tag}
                    className="px-5 py-2 rounded-full bg-white border border-gray-200 text-gray-800 hover:bg-gray-100 transition"
                  >
                    {tag}
                  </button>
                )
              )}
            </div>

            {/* TOURS GRID */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Популярные туры
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {TOURS.map((tour) => (
                  <div
                    key={tour.id}
                    className="rounded-2xl bg-white shadow-lg hover:shadow-2xl transition overflow-hidden"
                  >
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="h-56 w-full object-cover"
                    />

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900">
                        {tour.title}
                      </h3>

                      <p className="mt-2 text-gray-600">
                        {tour.desc}
                      </p>

                      <div className="mt-4 flex justify-between items-center">
                        <span className="px-4 py-1 rounded-full bg-gray-900 text-white text-sm">
                          от €{tour.price}
                        </span>

                        <a
                          href={`/tours/${tour.id}`}
                          className="text-sm font-semibold text-blue-600 hover:underline"
                        >
                          Подробнее →
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>
    </>
  );
}
