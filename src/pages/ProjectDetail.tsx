import { Link, useParams } from "react-router";
import PageTransition from "../components/layout/PageTransition";
import { projects } from "../data/projects";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  return (
    <PageTransition>
      {project ? (
        <>
          <h1 className="text-4xl">{project.title}</h1>
          <p className="mt-2 opacity-70">{project.description}</p>
        </>
      ) : (
        <h1 className="text-4xl">Proyecto no encontrado</h1>
      )}
      <Link to="/projects" className="mt-6 inline-block underline">
        ← Volver
      </Link>
    </PageTransition>
  );
}