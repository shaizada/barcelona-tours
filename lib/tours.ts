export type Tour = {
  id: string;
  title: string;
  short: string;
  priceEUR: number;
  durationHours: number;
  tags: string[];
  highlights: string[];
};

export const tours: Tour[] = [
  {
    id: "gaudi",
    title: "Гауди + Саграда Фамилия",
    short: "Архитектура, легенды, лучшие фото-точки",
    priceEUR: 79,
    durationHours: 4,
    tags: ["architecture", "city"],
    highlights: ["Sagrada Família (снаружи)", "Пасео-де-Грасиа", "Casa Batlló (снаружи)"],
  },
  {
    id: "beach",
    title: "Пляжи и набережная",
    short: "Барселонета, закаты и атмосфера моря",
    priceEUR: 49,
    durationHours: 3,
    tags: ["beach", "relax"],
    highlights: ["Barceloneta", "Port Olímpic", "Лучшие места на закат"],
  },
  {
    id: "gastro",
    title: "Гастро-тур: тапас и рынок Бокерия",
    short: "Дегустации, локальные места и секретные бары",
    priceEUR: 89,
    durationHours: 4,
    tags: ["food", "local"],
    highlights: ["Mercat de la Boqueria", "Тапас-бары", "Десерт crema catalana"],
  },
  {
    id: "football",
    title: "Футбольный день: Barça Experience",
    short: "Атмосфера клуба + матч (демо)",
    priceEUR: 129,
    durationHours: 6,
    tags: ["football"],
    highlights: ["Camp Nou зона", "Музей (демо)", "Матч-билет (демо)"],
  },
];

export function getTour(id: string) {
  return tours.find(t => t.id === id) ?? null;
}
