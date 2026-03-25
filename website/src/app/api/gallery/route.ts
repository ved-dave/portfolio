import { NextResponse } from "next/server";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

function getAdminApp() {
  if (getApps().length > 0) return getApps()[0];
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!);
  return initializeApp({
    credential: cert(serviceAccount),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
}

function buildPublicUrl(bucket: string, filePath: string) {
  return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(filePath)}?alt=media`;
}

export async function GET() {
  try {
    const app = getAdminApp();
    const bucket = getStorage(app).bucket();
    const bucketName = bucket.name;

    const [files] = await bucket.getFiles({ prefix: "Gallery/", delimiter: "/" });

    const photos = files
      .filter((f) => f.name !== "Gallery/")
      .map((f) => {
        const filename = f.name.replace("Gallery/", "");
        const dotIndex = filename.lastIndexOf(".");
        const thumbName =
          dotIndex === -1
            ? filename + "_400x400"
            : filename.slice(0, dotIndex) + "_400x400" + filename.slice(dotIndex);
        const thumbPath = `Gallery/thumbnails/${thumbName}`;

        const width = f.metadata?.metadata?.width
          ? Number(f.metadata.metadata.width)
          : null;
        const height = f.metadata?.metadata?.height
          ? Number(f.metadata.metadata.height)
          : null;

        return {
          name: filename,
          thumbSrc: buildPublicUrl(bucketName, thumbPath),
          fullPath: f.name,
          width,
          height,
        };
      });

    return NextResponse.json(photos);
  } catch (error) {
    console.error("Error listing gallery from Firebase:", error);
    return NextResponse.json([], { status: 500 });
  }
}
