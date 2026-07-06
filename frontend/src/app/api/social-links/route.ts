import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const prisma = getPrisma();
  try {
    const socialLinks = await prisma.social_links.findMany({
      where: { is_active: true },
      orderBy: { sort_order: "asc" },
    });

    const data = socialLinks.map((s) => ({
      id: Number(s.id),
      platform: s.platform,
      url: s.url,
      iconName: s.icon_name,
    }));

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch social links" },
      { status: 500 }
    );
  }
}
