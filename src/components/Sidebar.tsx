"use client";

import { useState, useEffect } from "react";
import { Mail, Calendar, MapPin, Linkedin, Twitter, Github, Instagram, X, Menu, Download } from "lucide-react";

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    setCurrentDate(`${days[now.getDay()]} ${months[now.getMonth()]} ${now.getDate()} ${now.getFullYear()}`);
  }, []);

  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 w-12 h-12 bg-[#1e1e1f] border border-[#383838] rounded-xl flex items-center justify-center"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`lg:w-80 bg-[#1e1e1f] border border-[#383838] rounded-3xl p-6 lg:sticky lg:top-8 lg:h-fit transition-all ${
          sidebarOpen ? "block" : "hidden lg:block"
        }`}
      >
        <div className="mb-6">
          <div className="flex items-start gap-4">
            <img
              src="https://ext.same-assets.com/1816051347/4031630246.png"
              alt="Ved Dave"
              className="w-20 h-20 rounded-3xl"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-white mb-2">Ved Dave</h1>
              <div className="flex flex-wrap gap-2">
                <p className="text-sm text-gray-400 bg-[#2b2b2c] px-3 py-1 rounded-lg">
                  Software Engineer
                </p>
                <p className="text-sm text-gray-400 bg-[#2b2b2c] px-3 py-1 rounded-lg">
                  Photographer
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 border-t border-[#383838] pt-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#2b2b2c] rounded-xl flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase mb-1">Email</p>
                <a href="mailto:me@hveddave.com" className="text-sm text-white hover:text-primary">
                  me@veddave.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#2b2b2c] rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase mb-1">Location</p>
                <p className="text-sm text-white">Seattle, WA</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#2b2b2c] rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase mb-1">Today</p>
                <time className="text-sm text-white">{currentDate}</time>
              </div>
            </div>
          </div>

          <div className="border-t border-[#383838] pt-6">
            <div className="flex gap-3 justify-center">
              <a
                href="https://www.linkedin.com/in/ved-dave-b715ab152/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#2b2b2c] rounded-xl flex items-center justify-center hover:bg-[#383838] transition-colors"
              >
                <Linkedin className="w-5 h-5 text-gray-300" />
              </a>
              <a
                href="https://github.com/ved-dave"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#2b2b2c] rounded-xl flex items-center justify-center hover:bg-[#383838] transition-colors"
              >
                <Github className="w-5 h-5 text-gray-300" />
              </a>
              <a
                href="https://www.instagram.com/daves.shoots/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#2b2b2c] rounded-xl flex items-center justify-center hover:bg-[#383838] transition-colors"
              >
                <Instagram className="w-5 h-5 text-gray-300" />
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
