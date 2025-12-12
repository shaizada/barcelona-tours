export type Player = {
  id: string;
  name: string;
  position: "GK" | "DF" | "MF" | "FW";
  number: number;
  country: string;
  bio: string;
};

export const players: Player[] = [
  { id: "p1", name: "Marc-André ter Stegen", position: "GK", number: 1, country: "Germany", bio: "Вратарь. Надёжность и отличная игра ногами." },
  { id: "p2", name: "Ronald Araújo", position: "DF", number: 4, country: "Uruguay", bio: "Центрбек. Сила, скорость, лидерство." },
  { id: "p3", name: "Pedri", position: "MF", number: 8, country: "Spain", bio: "Полузащитник. Интеллект, пас, контроль темпа." },
  { id: "p4", name: "Robert Lewandowski", position: "FW", number: 9, country: "Poland", bio: "Форвард. Опыт, голевое чутьё, завершение." },
];

export type Match = {
  id: string;
  opponent: string;
  date: string; // ISO
  stadium: string;
  competition: string;
  priceFromEUR: number;
};

export const matches: Match[] = [
  { id: "m1", opponent: "Real Madrid", date: "2026-01-18T18:00:00.000Z", stadium: "Camp Nou", competition: "La Liga", priceFromEUR: 120 },
  { id: "m2", opponent: "Atlético Madrid", date: "2026-02-08T18:00:00.000Z", stadium: "Camp Nou", competition: "La Liga", priceFromEUR: 95 },
  { id: "m3", opponent: "Sevilla", date: "2026-03-01T18:00:00.000Z", stadium: "Camp Nou", competition: "La Liga", priceFromEUR: 70 },
];

export function getPlayer(id: string) {
  return players.find(p => p.id === id) ?? null;
}
export function getMatch(id: string) {
  return matches.find(m => m.id === id) ?? null;
}
