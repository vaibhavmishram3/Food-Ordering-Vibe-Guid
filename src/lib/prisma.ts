import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

// DATABASE_URL env var (production override) or default to root dev.db
const dbUrl =
  process.env.DATABASE_URL ??
  `file:${path.resolve(process.cwd(), "dev.db")}`;

const createPrismaClient = () => {
  const adapter = new PrismaBetterSqlite3({ url: dbUrl });
  return new PrismaClient({ adapter });
};

// HMR-safe singleton: reuse the client across Next.js hot reloads in dev
const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
