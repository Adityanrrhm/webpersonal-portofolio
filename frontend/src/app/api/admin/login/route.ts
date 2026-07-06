import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, signToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await prisma.users.findUnique({ where: { email } });

    if (!user || !verifyPassword(password, user.password)) {
      return NextResponse.json(
        { message: "The provided credentials are incorrect." },
        { status: 422 }
      );
    }

    const token = signToken(Number(user.id));

    return NextResponse.json({
      token,
      user: {
        id: Number(user.id),
        name: user.name,
        email: user.email,
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
