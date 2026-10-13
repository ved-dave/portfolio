import ClassicProjectsPage from "@/components/classic/pages/ProjectsPage";
import TerminalProjectsPage from "@/components/term/pages/ProjectsPage";
import { siteDesign } from "@/lib/design";

export default function Page() {
  return siteDesign === "terminal" ? <TerminalProjectsPage /> : <ClassicProjectsPage />;
}
