import { setGlobalOptions } from "firebase-functions";
import { onObjectDeleted } from "firebase-functions/v2/storage";
import { initializeApp } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

initializeApp();
setGlobalOptions({ maxInstances: 10 });

export const deleteThumbnailOnPhotoDelete = onObjectDeleted(async (event) => {
  const filePath = event.data.name; // e.g. "Gallery/DSC00064.jpg"

  // Only process files directly in Gallery/ (not already in thumbnails)
  if (!filePath || !filePath.startsWith("Gallery/") || filePath.startsWith("Gallery/thumbnails/")) {
    return;
  }

  const filename = filePath.replace("Gallery/", ""); // "DSC00064.jpg"
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
