import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const prisma = getPrisma();
  try {
    const certificates = await prisma.certificates.findMany({
      where: { is_active: true },
      orderBy: { sort_order: "asc" },
    });

    const data = certificates.map((c) => ({
      id: Number(c.id),
      title: c.title,
      org: c.org,
      category: c.category,
      issuedDate: c.issued_date,
      description: c.description,
      imageUrl: c.image_url,
      credentialUrl: c.credential_url,
    }));

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch certificates" },
      { status: 500 }
    );
  }
}
