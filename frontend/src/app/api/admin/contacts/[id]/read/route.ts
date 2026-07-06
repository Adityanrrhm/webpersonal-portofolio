import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await verifyAuth(request);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  try {
    const contact = await prisma.contacts.update({
      where: { id: Number(id) },
      data: { is_read: true },
    });

    return NextResponse.json({
      data: {
        id: Number(contact.id),
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        message: contact.message,
        isRead: contact.is_read,
        createdAt: contact.created_at,
        updatedAt: contact.updated_at,
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
