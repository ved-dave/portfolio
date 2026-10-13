import PageLayout from "@/components/classic/PageLayout";
import ExperienceTimeline from "@/components/classic/ExperienceTimeline";
import { workExperience } from "@/data/experience";

export default function ExperiencePage() {
  return (
    <PageLayout title="Work Experience">
      <ExperienceTimeline entries={workExperience} />
    </PageLayout>
  );
}
