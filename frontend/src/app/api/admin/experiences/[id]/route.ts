import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

/** Ekstrak file key dari URL UploadThing */
function extractFileKey(url: string): string | null {
  if (!url) return null;
  const parts = url.split("/");
  return parts.pop() ?? null;
}

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
    if (body.image_url !== undefined) {
      data.image_url = body.image_url;
    } else if (body.imageUrl !== undefined) {
      data.image_url = body.imageUrl;
    }
    if (body.company_logo_url !== undefined) {
      data.company_logo_url = body.company_logo_url;
    } else if (body.companyLogoUrl !== undefined) {
      data.company_logo_url = body.companyLogoUrl;
    }
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
        imageUrl: experience.image_url,
        companyLogoUrl: experience.company_logo_url,
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
    // Fetch dulu untuk dapat image_url & company_logo_url sebelum dihapus
    const existing = await prisma.experiences.findUnique({
      where: { id: Number(id) },
      select: { image_url: true, company_logo_url: true },
    });

    // Hapus record dari DB
    await prisma.experiences.delete({ where: { id: Number(id) } });

    // Auto-delete gambar dari UploadThing jika ada
    const keysToDelete: string[] = [];
    if (existing?.image_url) {
      const key = extractFileKey(existing.image_url);
      if (key) keysToDelete.push(key);
    }
    if (existing?.company_logo_url) {
      const key = extractFileKey(existing.company_logo_url);
      if (key) keysToDelete.push(key);
    }
    if (keysToDelete.length > 0) {
      await utapi.deleteFiles(keysToDelete).catch((err) =>
        console.error("[EXP_DELETE] Failed to delete images from UploadThing:", err)
      );
    }

    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
