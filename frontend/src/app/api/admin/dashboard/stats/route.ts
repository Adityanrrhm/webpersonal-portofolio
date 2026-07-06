import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const prisma = getPrisma();
  const user = await verifyAuth(request);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const [
    totalProjects,
    totalCertificates,
    totalExperiences,
    totalSkills,
    totalContacts,
    unreadContacts,
  ] = await Promise.all([
    prisma.projects.count(),
    prisma.certificates.count(),
    prisma.experiences.count(),
    prisma.skills.count(),
    prisma.contacts.count(),
    prisma.contacts.count({ where: { is_read: false } }),
  ]);

  return NextResponse.json({
    data: {
      totalProjects,
      totalCertificates,
      totalExperiences,
      totalSkills,
      totalContacts,
      unreadContacts,
    },
  });
}
