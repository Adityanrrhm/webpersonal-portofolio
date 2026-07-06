import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const user = await verifyAuth(request);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const socialLinks = await prisma.social_links.findMany({
    orderBy: { sort_order: "asc" },
  });

  return NextResponse.json({
    data: socialLinks.map((s) => ({
      id: Number(s.id),
      platform: s.platform,
      url: s.url,
      iconName: s.icon_name,
      sortOrder: s.sort_order,
      isActive: s.is_active,
    })),
  });
}

export async function POST(request: NextRequest) {
  const user = await verifyAuth(request);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();

    if (!body.platform || !body.url) {
      return NextResponse.json(
        { message: "Platform and url are required" },
        { status: 400 }
      );
    }

    const socialLink = await prisma.social_links.create({
      data: {
        platform: body.platform,
        url: body.url,
        icon_name: body.icon_name ?? body.iconName ?? null,
        sort_order: body.sort_order ?? body.sortOrder ?? 0,
        is_active: body.is_active ?? body.isActive ?? true,
      },
    });

    return NextResponse.json(
      {
        data: {
          id: Number(socialLink.id),
          platform: socialLink.platform,
          url: socialLink.url,
          iconName: socialLink.icon_name,
          sortOrder: socialLink.sort_order,
          isActive: socialLink.is_active,
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
