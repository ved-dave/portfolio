import PageLayout from "@/components/classic/PageLayout";
import ProjectCard from "@/components/classic/ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <PageLayout title="Projects">
      <div className="space-y-6">
        {projects.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </div>
    </PageLayout>
  );
}
