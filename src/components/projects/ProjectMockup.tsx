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

  const gloss = (
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
  );

  /* ---------- Apps móviles: solo celulares ---------- */
  if (project.device === "mobile") {
    const back = project.detail?.screens[1]?.image ?? mobileImage ?? image;
    const phone =
      "absolute overflow-hidden rounded-[4cqw] border-[1cqw] border-[#14101c] shadow-[0_25px_40px_-10px_rgba(0,0,0,0.7)]";

    return (
      <div className="@container relative aspect-[16/10] w-full">
        {/* Celular de atrás */}
        <div
          className={`${phone} left-[24cqw] top-[10cqw] h-[56cqw] w-[26cqw]`}
          style={{
            background: bg,
            transform: "perspective(500px) rotateY(24deg) rotate(-8deg)",
          }}
        >
          {shot(back)}
          {gloss}
        </div>
        {/* Celular de adelante */}
        <div
          className={`${phone} left-[48cqw] top-[2cqw] h-[60cqw] w-[28cqw]`}
          style={{
            background: bg,
            transform: "perspective(500px) rotateY(-20deg) rotate(6deg)",
          }}
        >
          {shot(mobileImage ?? image)}
          {gloss}
        </div>
      </div>
    );
  }

  /* ---------- Web: laptop + celular ---------- */
  return (
    <div className="@container relative aspect-[16/10] w-full drop-shadow-[0_20px_25px_rgba(0,0,0,0.5)]">
      <div
        className="absolute left-[2cqw] top-[6cqw] h-[48cqw] w-[78cqw] overflow-hidden rounded-[2cqw] border-[1cqw] border-[#14101c]"
        style={{ background: bg }}
      >
        {shot(image)}
        {gloss}
      </div>
      <div className="absolute left-0 top-[53.5cqw] h-[3cqw] w-[82cqw] rounded-b-[2cqw] rounded-t-[0.5cqw] bg-gradient-to-b from-[#cfc6dc] to-[#7d7390]" />

      <div
        className="absolute bottom-[2cqw] right-[1cqw] h-[44cqw] w-[21cqw] overflow-hidden rounded-[3.5cqw] border-[0.8cqw] border-[#14101c]"
        style={{ background: bg }}
      >
        {shot(mobileImage ?? image)}
        {gloss}
      </div>
    </div>
  );
}