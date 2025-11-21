import Sidebar from "@/components/Sidebar";
import Navigation from "@/components/Navigation";

export default function PhotographyPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] py-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        <Sidebar />

        <div className="flex-1">
          <div className="bg-[#1e1e1f] border border-[#383838] rounded-3xl overflow-hidden">
            <Navigation />

            <div className="p-8">
              <h2 className="text-3xl font-semibold text-white mb-8">Photography</h2>

              {/* Meet me Section */}
              <div className="mb-12">
                <h3 className="text-xl font-semibold text-white mb-4">Meet me:</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  I have over 10 years of experience taking photos, and have a deep passion to capture stories and emotions through the lens. Through a keen eye for detail and creative approach, I focus on the real, the raw, and the beautiful, creating visuals that feel as genuine as the people and places in them.
                </p>

                <p className="text-gray-300 leading-relaxed">
                  With a portfolio that reflects my passion for love, laughter, and adventure, I'm dedicated to delivering stunning, timeless photographs that you'll treasure for a lifetime.
                </p>
              </div>

              {/* Contact me Section */}
              <div className="mb-12">
                <h3 className="text-xl font-semibold text-white mb-4">Book:</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  I'm always looking for new opportunities to work with people and create stunning, timeless memories.
                  If you're interested in working with me, please reach out to me on instagram at <a href="https://www.instagram.com/daves.shoots/" className="text-primary hover:underline">@daves.shoots</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
