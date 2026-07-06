import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const experiences = await prisma.experiences.findMany({
      where: { is_active: true },
      orderBy: { sort_order: "asc" },
    });

    const data = experiences.map((e) => ({
      id: Number(e.id),
      role: e.role,
      company: e.company,
      type: e.type,
      periodStart: e.period_start,
      periodEnd: e.period_end,
      points: e.points,
    }));

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch experiences" },
      { status: 500 }
    );
  }
}
