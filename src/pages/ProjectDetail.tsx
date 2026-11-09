import { Link, useParams } from "react-router";
import PageTransition from "../components/layout/PageTransition";
import ProjectHorizontalLayout from "../components/projects/ProjectHorizontalLayout";
import { projects } from "../data/projects";
import type { CSSProperties } from "react";

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
  const accent = project.detail?.accent;

  return (
    <PageTransition className="min-h-svh">
      {accent && <AccentGlow color={accent} />}
      <div style={accent ? ({ "--accent": accent } as CSSProperties) : undefined}>
        <ProjectHorizontalLayout key={project.id} project={project} next={next} />
      </div>
    </PageTransition>
  );  
}

function AccentGlow({ color }: { color: string }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-[5]"
      style={{
        background: `radial-gradient(55% 45% at 85% 15%, ${color}40, transparent 70%), radial-gradient(40% 40% at 10% 90%, ${color}25, transparent 70%)`,
      }}
    />
  );
}