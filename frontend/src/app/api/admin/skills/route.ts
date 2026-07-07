import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const prisma = getPrisma();

  const skills = await prisma.skills.findMany({
    orderBy: { sort_order: "asc" },
  });

  return NextResponse.json({
    data: skills.map((s) => ({
      id: Number(s.id),
      name: s.name,
      iconName: s.icon_name,
      colorHex: s.color_hex,
      category: s.category,
      sortOrder: s.sort_order,
      isActive: s.is_active,
    })),
  });
}

export async function POST(request: NextRequest) {
  const prisma = getPrisma();

  try {
    const body = await request.json();

    if (!body.name || !body.icon_name) {
      return NextResponse.json(
        { message: "Name and icon_name are required" },
        { status: 400 }
      );
    }

    const skill = await prisma.skills.create({
      data: {
        name: body.name,
        icon_name: body.icon_name,
        color_hex: body.color_hex ?? body.colorHex ?? null,
        category: body.category ?? null,
        sort_order: body.sort_order ?? body.sortOrder ?? 0,
        is_active: body.is_active ?? body.isActive ?? true,
      },
    });

    return NextResponse.json(
      {
        data: {
          id: Number(skill.id),
          name: skill.name,
          iconName: skill.icon_name,
          colorHex: skill.color_hex,
          category: skill.category,
          sortOrder: skill.sort_order,
          isActive: skill.is_active,
        },
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
