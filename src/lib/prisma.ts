import { PrismaClient } from "@prisma/client";

// HMR‑safe Prisma singleton for Next.js (works in Node and Edge runtimes)
// Store the client on the globalThis object so it persists across hot reloads.
// This prevents "Cannot redeclare block‑scoped variable 'prisma'" errors
// and works correctly when the code runs in Vercel's serverless environment.

declare global {
  // eslint‑disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma = (globalThis as any).prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  // Attach to globalThis in development for reuse across HMR.
  (globalThis as any).prisma = prisma;
}

export { prisma };
