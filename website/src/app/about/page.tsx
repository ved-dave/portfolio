import { redirect } from "next/navigation";
import AboutPage from "@/components/classic/pages/AboutPage";
import { siteDesign } from "@/lib/design";

export default function Page() {
  if (siteDesign === "terminal") redirect("/");
  return <AboutPage />;
}
