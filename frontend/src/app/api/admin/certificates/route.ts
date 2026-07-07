import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const prisma = getPrisma();

  const certificates = await prisma.certificates.findMany({
    orderBy: { sort_order: "asc" },
  });

  return NextResponse.json({
    data: certificates.map((c) => ({
      id: Number(c.id),
      title: c.title,
      org: c.org,
      category: c.category,
      issuedDate: c.issued_date,
      credentialId: c.credential_id,
      description: c.description,
      imageUrl: c.image_url,
      credentialUrl: c.credential_url,
      sortOrder: c.sort_order,
      isActive: c.is_active,
    })),
  });
}

export async function POST(request: NextRequest) {
  const prisma = getPrisma();

  try {
    const body = await request.json();

    if (!body.title || !body.org || !body.category || !body.issued_date) {
      return NextResponse.json(
        { message: "Title, org, category, and issued_date are required" },
        { status: 400 }
      );
    }

    const certificate = await prisma.certificates.create({
      data: {
        title: body.title,
        org: body.org,
        category: body.category,
        issued_date: body.issued_date,
        credential_id: body.credential_id ?? body.credentialId ?? null,
        description: body.description ?? null,
        image_url: body.image_url ?? body.imageUrl ?? null,
        credential_url: body.credential_url ?? body.credentialUrl ?? null,
        sort_order: body.sort_order ?? body.sortOrder ?? 0,
        is_active: body.is_active ?? body.isActive ?? true,
      },
    });

    return NextResponse.json(
      {
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
