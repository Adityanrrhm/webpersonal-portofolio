import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(request: NextRequest) {
  const user = await verifyAuth(request);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const data: Record<string, unknown> = {};

    if (body.name !== undefined) data.name = body.name;
    if (body.title !== undefined) data.title = body.title;
    if (body.bio !== undefined) data.bio = body.bio;
    if (body.photo_url !== undefined) data.photo_url = body.photo_url;
    if (body.cv_url !== undefined) data.cv_url = body.cv_url;
    if (body.email !== undefined) data.email = body.email;
    if (body.location !== undefined) data.location = body.location;
    if (body.focus !== undefined) data.focus = body.focus;
    if (body.study !== undefined) data.study = body.study;

    const profile = await prisma.profiles.update({
      where: { id: 1 },
      data,
    });

    return NextResponse.json({
      data: {
        id: Number(profile.id),
        name: profile.name,
        title: profile.title,
        bio: profile.bio,
        photoUrl: profile.photo_url,
        cvUrl: profile.cv_url,
        email: profile.email,
        location: profile.location,
        focus: profile.focus,
        study: profile.study,
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
