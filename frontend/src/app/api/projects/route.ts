import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const prisma = getPrisma();
  try {
    const projects = await prisma.projects.findMany({
      where: { is_active: true },
      orderBy: { created_at: "desc" },
    });

    const data = projects.map((p) => ({
      id: Number(p.id),
      title: p.title,
      category: p.category,
      label: p.label,
      description: p.description,
      techStack: p.tech_stack,
      imageUrl: p.image_url,
      liveUrl: p.live_url,
      githubUrl: p.github_url,
      isPrivate: p.is_private,
    }));

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
