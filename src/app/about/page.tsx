"use client";

import { useState, useEffect, useMemo } from "react";
import Sidebar from "@/components/Sidebar";
import Navigation from "@/components/Navigation";

export default function AboutPage() {
  const [typingText, setTypingText] = useState("Foo");
  const typingWords = useMemo(() => ["Software Engineer", "Freelance Photographer", "World Traveler"], []);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = typingWords[wordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentWord.length) {
        setTypingText(currentWord.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setTypingText(currentWord.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === currentWord.length) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setWordIndex((wordIndex + 1) % typingWords.length);
      }
    }, isDeleting ? 50 : 150);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, typingWords]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] py-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        <Sidebar />

        <div className="flex-1">
          <div className="bg-[#1e1e1f] border border-[#383838] rounded-3xl overflow-hidden">
            <Navigation />

            <div className="p-8 space-y-12">
              <div>
                <h2 className="text-3xl font-semibold text-white mb-8">About me</h2>

                <div className="text-2xl mb-12">
                  <span className="text-white">I am a </span>
                  <span className="text-primary font-medium">{typingText}</span>
                  <span className="text-primary animate-pulse">|</span>
                </div>
              </div>

              {/* What I'm Doing */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-6">What i'm doing</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-[#2b2b2c] border border-[#383838] rounded-2xl p-6 flex gap-4">
                    <img src="https://ext.same-assets.com/1816051347/2980190298.svg" alt="" className="w-12 h-12" />
                    <div>
                      <h4 className="text-lg font-medium text-white mb-2">Developing</h4>
                      <p className="text-sm text-gray-400">
                        Solving cutting edge challenges one line of code at a time.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-[#2b2b2c] border border-[#383838] rounded-2xl p-6 flex gap-4">
                    <img src="https://ext.same-assets.com/1816051347/2864867971.svg" alt="" className="w-12 h-12" />
                    <div>
                      <h4 className="text-lg font-medium text-white mb-2">Dining</h4>
                      <p className="text-sm text-gray-400">
                        Trying different kinds of food from around the globe.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#2b2b2c] border border-[#383838] rounded-2xl p-6 flex gap-4">
                    <img src="https://ext.same-assets.com/1816051347/2026831275.svg" alt="" className="w-12 h-12" />
                    <div>
                      <h4 className="text-lg font-medium text-white mb-2">Travel</h4>
                      <p className="text-sm text-gray-400">
                        Exploring every corner of our beautiful planet.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#2b2b2c] border border-[#383838] rounded-2xl p-6 flex gap-4">
                    <img src="https://ext.same-assets.com/1816051347/3776952347.svg" alt="" className="w-12 h-12" />
                    <div>
                      <h4 className="text-lg font-medium text-white mb-2">Photography</h4>
                      <p className="text-sm text-gray-400">
                        Narrating stories and emotions through the lens.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Takes */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-6">Takes</h3>

                <div className="space-y-4">
                  <div className="bg-[#2b2b2c] border border-[#383838] rounded-2xl p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src="https://ext.same-assets.com/1816051347/1685380556.png"
                        alt="Aubrey Graham"
                        className="w-14 h-14 rounded-2xl"
                      />
                      <h4 className="text-lg font-medium text-white">Aubrey Graham</h4>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Take Care &gt; Nothing was the Same &gt; If Youre Reading This Its Too Late &gt; Views &gt; What a Time to Be Alive &gt; Her Loss &gt; Honestly, Nevermind &gt; Thank Me Later &gt; Certified Lover Boy &gt; More Life &gt; So Far Gone &gt; Scorpion
                    </p>
                  </div>

                  <div className="bg-[#2b2b2c] border border-[#383838] rounded-2xl p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src="https://ext.same-assets.com/1816051347/300732313.png"
                        alt="Abel Tesfaye"
                        className="w-14 h-14 rounded-2xl"
                      />
                      <h4 className="text-lg font-medium text-white">Abel Tesfaye</h4>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Trilogy/House of Balloons &gt; Beauty Behind the Madness &gt; Starboy &gt; My Dear Melancholy &gt; Kiss Land &gt; After Hours &gt; Dawn FM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
