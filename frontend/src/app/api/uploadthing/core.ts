import { createUploadthing, type FileRouter } from "uploadthing/next";
import { verifyToken } from "@/lib/auth";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      // Verifikasi JWT dari Authorization header atau cookie
      const authHeader = req.headers.get("authorization");
      const token = authHeader?.startsWith("Bearer ")
        ? authHeader.slice(7)
        : req.headers.get("cookie")
            ?.split(";")
            .find((c) => c.trim().startsWith("token="))
            ?.split("=")[1];

      if (!token) {
        throw new Error("Unauthorized");
      }

      const payload = verifyToken(token);
      if (!payload) {
        throw new Error("Invalid token");
      }

      return { userId: payload.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { url: file.ufsUrl ?? file.url, key: file.key, uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
