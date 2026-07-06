import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const prisma = getPrisma();
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const contact = await prisma.contacts.create({
      data: {
        name,
        email,
        subject: subject || null,
        message,
      },
    });

    const data = {
      id: Number(contact.id),
      name: contact.name,
      email: contact.email,
      subject: contact.subject,
      message: contact.message,
      isRead: contact.is_read,
    };

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to submit contact" },
      { status: 500 }
    );
  }
}
