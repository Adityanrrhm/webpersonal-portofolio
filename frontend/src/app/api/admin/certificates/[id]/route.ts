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

    if (body.title !== undefined) data.title = body.title;
    if (body.org !== undefined) data.org = body.org;
    if (body.category !== undefined) data.category = body.category;
    if (body.issued_date !== undefined || body.issuedDate !== undefined)
      data.issued_date = body.issued_date ?? body.issuedDate;
    if (body.credential_id !== undefined || body.credentialId !== undefined)
      data.credential_id = body.credential_id ?? body.credentialId;
    if (body.description !== undefined) data.description = body.description;
    if (body.image_url !== undefined || body.imageUrl !== undefined)
      data.image_url = body.image_url ?? body.imageUrl;
    if (body.credential_url !== undefined || body.credentialUrl !== undefined)
      data.credential_url = body.credential_url ?? body.credentialUrl;
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
  const user = await verifyAuth(request);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  try {
    await prisma.certificates.delete({ where: { id: Number(id) } });
    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
