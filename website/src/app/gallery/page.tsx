"use client";

import { useState, useEffect, useCallback } from "react";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import Sidebar from "@/components/Sidebar";
import Navigation from "@/components/Navigation";
import { X } from "lucide-react";

interface PhotoData {
  src: string;      // full-size URL — loaded only when lightbox opens
  thumbSrc: string; // 400x400 thumbnail URL — used in the grid
  name: string;
  aspectRatio: number;
}

export default function PhotosPage() {
  const [photos, setPhotos] = useState<PhotoData[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoData | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchCurrent, setTouchCurrent] = useState<number | null>(null);
  const [swipeOffset, setSwipeOffset] = useState(0);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const galleryRef = ref(storage, "Gallery/");
        const result = await listAll(galleryRef);

        // Only process original images (files directly in Gallery/, not subfolders)
        const originals = result.items;

        const photoData: PhotoData[] = await Promise.all(
          originals.map(async (itemRef) => {
            const fullUrl = await getDownloadURL(itemRef);

            // Thumbnail is stored at Gallery/thumbnails/<basename>_400x400.<ext>
            const dotIndex = itemRef.name.lastIndexOf(".");
            const thumbName =
              itemRef.name.slice(0, dotIndex) + "_400x400" + itemRef.name.slice(dotIndex);
            const thumbUrl = await getDownloadURL(
              ref(storage, `Gallery/thumbnails/${thumbName}`)
            ).catch(() => fullUrl); // fall back to full-size if thumbnail doesn't exist yet

            return new Promise<PhotoData>((resolve) => {
              const img = new window.Image();
              img.onload = () => {
                resolve({ src: fullUrl, thumbSrc: thumbUrl, name: itemRef.name, aspectRatio: img.width / img.height });
              };
              img.onerror = () => {
                resolve({ src: fullUrl, thumbSrc: thumbUrl, name: itemRef.name, aspectRatio: 4 / 3 });
              };
              img.src = thumbUrl;
            });
          })
        );

        setPhotos(photoData);
      } catch (error) {
        console.error("Failed to load gallery images from Firebase:", error);
      }
    };

    loadImages();
  }, []);

  // Navigate to next/previous photo
  const navigatePhoto = useCallback((direction: "prev" | "next") => {
    if (!selectedPhoto) return;
    const currentIndex = photos.findIndex((p) => p.name === selectedPhoto.name);
    if (currentIndex === -1) return;

    let newIndex: number;
    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
    } else {
      newIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedPhoto(photos[newIndex]);
  }, [selectedPhoto, photos]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!selectedPhoto) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedPhoto(null);
        return;
      }

      if (event.key === "ArrowLeft") {
        navigatePhoto("prev");
      } else if (event.key === "ArrowRight") {
        navigatePhoto("next");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPhoto, photos]);

  // Touch handlers for swipe gestures
  const minSwipeDistance = 50;

  const getCurrentIndex = useCallback(() => {
    if (!selectedPhoto) return -1;
    return photos.findIndex((p) => p.name === selectedPhoto.name);
  }, [selectedPhoto, photos]);

  const getNextPhoto = useCallback(() => {
    const currentIndex = getCurrentIndex();
    if (currentIndex === -1) return null;
    const nextIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
    return photos[nextIndex];
  }, [getCurrentIndex, photos]);

  const getPrevPhoto = useCallback(() => {
    const currentIndex = getCurrentIndex();
    if (currentIndex === -1) return null;
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
    return photos[prevIndex];
  }, [getCurrentIndex, photos]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchCurrent(e.targetTouches[0].clientX);
    setSwipeOffset(0);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const currentX = e.targetTouches[0].clientX;
    setTouchCurrent(currentX);
    const offset = currentX - touchStart;
    setSwipeOffset(offset);
  };

  const onTouchEnd = useCallback(() => {
    if (touchStart === null || touchCurrent === null) {
      setTouchStart(null);
      setTouchCurrent(null);
      setSwipeOffset(0);
      return;
    }

    const distance = touchStart - touchCurrent;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      navigatePhoto("next");
    } else if (isRightSwipe) {
      navigatePhoto("prev");
    }

    // Reset touch states
    setTouchStart(null);
    setTouchCurrent(null);
    setSwipeOffset(0);
  }, [touchStart, touchCurrent, navigatePhoto]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] py-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        <Sidebar />

        <div className="flex-1">
          <div className="bg-[#1e1e1f] border border-[#383838] rounded-3xl overflow-hidden">
            <Navigation />

            <div className="p-8">
              <h2 className="text-3xl font-semibold text-white mb-8">Photo Gallery</h2>

              <div className="columns-2 md:columns-3 gap-4">
                {photos.map((photo) => {
                  const isVertical = photo.aspectRatio < 1;
                  return (
                    <div
                      key={photo.name}
                      className="relative overflow-hidden rounded-2xl mb-4 break-inside-avoid cursor-pointer group"
                      onClick={() => setSelectedPhoto(photo)}
                    >
                      <div className={`relative ${isVertical ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                        <img
                          src={photo.thumbSrc}
                          alt={photo.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-size Image Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 overflow-hidden"
          onClick={() => setSelectedPhoto(null)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setSelectedPhoto(null); }}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-[#1e1e1f] border border-[#383838] rounded-xl flex items-center justify-center hover:bg-[#2b2b2c] transition-colors"
            aria-label="Close image"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* 3-panel strip: [prev][current][next], strip is 300vw, offset so current is visible */}
          <div
            className="absolute top-0 flex h-full"
            style={{
              width: "300vw",
              left: "-100vw",
              transform: `translateX(${swipeOffset}px)`,
              touchAction: "none",
            }}
          >
            {/* Previous */}
            <div className="w-screen h-full flex items-center justify-center p-4">
              {getPrevPhoto() && (
                <img
                  src={getPrevPhoto()!.src}
                  alt={getPrevPhoto()!.name}
                  className="max-w-full max-h-[90vh] object-contain rounded-lg select-none"
                  onClick={(e) => e.stopPropagation()}
                  draggable={false}
                />
              )}
            </div>
            {/* Current */}
            <div className="w-screen h-full flex items-center justify-center p-4">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.name}
                className="max-w-full max-h-[90vh] object-contain rounded-lg select-none"
                onClick={(e) => e.stopPropagation()}
                draggable={false}
              />
            </div>
            {/* Next */}
            <div className="w-screen h-full flex items-center justify-center p-4">
              {getNextPhoto() && (
                <img
                  src={getNextPhoto()!.src}
                  alt={getNextPhoto()!.name}
                  className="max-w-full max-h-[90vh] object-contain rounded-lg select-none"
                  onClick={(e) => e.stopPropagation()}
                  draggable={false}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
