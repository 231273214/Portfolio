import type { Project } from "../../data/projects";

export default function ProjectMockup({ project }: { project: Project }) {
  const { hue, image, mobileImage, title } = project;
  const bg = `linear-gradient(135deg, hsl(${hue} 55% 32%), hsl(${hue + 40} 65% 12%))`;

  const shot = (src?: string) =>
    src ? (
      <img
        src={src}
        alt=""
        loading="lazy"
        draggable={false}
        className="h-full w-full object-cover object-top"
      />
    ) : (
      <span className="absolute left-[8%] top-0 text-[22cqw] leading-none opacity-25">
        {title.slice(-1)}
      </span>
    );

  return (
    <div className="@container relative aspect-[16/10] w-full drop-shadow-[0_20px_25px_rgba(0,0,0,0.5)]">
      {/* Laptop: pantalla */}
      <div
        className="absolute left-[2cqw] top-[6cqw] h-[48cqw] w-[78cqw] overflow-hidden rounded-[2cqw] border-[1cqw] border-[#14101c]"
        style={{ background: bg }}
      >
        {shot(image)}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
      </div>
      {/* Laptop: base */}
      <div className="absolute left-0 top-[53.5cqw] h-[3cqw] w-[82cqw] rounded-b-[2cqw] rounded-t-[0.5cqw] bg-gradient-to-b from-[#cfc6dc] to-[#7d7390]" />

      {/* Celular */}
      <div
        className="absolute bottom-[2cqw] right-[1cqw] h-[44cqw] w-[21cqw] overflow-hidden rounded-[3.5cqw] border-[0.8cqw] border-[#14101c]"
        style={{ background: bg }}
      >
        {shot(mobileImage ?? image)}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
      </div>
    </div>
  );
}