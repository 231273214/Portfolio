import type { Project } from "../../data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const { hue } = project;

  return (
    <div className="@container group relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/25 shadow-[0_24px_40px_-10px_rgba(0,0,0,0.55)]">
      {/* Fondo / imagen */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, hsl(${hue} 55% 32%), hsl(${hue + 40} 65% 12%))`,
        }}
      />
      {project.image ? (
        <img
          src={project.image}
          alt=""
          loading="lazy"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <span className="absolute left-[7%] top-[4%] text-[34cqw] leading-none opacity-20">
          {project.title.slice(-1)}
        </span>
      )}

      {/* Brillo diagonal tipo cristal */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Barra inferior */}
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-[4cqw] bg-gradient-to-t from-black/75 via-black/40 to-transparent px-[5cqw] pb-[4cqw] pt-[10cqw]">
        <div className="min-w-0 text-left">
          <p className="truncate text-[7.5cqw] leading-tight">{project.title}</p>
          <p className="truncate text-[5.5cqw] opacity-70">{project.category}</p>
        </div>
        <span className="ml-auto text-[8cqw] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
          ↗
        </span>
      </div>
    </div>
  );
}