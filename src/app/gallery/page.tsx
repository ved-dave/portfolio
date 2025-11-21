"use client";

import { useState, useEffect, useCallback } from "react";
import Sidebar from "@/components/Sidebar";
import Navigation from "@/components/Navigation";
import { X } from "lucide-react";

interface PhotoData {
  src: string;
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
    // Fetch the list of images from the API route
    const loadImages = async () => {
      try {
        const response = await fetch("/api/gallery");
        const imageFiles: string[] = await response.json();
        
        const photoData: PhotoData[] = await Promise.all(
          imageFiles.map((filename) => {
            const imagePath = `/gallery/${filename}`;
            return new Promise<PhotoData>((resolve) => {
              const img = new window.Image();
              img.onload = () => {
                resolve({
                  src: imagePath,
                  name: filename,
                  aspectRatio: img.width / img.height,
                });
              };
              img.onerror = () => {
                // Fallback if image fails to load
                resolve({
                  src: imagePath,
                  name: filename,
                  aspectRatio: 4 / 3,
                });
              };
              img.src = imagePath;
            });
          })
        );

        // Photos are already ordered by the API route
        setPhotos(photoData);
      } catch (error) {
        console.error("Failed to load gallery images:", error);
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
                          src={photo.src}
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
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-[#1e1e1f] border border-[#383838] rounded-xl flex items-center justify-center hover:bg-[#2b2b2c] transition-colors"
            aria-label="Close image"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div
            className="relative max-w-[90vw] max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="relative w-full h-full flex">
              {/* Current photo */}
              <div
                className="flex-shrink-0 w-full h-full transition-transform duration-0"
                style={{
                  transform: swipeOffset !== 0 ? `translateX(${swipeOffset}px)` : 'translateX(0)',
                }}
              >
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.name}
                  className="max-w-full max-h-[90vh] object-contain rounded-lg touch-none w-full h-full"
                />
              </div>

              {/* Next/Previous photo sliding in */}
              {swipeOffset !== 0 && (
                <>
                  {swipeOffset < 0 && getNextPhoto() && (
                    <div
                      className="flex-shrink-0 w-full h-full absolute inset-0 transition-transform duration-0"
                      style={{
                        transform: `translateX(${100 + swipeOffset}%)`,
                      }}
                    >
                      <img
                        src={getNextPhoto()!.src}
                        alt={getNextPhoto()!.name}
                        className="max-w-full max-h-[90vh] object-contain rounded-lg touch-none w-full h-full"
                      />
                    </div>
                  )}
                  {swipeOffset > 0 && getPrevPhoto() && (
                    <div
                      className="flex-shrink-0 w-full h-full absolute inset-0 transition-transform duration-0"
                      style={{
                        transform: `translateX(${-100 + swipeOffset}%)`,
                      }}
                    >
                      <img
                        src={getPrevPhoto()!.src}
                        alt={getPrevPhoto()!.name}
                        className="max-w-full max-h-[90vh] object-contain rounded-lg touch-none w-full h-full"
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
