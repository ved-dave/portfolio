import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <SiteHeader />
      <main className="mx-auto max-w-page px-5 pt-10 sm:pt-14">{children}</main>
      <SiteFooter />
    </div>
  );
}
