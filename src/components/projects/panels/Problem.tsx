import { motion } from "motion/react";
import type { DetailData } from "./types";
import { Panel, Reveal, SectionTitle, reveal } from "./shared";

export default function Problem({
  data,
  n,
}: {
  data: NonNullable<DetailData["problem"]>;
  n: string;
}) {
  return (
    <Panel className="lg:w-[46vw] lg:min-w-[520px]">
      <Reveal>
        <SectionTitle n={n} title="Problema" />
      </Reveal>
      <Reveal delay={0.1} className="mt-6">
        <p className="max-w-xl leading-relaxed opacity-80 lg:text-[clamp(1rem,1.3vw,1.3rem)]">{data.text}</p>
      </Reveal>
      <p className="mt-8 text-sm uppercase tracking-wider opacity-50">Antes</p>
      <ul className="mt-3 max-w-xl space-y-3">
        {data.before.map((item, i) => (
          <motion.li
            key={item}
            {...reveal(0.15 + i * 0.08)}
            className="flex gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm lg:text-base"
          >
            <span aria-hidden className="opacity-60">✕</span>
            {item}
          </motion.li>
        ))}
      </ul>
    </Panel>
  );
}