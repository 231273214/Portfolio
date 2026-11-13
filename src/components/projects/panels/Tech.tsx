import { motion } from "motion/react";
import { Panel, Reveal, SectionTitle, reveal } from "./shared";

export default function Tech({
  groups,
  n,
}: {
  groups: { label: string; items: string[] }[];
  n: string;
}) {
  return (
    <Panel className="lg:w-[56vw]">
      <Reveal>
        <SectionTitle n={n} title="Tecnología" />
      </Reveal>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {groups.map((g, i) => (
          <motion.div
            key={g.label}
            {...reveal(i * 0.08)}
            className="rounded-2xl border border-white/20 bg-white/5 p-5"
          >
            <p className="text-xs uppercase tracking-wider opacity-50">{g.label}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {g.items.map((it) => (
                <li key={it} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm">
                  {it}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Panel>
  );
}