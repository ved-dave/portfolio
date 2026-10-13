import { redirect } from "next/navigation";
import HomePage from "@/components/term/pages/HomePage";
import { siteDesign } from "@/lib/design";

export default function Page() {
  if (siteDesign === "classic") redirect("/about");
  return <HomePage />;
}
