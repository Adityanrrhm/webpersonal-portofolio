import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const months = ["jan","feb","mar","apr","may","jun",
                "jul","aug","sep","oct","nov","dec"];

function toYYYYMM(str: string | null): string | null {
  if (!str) return null;
  if (/^\d{4}-\d{2}$/.test(str)) return str;
  const idx = months.findIndex(m => str.toLowerCase().startsWith(m));
  if (idx === -1) return str;
  const y = str.match(/\d{4}/);
  if (!y) return str;
  return `${y[0]}-${String(idx + 1).padStart(2, "0")}`;
}

async function main() {
  const url = new URL(process.env.DATABASE_URL!);
  const adapter = new PrismaMariaDb({
    host: url.hostname,
    port: Number(url.port),
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    ssl: { rejectUnauthorized: false },
    connectTimeout: 15000,
    connectionLimit: 5,
  }, { database: url.pathname.replace(/^\//, "") });

  const prisma = new PrismaClient({ adapter });

  const items = await prisma.experiences.findMany({
    select: { id: true, period_start: true, period_end: true }
  });
  let updated = 0;
  for (const item of items) {
    const ps = toYYYYMM(item.period_start);
    const pe = toYYYYMM(item.period_end);
    if (ps !== item.period_start || pe !== item.period_end) {
      await prisma.experiences.update({
        where: { id: item.id },
        data: { period_start: ps, period_end: pe }
      });
      updated++;
    }
  }
  console.log(`Migrated ${updated} of ${items.length} experiences`);
  await prisma.$disconnect();
}

main().catch(err => { console.error(err); process.exit(1); });
