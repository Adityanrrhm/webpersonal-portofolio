import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const prisma = getPrisma();
  try {
    const skills = await prisma.skills.findMany({
      where: { is_active: true },
      orderBy: { sort_order: "asc" },
    });

    const data = skills.map((s) => ({
      id: Number(s.id),
      name: s.name,
      iconName: s.icon_name,
      colorHex: s.color_hex,
      category: s.category,
    }));

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    );
  }
}
