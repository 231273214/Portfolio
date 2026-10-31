import { Link } from "react-router";
import PageTransition from "../components/layout/PageTransition";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <PageTransition>
      <h1 className="mb-6 text-4xl">Projects (ProjectsGrid)</h1>
      <ul className="space-y-2">
        {projects.map((p) => (
          <li key={p.id}>
            <Link to={`/projects/${p.id}`} className="underline">
              {p.title}
            </Link>
          </li>
        ))}
      </ul>
    </PageTransition>
  );
}