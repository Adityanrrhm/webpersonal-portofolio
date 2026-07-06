import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const prisma = getPrisma();
  try {
    const { id } = await params;
    const certificate = await prisma.certificates.findFirst({
      where: { id: Number(id), is_active: true },
    });

    if (!certificate) {
      return NextResponse.json(
        { error: "Certificate not found" },
        { status: 404 }
      );
    }

    const data = {
      id: Number(certificate.id),
      title: certificate.title,
      org: certificate.org,
      category: certificate.category,
      issuedDate: certificate.issued_date,
      credentialId: certificate.credential_id,
      description: certificate.description,
      imageUrl: certificate.image_url,
      credentialUrl: certificate.credential_url,
    };

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch certificate" },
      { status: 500 }
    );
  }
}
