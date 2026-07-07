import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const prisma = getPrisma();

  const contacts = await prisma.contacts.findMany({
    orderBy: { created_at: "desc" },
  });

  return NextResponse.json({
    data: contacts.map((c) => ({
      id: Number(c.id),
      name: c.name,
      email: c.email,
      subject: c.subject,
      message: c.message,
      isRead: c.is_read,
      createdAt: c.created_at,
      updatedAt: c.updated_at,
    })),
  });
}
