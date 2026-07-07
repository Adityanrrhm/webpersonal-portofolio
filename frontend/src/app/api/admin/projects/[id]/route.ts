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

    if (body.title !== undefined) data.title = body.title;
    if (body.category !== undefined) data.category = body.category;
    if (body.label !== undefined) data.label = body.label;
    if (body.description !== undefined) data.description = body.description;
    if (body.tech_stack !== undefined || body.techStack !== undefined)
      data.tech_stack = body.tech_stack ?? body.techStack;
    if (body.image_url !== undefined) {
      data.image_url = body.image_url;
    } else if (body.imageUrl !== undefined) {
      data.image_url = body.imageUrl;
    }
    if (body.live_url !== undefined || body.liveUrl !== undefined)
      data.live_url = body.live_url ?? body.liveUrl;
    if (body.github_url !== undefined || body.githubUrl !== undefined)
      data.github_url = body.github_url ?? body.githubUrl;
    if (body.sort_order !== undefined || body.sortOrder !== undefined)
      data.sort_order = body.sort_order ?? body.sortOrder;
    if (body.is_active !== undefined || body.isActive !== undefined)
      data.is_active = body.is_active ?? body.isActive;

    const project = await prisma.projects.update({
      where: { id: Number(id) },
      data,
    });

    return NextResponse.json({
      data: {
        id: Number(project.id),
        title: project.title,
        category: project.category,
        label: project.label,
        description: project.description,
        techStack: project.tech_stack,
        imageUrl: project.image_url,
        liveUrl: project.live_url,
        githubUrl: project.github_url,
        sortOrder: project.sort_order,
        isActive: project.is_active,
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
    // Fetch dulu untuk dapat image_url sebelum dihapus
    const existing = await prisma.projects.findUnique({
      where: { id: Number(id) },
      select: { image_url: true },
    });

    // Hapus record dari DB
    await prisma.projects.delete({ where: { id: Number(id) } });

    // Auto-delete gambar dari UploadThing jika ada
    if (existing?.image_url) {
      const fileKey = extractFileKey(existing.image_url);
      if (fileKey) {
        await utapi.deleteFiles(fileKey).catch((err) =>
          console.error("[PROJECT_DELETE] Failed to delete image from UploadThing:", err)
        );
      }
    }

    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
