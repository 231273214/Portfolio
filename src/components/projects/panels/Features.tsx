import { motion } from "motion/react";
import { Panel, Reveal, SectionTitle, reveal } from "./shared";

export default function Features({
  items,
  n,
  title = "Funcionalidades",
}: {
  items: { title: string; text: string }[];
  n: string;
  title?: string;
}) {
  return (
    <Panel className="lg:w-[68vw]">
      <Reveal>
        <SectionTitle n={n} title={title} />
      </Reveal>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((f, i) => (
          <motion.li
            key={f.title}
            {...reveal(i * 0.08)}
            className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/5 p-6 transition duration-300 hover:-translate-y-1.5 hover:border-[var(--accent,#b36bff)]"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
              style={{ background: "var(--accent, #b36bff)" }}
            />
            <p className="text-4xl opacity-30">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-3 text-lg">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed opacity-70">{f.text}</p>
          </motion.li>
        ))}
      </ul>
    </Panel>
  );
}