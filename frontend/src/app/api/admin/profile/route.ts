import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { verifyAuth, verifyPassword, hashPassword } from "@/lib/auth";

export async function PUT(request: NextRequest) {
  const prisma = getPrisma();

  try {
    const body = await request.json();
    const user = await verifyAuth(request);

    if (body.current_password || body.password) {
      if (!user) {
        return NextResponse.json(
          { message: "Unauthorized" },
          { status: 401 }
        );
      }
      if (!body.current_password || !body.password) {
        return NextResponse.json(
          { message: "Current password and new password are required" },
          { status: 400 }
        );
      }
      if (!verifyPassword(body.current_password, user.password)) {
        return NextResponse.json(
          { message: "Current password is incorrect" },
          { status: 422 }
        );
      }
      await prisma.users.update({
        where: { id: user.id },
        data: { password: hashPassword(body.password) },
      });
      return NextResponse.json({ message: "Password updated" });
    }

    const data: Record<string, unknown> = {};

    if (body.name !== undefined) data.name = body.name;
    if (body.title !== undefined) data.title = body.title;
    if (body.bio !== undefined) data.bio = body.bio;
    if (body.photo_url !== undefined) {
      data.photo_url = body.photo_url;
    } else if (body.photoUrl !== undefined) {
      data.photo_url = body.photoUrl;
    }
    if (body.cv_url !== undefined) {
      data.cv_url = body.cv_url;
    } else if (body.cvUrl !== undefined) {
      data.cv_url = body.cvUrl;
    }
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
