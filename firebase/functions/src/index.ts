import { setGlobalOptions } from "firebase-functions";
import { onObjectDeleted, onObjectFinalized } from "firebase-functions/v2/storage";
import { initializeApp } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import sizeOf from "image-size";

initializeApp();
setGlobalOptions({ maxInstances: 10 });

// When a photo is uploaded to Gallery/, read and store its dimensions in metadata
export const storeImageDimensions = onObjectFinalized(async (event) => {
  const filePath = event.data.name;

  // Only process originals in Gallery/, skip thumbnails subfolder
  if (!filePath.startsWith("Gallery/") || filePath.startsWith("Gallery/thumbnails/")) {
    return;
  }

  const bucket = getStorage().bucket(event.data.bucket);
  const file = bucket.file(filePath);
  const [buffer] = await file.download();
  const { width, height } = sizeOf(buffer);

  await file.setMetadata({
    metadata: { width: String(width), height: String(height) },
  });

  console.log(`Stored dimensions ${width}x${height} for ${filePath}`);
});

// When a photo is deleted from Gallery/, delete its thumbnail too
export const deleteThumbnailOnPhotoDelete = onObjectDeleted(async (event) => {
  const filePath = event.data.name;

  if (!filePath || !filePath.startsWith("Gallery/") || filePath.startsWith("Gallery/thumbnails/")) {
    return;
  }

  const filename = filePath.replace("Gallery/", "");
  const dotIndex = filename.lastIndexOf(".");
  const thumbName = filename.slice(0, dotIndex) + "_400x400" + filename.slice(dotIndex);
  const thumbPath = `Gallery/thumbnails/${thumbName}`;

  try {
    await getStorage().bucket().file(thumbPath).delete();
    console.log(`Deleted thumbnail: ${thumbPath}`);
  } catch (error) {
    console.error(`Failed to delete thumbnail ${thumbPath}:`, error);
  }
});
