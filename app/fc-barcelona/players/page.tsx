const players = [
  { number: 9, name: "Lewandowski", position: "Нападающий" },
  { number: 8, name: "Pedri", position: "Атакующий Полузащитник" },
  { number: 6, name: "Gavi", position: "Полузащитник" },
  { number: 1, name: "Ter Stegen", position: "Вратарь" },
];

export default function PlayersPage() {
  return (
    <main className="min-h-screen px-6 py-12 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Игроки FC Barcelona</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {players.map(p => (
          <div key={p.number} className="glass p-6 text-center hover-lift">
            <div className="text-4xl font-extrabold text-blue-600 mb-2">
              #{p.number}
            </div>
            <h3 className="font-bold">{p.name}</h3>
            <p className="text-sm text-gray-600">{p.position}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
