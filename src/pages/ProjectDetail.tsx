import { Link, useParams } from "react-router";
import PageTransition from "../components/layout/PageTransition";
import ProjectHorizontalLayout from "../components/projects/ProjectHorizontalLayout";
import { projects } from "../data/projects";

export default function ProjectDetail() {
  const { id } = useParams();
  const index = projects.findIndex((p) => p.id === id);

  if (index === -1) {
    return (
      <PageTransition>
        <h1 className="text-4xl">Proyecto no encontrado</h1>
        <Link to="/projects" className="mt-6 inline-block underline">
          ← Volver
        </Link>
      </PageTransition>
    );
  }

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <PageTransition className="min-h-svh">
      <ProjectHorizontalLayout key={project.id} project={project} next={next} />
    </PageTransition>
  );
}