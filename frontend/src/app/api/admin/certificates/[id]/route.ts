import { NextRequest, NextResponse } from "next/server";
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

  const { id } = await params;

  try {
    const body = await request.json();
    const data: Record<string, unknown> = {};

    if (body.title !== undefined) data.title = body.title;
    if (body.org !== undefined) data.org = body.org;
    if (body.category !== undefined) data.category = body.category;
    if (body.issued_date !== undefined || body.issuedDate !== undefined)
      data.issued_date = body.issued_date ?? body.issuedDate;
    if (body.credential_id !== undefined || body.credentialId !== undefined)
      data.credential_id = body.credential_id ?? body.credentialId;
    if (body.description !== undefined) data.description = body.description;
    if (body.image_url !== undefined) {
      data.image_url = body.image_url;
    } else if (body.imageUrl !== undefined) {
      data.image_url = body.imageUrl;
    }
    if (body.credential_url !== undefined) {
      data.credential_url = body.credential_url;
    } else if (body.credentialUrl !== undefined) {
      data.credential_url = body.credentialUrl;
    }
    if (body.sort_order !== undefined || body.sortOrder !== undefined)
      data.sort_order = body.sort_order ?? body.sortOrder;
    if (body.is_active !== undefined || body.isActive !== undefined)
      data.is_active = body.is_active ?? body.isActive;

    const certificate = await prisma.certificates.update({
      where: { id: Number(id) },
      data,
    });

    return NextResponse.json({
      data: {
        id: Number(certificate.id),
        title: certificate.title,
        org: certificate.org,
        category: certificate.category,
        issuedDate: certificate.issued_date,
        credentialId: certificate.credential_id,
        description: certificate.description,
        imageUrl: certificate.image_url,
        credentialUrl: certificate.credential_url,
        sortOrder: certificate.sort_order,
        isActive: certificate.is_active,
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
    // Fetch dulu untuk dapat image_url sebelum dihapus
    const existing = await prisma.certificates.findUnique({
      where: { id: Number(id) },
      select: { image_url: true },
    });

    // Hapus record dari DB
    await prisma.certificates.delete({ where: { id: Number(id) } });

    // Auto-delete gambar dari UploadThing jika ada
    if (existing?.image_url) {
      const fileKey = extractFileKey(existing.image_url);
      if (fileKey) {
        await utapi.deleteFiles(fileKey).catch((err) =>
          console.error("[CERT_DELETE] Failed to delete image from UploadThing:", err)
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
