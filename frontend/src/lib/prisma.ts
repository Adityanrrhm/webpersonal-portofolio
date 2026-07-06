import { PrismaClient } from "@/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

function createAdapter() {
  const url = new URL(process.env.DATABASE_URL!);

  const caCert = process.env.AIVEN_CA_CERT
    ? Buffer.from(process.env.AIVEN_CA_CERT, "base64").toString("utf-8")
    : undefined;

  return new PrismaMariaDb(
    {
      host: url.hostname,
      port: Number(url.port),
      user: decodeURIComponent(url.username),
      password: decodeURIComponent(url.password),
      ssl: caCert ? { ca: caCert } : { rejectUnauthorized: false },
      connectTimeout: 15000,
    },
    { database: url.pathname.replace(/^\//, "") },
  );
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter: createAdapter() });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
