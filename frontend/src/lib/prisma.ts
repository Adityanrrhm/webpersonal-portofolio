import { PrismaClient } from "@/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import fs from "fs";
import path from "path";

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined;
}

function getCaCert(): string | undefined {
  // Prioritas 1: AIVEN_CA_CERT sebagai Base64 (untuk production/deployment)
  if (process.env.AIVEN_CA_CERT_BASE64) {
    return Buffer.from(process.env.AIVEN_CA_CERT_BASE64, "base64").toString("utf-8");
  }

  // Prioritas 2: AIVEN_CA_CERT sebagai raw PEM string (untuk local dev di .env)
  if (process.env.AIVEN_CA_CERT) {
    const cert = process.env.AIVEN_CA_CERT.trim();
    // Validasi bahwa ini adalah PEM yang valid
    if (cert.startsWith("-----BEGIN CERTIFICATE-----")) {
      return cert;
    }
    // Jika tidak dimulai dengan PEM header, coba decode sebagai Base64
    try {
      const decoded = Buffer.from(cert, "base64").toString("utf-8");
      if (decoded.startsWith("-----BEGIN CERTIFICATE-----")) {
        return decoded;
      }
    } catch {
      // bukan base64 valid
    }
  }

  // Prioritas 3: File ca.pem lokal (untuk local dev)
  const localCaPath = path.join(process.cwd(), "prisma", "certs", "ca.pem");
  if (fs.existsSync(localCaPath)) {
    return fs.readFileSync(localCaPath, "utf-8");
  }

  return undefined;
}

function createClient() {
  const url = new URL(process.env.DATABASE_URL!);
  const caCert = getCaCert();

  const adapter = new PrismaMariaDb(
    {
      host: url.hostname,
      port: Number(url.port),
      user: decodeURIComponent(url.username),
      password: decodeURIComponent(url.password),
      ssl: caCert
        ? { ca: caCert, rejectUnauthorized: true }
        : { rejectUnauthorized: false },
      connectTimeout: 15000,
      acquireTimeout: 20000,
      connectionLimit: 5,
    },
    { database: url.pathname.replace(/^\//, "") },
  );

  return new PrismaClient({ adapter });
}

export function getPrisma() {
  if (!global.prismaGlobal) {
    global.prismaGlobal = createClient();
  }
  return global.prismaGlobal;
}
