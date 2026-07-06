import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const profile = await prisma.profiles.findFirst();

    if (!profile) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );
    }

    const data = {
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
    };

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}
