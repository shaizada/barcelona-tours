import crypto from "crypto";
import { cookies } from "next/headers";
import { readJson, writeJson, getPaths } from "./db";

export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  salt: string;
  createdAt: string;
};

type Session = { userId: string; token: string; createdAt: string };
type StoredSession = Session;

const SESSION_COOKIE = "bt_session";
const sessions = new Map<string, StoredSession>(); // in-memory sessions (dev-friendly)

function hashPassword(password: string, salt: string) {
  return crypto.pbkdf2Sync(password, salt, 120_000, 32, "sha256").toString("hex");
}

export function createUser(name: string, email: string, password: string) {
  const { usersPath } = getPaths();
  const users = readJson<User[]>(usersPath);
  const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) throw new Error("EMAIL_TAKEN");

  const id = crypto.randomUUID();
  const salt = crypto.randomBytes(16).toString("hex");
  const passwordHash = hashPassword(password, salt);
  const user: User = { id, name, email, passwordHash, salt, createdAt: new Date().toISOString() };
  users.push(user);
  writeJson(usersPath, users);
  return { id, name, email };
}

export function verifyUser(email: string, password: string) {
  const { usersPath } = getPaths();
  const users = readJson<User[]>(usersPath);
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return null;
  const ph = hashPassword(password, user.salt);
  if (ph !== user.passwordHash) return null;
  return { id: user.id, name: user.name, email: user.email };
}

export function createSession(userId: string) {
  const token = crypto.randomBytes(24).toString("hex");
  const session: StoredSession = { userId, token, createdAt: new Date().toISOString() };
  sessions.set(token, session);
  return token;
}

export function setSessionCookie(token: string) {
  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
}

export function clearSessionCookie() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (token) sessions.delete(token);
  cookies().set(SESSION_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
}

export function getCurrentUser() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const sess = sessions.get(token);
  if (!sess) return null;

  const { usersPath } = getPaths();
  const users = readJson<User[]>(usersPath);
  const user = users.find(u => u.id === sess.userId);
  if (!user) return null;
  return { id: user.id, name: user.name, email: user.email };
}
