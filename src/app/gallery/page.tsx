import Sidebar from "@/components/Sidebar";
import Navigation from "@/components/Navigation";

export default function PhotosPage() {
  const photos = [
    "https://ext.same-assets.com/1816051347/3996281363.jpeg",
    "https://ext.same-assets.com/1816051347/1999884834.jpeg",
    "https://ext.same-assets.com/1816051347/2509484976.jpeg",
    "https://ext.same-assets.com/1816051347/4123148770.jpeg",
    "https://ext.same-assets.com/1816051347/519202120.jpeg",
    "https://ext.same-assets.com/1816051347/4027616067.jpeg",
    "https://ext.same-assets.com/1816051347/2787122584.jpeg",
    "https://ext.same-assets.com/1816051347/618681613.jpeg",
    "https://ext.same-assets.com/1816051347/2345037910.jpeg",
    "https://ext.same-assets.com/1816051347/2245256522.jpeg",
    "https://ext.same-assets.com/1816051347/815901818.jpeg",
    "https://ext.same-assets.com/1816051347/2455412519.jpeg",
    "https://ext.same-assets.com/1816051347/2865029470.jpeg",
    "https://ext.same-assets.com/1816051347/43177396.jpeg",
    "https://ext.same-assets.com/1816051347/3973614614.jpeg",
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0a] py-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        <Sidebar />

        <div className="flex-1">
          <div className="bg-[#1e1e1f] border border-[#383838] rounded-3xl overflow-hidden">
            <Navigation />

            <div className="p-8">
              <h2 className="text-3xl font-semibold text-white mb-8">Photo Gallery</h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {photos.map((photo, index) => (
                  <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <img
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
