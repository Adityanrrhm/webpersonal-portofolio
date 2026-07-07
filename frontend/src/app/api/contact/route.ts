import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

function sanitize(str: string): string {
  return str.replace(/<[^>]*>/g, "").trim();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  const prisma = getPrisma();
  try {
    const body = await request.json();
    const rawName = body.name;
    const rawEmail = body.email;
    const rawSubject = body.subject;
    const rawMessage = body.message;

    if (!rawName || !rawEmail || !rawMessage) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const name = sanitize(String(rawName)).slice(0, 255);
    const email = sanitize(String(rawEmail)).slice(0, 255);
    const subject = rawSubject ? sanitize(String(rawSubject)).slice(0, 255) : null;
    const message = sanitize(String(rawMessage)).slice(0, 5000);

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Invalid input: fields cannot be empty after sanitization" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const contact = await prisma.contacts.create({
      data: { name, email, subject, message },
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
  } catch {
    return NextResponse.json(
      { error: "Failed to submit contact" },
      { status: 500 }
    );
  }
}
