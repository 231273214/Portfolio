import { useState } from "react";
import { motion } from "motion/react";
import type { Project } from "../../../data/projects";
import { Panel, Reveal, SectionTitle, Shot, gradient, reveal } from "./shared";

function BeforeAfter({
  project,
  beforeImage,
  afterImage,
}: {
  project: Project;
  beforeImage?: string;
  afterImage?: string;
}) {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative w-full select-none overflow-hidden rounded-xl border border-white/25 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
      <Shot image={beforeImage} bg="linear-gradient(135deg,#8a8697,#3d3a47)" label="Antes" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <Shot image={afterImage} bg={gradient(project.hue)} label="Después" fill />
      </div>

      <span className="absolute left-3 top-3 rounded-full bg-black/40 px-3 py-1 text-xs">Antes</span>
      <span className="absolute right-3 top-3 rounded-full bg-black/40 px-3 py-1 text-xs">Después</span>

      {/* Línea y manija */}
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/60 bg-black/40 text-sm backdrop-blur-sm">
          ↔
        </span>
      </div>

      {/* Control real: da arrastre, táctil y teclado gratis */}
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Comparar antes y después"
        className="absolute inset-0 h-full w-full cursor-col-resize opacity-0"
      />
    </div>
  );
}

export default function Solution({ project, n }: { project: Project; n: string }) {
  const data = project.detail?.solution;
  if (!data) return null;

  return (
    <Panel className="lg:w-[74vw]">
      <Reveal>
        <SectionTitle n={n} title="Solución" />
      </Reveal>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.25fr] lg:items-center lg:gap-12">
        <div>
          <Reveal delay={0.1}>
            <p className="max-w-xl leading-relaxed opacity-80 lg:text-[clamp(1rem,1.3vw,1.3rem)]">{data.text}</p>
          </Reveal>
          <p className="mt-6 text-sm uppercase tracking-wider opacity-50">Después</p>
          <ul className="mt-3 space-y-3">
            {data.after.map((item, i) => (
              <motion.li
                key={item}
                {...reveal(0.15 + i * 0.08)}
                className="flex gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm lg:text-base"
              >
                <span aria-hidden>✓</span>
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
        <Reveal delay={0.2}>
          <BeforeAfter project={project} beforeImage={data.beforeImage} afterImage={data.afterImage} />
        </Reveal>
      </div>
    </Panel>
  );
}