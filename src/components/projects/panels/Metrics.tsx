import { motion } from "motion/react";
import type { DetailData } from "./types";
import { CountUp, Panel, Reveal, SectionTitle, reveal } from "./shared";

export default function Metrics({
  metrics,
  n,
}: {
  metrics: NonNullable<DetailData["metrics"]>;
  n: string;
}) {
  return (
    <Panel className="lg:w-[62vw]">
      <Reveal>
        <SectionTitle n={n} title="Resultados" />
      </Reveal>
      <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]">
        {metrics.map((m, i) => (
          <motion.li
            key={m.label}
            {...reveal(i * 0.1)}
            className="rounded-2xl border border-white/20 bg-white/10 p-6"
          >
            <p className="text-4xl leading-none tabular-nums sm:text-5xl lg:text-[clamp(2.6rem,4.2vw,4.5rem)]">
              <CountUp value={m.value} prefix={m.prefix} />
              {m.suffix && <span className="text-[0.55em] opacity-70">{m.suffix}</span>}
            </p>
            <p className="mt-3 text-sm opacity-70">{m.label}</p>
          </motion.li>
        ))}
      </ul>
    </Panel>
  );
}