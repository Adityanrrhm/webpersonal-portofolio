import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const prisma = getPrisma();
  const user = await verifyAuth(request);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const experiences = await prisma.experiences.findMany({
    orderBy: { sort_order: "asc" },
  });

  return NextResponse.json({
    data: experiences.map((e) => ({
      id: Number(e.id),
      role: e.role,
      company: e.company,
      type: e.type,
      periodStart: e.period_start,
      periodEnd: e.period_end,
      points: e.points,
      imageUrl: e.image_url,
      companyLogoUrl: e.company_logo_url,
      sortOrder: e.sort_order,
      isActive: e.is_active,
    })),
  });
}

export async function POST(request: NextRequest) {
  const prisma = getPrisma();
  const user = await verifyAuth(request);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();

    if (!body.role || !body.company || !body.type || !body.period_start) {
      return NextResponse.json(
        { message: "Role, company, type, and period_start are required" },
        { status: 400 }
      );
    }

    const experience = await prisma.experiences.create({
      data: {
        role: body.role,
        company: body.company,
        type: body.type,
        period_start: body.period_start,
        period_end: body.period_end ?? body.periodEnd ?? null,
        points: body.points ?? null,
        image_url: body.image_url ?? body.imageUrl ?? null,
        company_logo_url: body.company_logo_url ?? body.companyLogoUrl ?? null,
        sort_order: body.sort_order ?? body.sortOrder ?? 0,
        is_active: body.is_active ?? body.isActive ?? true,
      },
    });

    return NextResponse.json(
      {
        data: {
          id: Number(experience.id),
          role: experience.role,
          company: experience.company,
          type: experience.type,
          periodStart: experience.period_start,
          periodEnd: experience.period_end,
          points: experience.points,
          imageUrl: experience.image_url,
          companyLogoUrl: experience.company_logo_url,
          sortOrder: experience.sort_order,
          isActive: experience.is_active,
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
