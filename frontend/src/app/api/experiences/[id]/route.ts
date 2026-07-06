import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const experience = await prisma.experiences.findFirst({
      where: { id: Number(id), is_active: true },
    });

    if (!experience) {
      return NextResponse.json(
        { error: "Experience not found" },
        { status: 404 }
      );
    }

    const data = {
      id: Number(experience.id),
      role: experience.role,
      company: experience.company,
      type: experience.type,
      periodStart: experience.period_start,
      periodEnd: experience.period_end,
      points: experience.points,
    };

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch experience" },
      { status: 500 }
    );
  }
}
