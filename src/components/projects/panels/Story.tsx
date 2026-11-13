import { motion } from "motion/react";
import type { DetailData } from "./types";
import { Panel, Reveal, SectionTitle, reveal } from "./shared";

export default function Story({
  data,
  n,
}: {
  data: NonNullable<DetailData["story"]>;
  n: string;
}) {
  return (
    <Panel className="lg:w-[62vw]">
      <Reveal>
        <SectionTitle n={n} title={data.title ?? "Historia"} />
      </Reveal>
      <Reveal delay={0.1} className="mt-8">
        <p className="max-w-2xl leading-relaxed opacity-90 lg:text-[clamp(1.1rem,1.7vw,1.7rem)]">
          {data.text}
        </p>
      </Reveal>
      <ul className="mt-10 grid gap-4 sm:grid-cols-3">
        {data.moments.map((m, i) => (
          <motion.li
            key={m.title}
            {...reveal(0.15 + i * 0.1)}
            className="rounded-2xl border border-white/20 bg-white/5 p-5"
          >
            <p className="text-sm text-[var(--accent,#b36bff)]">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-2 text-lg">{m.title}</h3>
            <p className="mt-2 text-sm leading-relaxed opacity-70">{m.text}</p>
          </motion.li>
        ))}
      </ul>
    </Panel>
  );
}