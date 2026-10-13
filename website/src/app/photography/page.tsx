import ClassicPhotographyPage from "@/components/classic/pages/PhotographyPage";
import TerminalPhotographyPage from "@/components/term/pages/PhotographyPage";
import { siteDesign } from "@/lib/design";

export default function Page() {
  return siteDesign === "terminal" ? <TerminalPhotographyPage /> : <ClassicPhotographyPage />;
}
