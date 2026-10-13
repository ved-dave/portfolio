import { redirect } from "next/navigation";
import ExperiencePage from "@/components/classic/pages/ExperiencePage";
import { siteDesign } from "@/lib/design";

export default function Page() {
  if (siteDesign === "terminal") redirect("/#experience");
  return <ExperiencePage />;
}
