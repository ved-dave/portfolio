import Sidebar from "@/components/Sidebar";
import Navigation from "@/components/Navigation";

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <main className="min-h-screen bg-[#0a0a0a] py-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        <Sidebar />

        <div className="flex-1">
          <div className="bg-[#1e1e1f] border border-[#383838] rounded-3xl overflow-hidden">
            <Navigation />

            <div className="p-8">
              <h2 className="text-3xl font-semibold text-white mb-10">{title}</h2>
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
