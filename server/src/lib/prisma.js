import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // In development, reuse the client to avoid too many connections
  if (!globalThis.__prisma) {
    globalThis.__prisma = new PrismaClient();
  }
  prisma = globalThis.__prisma;
}

export default prisma;
