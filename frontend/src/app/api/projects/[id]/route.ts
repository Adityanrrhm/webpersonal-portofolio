import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const prisma = getPrisma();
  try {
    const { id } = await params;
    const project = await prisma.projects.findFirst({
      where: { id: Number(id), is_active: true },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    const data = {
      id: Number(project.id),
      title: project.title,
      category: project.category,
      label: project.label,
      description: project.description,
      techStack: project.tech_stack,
      imageUrl: project.image_url,
      liveUrl: project.live_url,
      githubUrl: project.github_url,
      isPrivate: project.is_private,
    };

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}
