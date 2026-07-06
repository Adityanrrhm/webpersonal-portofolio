import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const prisma = getPrisma();
  const user = await verifyAuth(request);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  try {
    const body = await request.json();
    const data: Record<string, unknown> = {};

    if (body.role !== undefined) data.role = body.role;
    if (body.company !== undefined) data.company = body.company;
    if (body.type !== undefined) data.type = body.type;
    if (body.period_start !== undefined || body.periodStart !== undefined)
      data.period_start = body.period_start ?? body.periodStart;
    if (body.period_end !== undefined || body.periodEnd !== undefined)
      data.period_end = body.period_end ?? body.periodEnd;
    if (body.points !== undefined) data.points = body.points;
    if (body.sort_order !== undefined || body.sortOrder !== undefined)
      data.sort_order = body.sort_order ?? body.sortOrder;
    if (body.is_active !== undefined || body.isActive !== undefined)
      data.is_active = body.is_active ?? body.isActive;

    const experience = await prisma.experiences.update({
      where: { id: Number(id) },
      data,
    });

    return NextResponse.json({
      data: {
        id: Number(experience.id),
        role: experience.role,
        company: experience.company,
        type: experience.type,
        periodStart: experience.period_start,
        periodEnd: experience.period_end,
        points: experience.points,
        sortOrder: experience.sort_order,
        isActive: experience.is_active,
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
  const user = await verifyAuth(request);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  try {
    await prisma.experiences.delete({ where: { id: Number(id) } });
    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
