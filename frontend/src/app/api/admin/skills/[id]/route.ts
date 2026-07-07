import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const prisma = getPrisma();

  const { id } = await params;

  try {
    const body = await request.json();
    const data: Record<string, unknown> = {};

    if (body.name !== undefined) data.name = body.name;
    if (body.icon_name !== undefined || body.iconName !== undefined)
      data.icon_name = body.icon_name ?? body.iconName;
    if (body.color_hex !== undefined || body.colorHex !== undefined)
      data.color_hex = body.color_hex ?? body.colorHex;
    if (body.category !== undefined) data.category = body.category;
    if (body.sort_order !== undefined || body.sortOrder !== undefined)
      data.sort_order = body.sort_order ?? body.sortOrder;
    if (body.is_active !== undefined || body.isActive !== undefined)
      data.is_active = body.is_active ?? body.isActive;

    const skill = await prisma.skills.update({
      where: { id: Number(id) },
      data,
    });

    return NextResponse.json({
      data: {
        id: Number(skill.id),
        name: skill.name,
        iconName: skill.icon_name,
        colorHex: skill.color_hex,
        category: skill.category,
        sortOrder: skill.sort_order,
        isActive: skill.is_active,
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const prisma = getPrisma();

  const { id } = await params;

  try {
    await prisma.skills.delete({ where: { id: Number(id) } });
    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
