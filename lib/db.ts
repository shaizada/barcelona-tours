import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
const usersPath = path.join(dataDir, "users.json");
const bookingsPath = path.join(dataDir, "bookings.json");
const ticketsPath = path.join(dataDir, "tickets.json");

function ensureFile(p: string) {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(p)) fs.writeFileSync(p, "[]", "utf-8");
}

export function readJson<T>(p: string): T {
  ensureFile(p);
  return JSON.parse(fs.readFileSync(p, "utf-8")) as T;
}

export function writeJson<T>(p: string, data: T) {
  ensureFile(p);
  fs.writeFileSync(p, JSON.stringify(data, null, 2), "utf-8");
}

export function getPaths() {
  return { usersPath, bookingsPath, ticketsPath };
}
