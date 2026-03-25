"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ref, listAll, getMetadata } from "firebase/storage";
import { storage } from "@/lib/firebase";
import Sidebar from "@/components/Sidebar";
import Navigation from "@/components/Navigation";
import { X } from "lucide-react";

const PAGE_SIZE = 9;
const BUCKET = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!;

interface PhotoData {
  name: string;
  thumbSrc: string;
  fullPath: string;
  width: number | null;
  height: number | null;
}

function buildUrl(path: string) {
  return `https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o/${encodeURIComponent(path)}?alt=media`;
}

export default function PhotosPage() {
  const [allPhotos, setAllPhotos] = useState<PhotoData[]>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const [selectedPhoto, setSelectedPhoto] = useState<PhotoData | null>(null);
  const [fullSrc, setFullSrc] = useState<string | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchCurrent, setTouchCurrent] = useState<number | null>(null);
  const [swipeOffset, setSwipeOffset] = useState(0);

  // Fetch all photo metadata once on mount
  useEffect(() => {
    async function load() {
      const galleryRef = ref(storage, "Gallery/");
      const { items } = await listAll(galleryRef);

      const photos = await Promise.all(
        items.map(async (itemRef) => {
          const meta = await getMetadata(itemRef);
          const name = itemRef.name;
          const dot = name.lastIndexOf(".");
          const thumbName =
            dot === -1 ? name + "_400x400" : name.slice(0, dot) + "_400x400" + name.slice(dot);

          return {
            name,
            thumbSrc: buildUrl(`Gallery/thumbnails/${thumbName}`),
            fullPath: itemRef.fullPath,
            width: meta.customMetadata?.width ? Number(meta.customMetadata.width) : null,
            height: meta.customMetadata?.height ? Number(meta.customMetadata.height) : null,
          };
        })
      );

      setAllPhotos(photos);
      setLoading(false);
    }

    load().catch((err) => {
      console.error("Failed to load gallery:", err);
      setLoading(false);
    });
  }, []);

  // Virtual infinite scroll — no network, just reveals more already-fetched photos
  useEffect(() => {
    if (!sentinelRef.current || visibleCount >= allPhotos.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisibleCount((c) => c + PAGE_SIZE);
      },
      { rootMargin: "200px" }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [visibleCount, allPhotos.length]);

  // Open lightbox — start loading full-size image immediately
  const openPhoto = useCallback((photo: PhotoData) => {
    setSelectedPhoto(photo);
    setFullSrc(null);
    const src = buildUrl(photo.fullPath);
    const img = new Image();
    img.src = src;
    img.onload = () => setFullSrc(src);
  }, []);

  const getCurrentIndex = useCallback(
    () => (selectedPhoto ? allPhotos.findIndex((p) => p.name === selectedPhoto.name) : -1),
    [selectedPhoto, allPhotos]
  );

  const getAdjacentPhoto = useCallback(
    (dir: "prev" | "next") => {
      const i = getCurrentIndex();
      if (i === -1) return null;
      const next = dir === "prev" ? (i > 0 ? i - 1 : allPhotos.length - 1) : (i < allPhotos.length - 1 ? i + 1 : 0);
      return allPhotos[next];
    },
    [getCurrentIndex, allPhotos]
  );

  const navigatePhoto = useCallback(
    (dir: "prev" | "next") => {
      const next = getAdjacentPhoto(dir);
      if (next) openPhoto(next);
    },
    [getAdjacentPhoto, openPhoto]
  );

  // Keyboard navigation
  useEffect(() => {
    if (!selectedPhoto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedPhoto(null);
      else if (e.key === "ArrowLeft") navigatePhoto("prev");
      else if (e.key === "ArrowRight") navigatePhoto("next");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedPhoto, navigatePhoto]);

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchCurrent(e.targetTouches[0].clientX);
    setSwipeOffset(0);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const x = e.targetTouches[0].clientX;
    setTouchCurrent(x);
    setSwipeOffset(x - touchStart);
  };
  const onTouchEnd = useCallback(() => {
    if (touchStart !== null && touchCurrent !== null) {
      const d = touchStart - touchCurrent;
      if (d > 50) navigatePhoto("next");
      else if (d < -50) navigatePhoto("prev");
    }
    setTouchStart(null);
    setTouchCurrent(null);
    setSwipeOffset(0);
  }, [touchStart, touchCurrent, navigatePhoto]);

  const prevPhoto = getAdjacentPhoto("prev");
  const nextPhoto = getAdjacentPhoto("next");
  const visiblePhotos = allPhotos.slice(0, visibleCount);
  const hasMore = visibleCount < allPhotos.length;

  return (
    <main className="min-h-screen bg-[#0a0a0a] py-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        <Sidebar />

        <div className="flex-1">
          <div className="bg-[#1e1e1f] border border-[#383838] rounded-3xl overflow-hidden">
            <Navigation />

            <div className="p-8">
              <h2 className="text-3xl font-semibold text-white mb-8">Photo Gallery</h2>

              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                </div>
              ) : (
                <>
                  <div className="columns-2 md:columns-3 gap-4">
                    {visiblePhotos.map((photo, index) => (
                      <div
                        key={photo.name}
                        className="relative overflow-hidden rounded-2xl mb-4 break-inside-avoid cursor-pointer group"
                        style={
                          photo.width && photo.height
                            ? { aspectRatio: `${photo.width} / ${photo.height}` }
                            : undefined
                        }
                        onClick={() => openPhoto(photo)}
                      >
                        <img
                          src={photo.thumbSrc}
                          alt={photo.name}
                          loading="lazy"
                          ref={(img) => {
                            if (img?.complete) img.classList.replace("opacity-0", "opacity-100");
                          }}
                          onLoad={(e) =>
                            e.currentTarget.classList.replace("opacity-0", "opacity-100")
                          }
                          className="w-full h-full object-cover opacity-0 transition-all duration-500 group-hover:scale-110"
                          style={{ transitionDelay: `${(index % PAGE_SIZE) * 80}ms` }}
                        />
                      </div>
                    ))}
                  </div>

                  {hasMore && (
                    <div ref={sentinelRef} className="py-4 flex justify-center">
                      <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
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
            aria-label="Close"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* 3-panel swipe strip */}
          <div
            className="absolute top-0 flex h-full"
            style={{ width: "300vw", left: "-100vw", transform: `translateX(${swipeOffset}px)`, touchAction: "none" }}
          >
            {/* Prev */}
            <div className="w-screen h-full flex items-center justify-center p-4">
              {prevPhoto && (
                <img
                  src={buildUrl(prevPhoto.fullPath)}
                  alt={prevPhoto.name}
                  className="max-w-full max-h-[90vh] object-contain rounded-lg select-none"
                  onClick={(e) => e.stopPropagation()}
                  draggable={false}
                />
              )}
            </div>

            {/* Current */}
            <div className="w-screen h-full flex items-center justify-center p-4">
              {fullSrc ? (
                <img
                  src={fullSrc}
                  alt={selectedPhoto.name}
                  className="max-w-full max-h-[90vh] object-contain rounded-lg select-none"
                  onClick={(e) => e.stopPropagation()}
                  draggable={false}
                />
              ) : (
                <div className="relative flex items-center justify-center">
                  <img
                    src={selectedPhoto.thumbSrc}
                    alt={selectedPhoto.name}
                    className="max-w-full max-h-[90vh] object-contain rounded-lg select-none opacity-30"
                    onClick={(e) => e.stopPropagation()}
                    draggable={false}
                  />
                  <div className="absolute w-8 h-8 rounded-full border-2 border-white border-t-transparent animate-spin" />
                </div>
              )}
            </div>

            {/* Next */}
            <div className="w-screen h-full flex items-center justify-center p-4">
              {nextPhoto && (
                <img
                  src={buildUrl(nextPhoto.fullPath)}
                  alt={nextPhoto.name}
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
