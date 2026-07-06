import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const user = await verifyAuth(request);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const projects = await prisma.projects.findMany({ orderBy: { sort_order: "asc" } });

  return NextResponse.json({
    data: projects.map((p) => ({
      id: Number(p.id),
      title: p.title,
      category: p.category,
      label: p.label,
      description: p.description,
      techStack: p.tech_stack,
      imageUrl: p.image_url,
      liveUrl: p.live_url,
      githubUrl: p.github_url,
      sortOrder: p.sort_order,
      isActive: p.is_active,
    })),
  });
}

export async function POST(request: NextRequest) {
  const user = await verifyAuth(request);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();

    if (!body.title || !body.label) {
      return NextResponse.json(
        { message: "Title and label are required" },
        { status: 400 }
      );
    }

    const project = await prisma.projects.create({
      data: {
        title: body.title,
        category: body.category ?? null,
        label: body.label,
        description: body.description ?? null,
        tech_stack: body.tech_stack ?? body.techStack ?? null,
        image_url: body.image_url ?? body.imageUrl ?? null,
        live_url: body.live_url ?? body.liveUrl ?? null,
        github_url: body.github_url ?? body.githubUrl ?? null,
        sort_order: body.sort_order ?? body.sortOrder ?? 0,
        is_active: body.is_active ?? body.isActive ?? true,
      },
    });

    return NextResponse.json(
      {
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
