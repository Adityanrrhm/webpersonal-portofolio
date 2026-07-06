import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await verifyAuth(request);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  try {
    const body = await request.json();
    const data: Record<string, unknown> = {};

    if (body.platform !== undefined) data.platform = body.platform;
    if (body.url !== undefined) data.url = body.url;
    if (body.icon_name !== undefined || body.iconName !== undefined)
      data.icon_name = body.icon_name ?? body.iconName;
    if (body.sort_order !== undefined || body.sortOrder !== undefined)
      data.sort_order = body.sort_order ?? body.sortOrder;
    if (body.is_active !== undefined || body.isActive !== undefined)
      data.is_active = body.is_active ?? body.isActive;

    const socialLink = await prisma.social_links.update({
      where: { id: Number(id) },
      data,
    });

    return NextResponse.json({
      data: {
        id: Number(socialLink.id),
        platform: socialLink.platform,
        url: socialLink.url,
        iconName: socialLink.icon_name,
        sortOrder: socialLink.sort_order,
        isActive: socialLink.is_active,
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
  const user = await verifyAuth(request);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  try {
    await prisma.social_links.delete({ where: { id: Number(id) } });
    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
