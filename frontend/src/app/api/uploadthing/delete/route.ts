import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";
import { verifyToken } from "@/lib/auth";

const utapi = new UTApi();

export async function POST(req: Request) {
  try {
    // Verifikasi Auth Admin
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7)
      : req.headers.get("cookie")
          ?.split(";")
          .find((c) => c.trim().startsWith("token="))
          ?.split("=")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Ekstrak URL dari request body
    const { url } = await req.json();
    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // URL biasanya format: https://utfs.io/f/fileKey atau https://ufs.sh/f/fileKey
    const fileKey = url.split("/").pop();
    if (!fileKey) {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
    }

    // Hapus dari UploadThing
    await utapi.deleteFiles(fileKey);

    return NextResponse.json({ success: true, message: "File deleted successfully" });
  } catch (error: any) {
    console.error("[UPLOADTHING_DELETE_ERROR]", error);
    return NextResponse.json({ error: "Failed to delete file" }, { status: 500 });
  }
}
