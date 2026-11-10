import type { Project } from "../../data/projects";

export default function ProjectPhone({ project }: { project: Project }) {
  const src = project.mobileImage ?? project.image;
  const bg = `linear-gradient(135deg, hsl(${project.hue} 55% 32%), hsl(${project.hue + 40} 65% 12%))`;

  return (
    <div className="@container relative aspect-[16/10] w-full">
      <div
        className="absolute left-1/2 top-0 h-[60cqw] w-[28cqw] -translate-x-1/2 overflow-hidden rounded-[4cqw] border-[1cqw] border-[#14101c] shadow-[0_25px_40px_-10px_rgba(0,0,0,0.7)]"
        style={{ background: bg }}
      >
        {src ? (
          <img
            src={src}
            alt=""
            loading="lazy"
            draggable={false}
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <span className="absolute left-[10%] top-0 text-[30cqw] leading-none opacity-25">
            {project.title.slice(-1)}
          </span>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
      </div>
      {/* Nombre bajo el celular. Bórralo si lo quieres sin texto */}
      <p className="absolute inset-x-0 top-[64cqw] truncate text-center text-[6cqw]">
        {project.title}
      </p>
    </div>
  );
}