import { motion } from "motion/react";
import type { DetailData } from "./types";
import { Panel, Reveal, SectionTitle, reveal } from "./shared";

export default function Process({
  steps,
  n,
}: {
  steps: NonNullable<DetailData["process"]>;
  n: string;
}) {
  return (
    <Panel className="lg:w-auto">
      <Reveal>
        <SectionTitle n={n} title="Proceso" />
      </Reveal>
      <ol className="mt-12 flex flex-col gap-8 lg:flex-row">
        {steps.map((s, i) => (
          <motion.li
            key={s.title}
            {...reveal(i * 0.1)}
            className="relative border-t border-white/30 pt-6 lg:w-[21vw] lg:min-w-[240px]"
          >
            <span
              aria-hidden
              className="absolute -top-[7px] left-0 h-3 w-3 rounded-full bg-[var(--accent,#b36bff)] shadow-[0_0_12px_var(--accent,#b36bff)]"
            />
            <p className="text-5xl opacity-30">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-2 text-xl">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed opacity-70">{s.text}</p>
          </motion.li>
        ))}
      </ol>
    </Panel>
  );
}