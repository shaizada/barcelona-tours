export default function HistoryPage() {
  return (
    <main className="min-h-screen px-6 py-12 max-w-4xl mx-auto">
      <div className="glass p-10">
        <h1 className="text-3xl font-bold mb-4">История FC Barcelona</h1>
        <p className="text-gray-700 mb-4">
          История ФК «Барселона»

Футбольный клуб «Барселона» (FC Barcelona) был основан 29 ноября 1899 года в Барселоне швейцарцем Жоаном (Хансом) Гампером. С первых лет клуб стал символом не только футбола, но и каталонской идентичности, что отражено в девизе «Més que un club» — «Больше, чем клуб».
        </p>

        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>Основание — 1899</li>
          <li>Стадион — Camp Nou</li>
          <li>Философия — контроль мяча</li>
          <li>Девиз — Més que un club</li>
        </ul>
      </div>
    </main>
  );
}
