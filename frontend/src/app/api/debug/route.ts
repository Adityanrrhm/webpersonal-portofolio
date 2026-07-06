import { PrismaClient } from "@/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

export async function GET() {
  try {
    const raw = process.env.DATABASE_URL || "NOT_SET";
    const url = new URL(raw);

    const adapter = new PrismaMariaDb(
      {
        host: url.hostname,
        port: Number(url.port),
        user: decodeURIComponent(url.username),
        password: decodeURIComponent(url.password),
        ssl: { rejectUnauthorized: false },
        connectTimeout: 5000,
      },
      { database: url.pathname.replace(/^\//, "") },
    );

    const prisma = new PrismaClient({ adapter });
    await prisma.$connect();
    const tables = await prisma.$queryRawUnsafe(
      "SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = ?",
      url.pathname.replace(/^\//, ""),
    );

    return Response.json({ success: true, tables });
  } catch (e) {
    return Response.json(
      { success: false, error: String(e), message: (e as Error).message },
      { status: 500 },
    );
  }
}
