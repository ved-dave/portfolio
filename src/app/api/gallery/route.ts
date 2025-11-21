import { readdir, readFile } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const galleryPath = join(process.cwd(), "public", "gallery");
    const files = await readdir(galleryPath);
    
    // Filter for image files only
    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );
    
    // Try to read custom order configuration
    let orderedFiles = imageFiles;
    try {
      const orderConfigPath = join(galleryPath, "gallery-order.json");
      const orderConfigContent = await readFile(orderConfigPath, "utf-8");
      const orderConfig = JSON.parse(orderConfigContent);
      
      if (orderConfig.order && Array.isArray(orderConfig.order) && orderConfig.order.length > 0) {
        // Use custom order, but only include files that exist
        const customOrder = orderConfig.order.filter((filename: string) => 
          imageFiles.includes(filename)
        );
        
        // Add any files not in the custom order to the end
        const unorderedFiles = imageFiles.filter((file) => !customOrder.includes(file));
        orderedFiles = [...customOrder, ...unorderedFiles];
      }
    } catch (configError) {
      // If config file doesn't exist or is invalid, use default alphabetical sort
      orderedFiles.sort((a, b) => a.localeCompare(b));
    }
    
    return NextResponse.json(orderedFiles);
  } catch (error) {
    console.error("Error reading gallery directory:", error);
    return NextResponse.json([], { status: 500 });
  }
}

