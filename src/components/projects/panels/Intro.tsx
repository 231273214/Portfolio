import { Link } from "react-router";
import { motion } from "motion/react";
import type { Project } from "../../../data/projects";
import { useSound } from "../../../hooks/useSound";
import { Panel, Reveal } from "./shared";

export default function Intro({ project }: { project: Project }) {
  const d = project.detail;
  const stack = d?.stack ?? project.tags;
  const { onHover, onClick } = useSound();
  const btn =
    "rounded-full border border-white/40 bg-white/20 px-5 py-2 text-sm transition hover:bg-white/30";

  return (
    <Panel className="lg:w-[40vw] lg:min-w-[520px]">
      <div className="lg:pl-[3vw]">
        <Reveal>
          <Link
            to="/projects"
            onMouseEnter={onHover}
            onClick={onClick}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm transition hover:bg-white/20"
          >
            <span aria-hidden>←</span> Mirar más proyectos
          </Link>
        </Reveal>

        <Reveal delay={0.08} className="mt-8">
          <h1 className="text-4xl leading-[1.05] lg:text-[clamp(2.4rem,3.6vw,4rem)]">{project.title}</h1>
          <p className="mt-2 text-lg opacity-80 lg:text-[clamp(1.1rem,1.5vw,1.6rem)]">{project.subtitle}</p>
        </Reveal>

        <Reveal delay={0.16} className="mt-5">
          <p className="max-w-[34rem] leading-relaxed opacity-75 lg:text-[clamp(0.95rem,1.1vw,1.15rem)]">
            {project.description}
          </p>
        </Reveal>

        {d && (
          <Reveal delay={0.24} className="mt-6">
            <dl
              className="grid max-w-[34rem] gap-4 border-y border-white/15 py-4 text-sm"
              style={{ gridTemplateColumns: `repeat(${d.status ? 4 : 3}, minmax(0, 1fr))` }}
            >
              {[
                { k: "Rol", v: d.role },
                { k: "Año", v: d.year },
                { k: "Duración", v: d.duration },
                ...(d.status ? [{ k: "Estado", v: d.status }] : []),
              ].map(({ k, v }) => (
                <div key={k}>
                  <dt className="text-xs uppercase tracking-wider opacity-50">{k}</dt>
                  <dd className="mt-1">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}

        <Reveal delay={0.32}>
          <ul className="mt-5 flex flex-wrap gap-2">
            {stack.map((s) => (
              <li key={s} className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs">
                {s}
              </li>
            ))}
          </ul>
        </Reveal>

        {(d?.links.site || d?.links.github) && (
          <Reveal delay={0.4} className="mt-6 flex flex-wrap gap-3">
            {d.links.site && (
              <a href={d.links.site} target="_blank" rel="noopener noreferrer" className={btn} onMouseEnter={onHover} onClick={onClick}>
                Ir al sitio web ↗
              </a>
            )}
            {d.links.github && (
              <a href={d.links.github} target="_blank" rel="noopener noreferrer" className={btn} onMouseEnter={onHover} onClick={onClick}>
                Ver GitHub ↗
              </a>
            )}
          </Reveal>
        )}

        <p className="mt-10 hidden items-center gap-3 text-sm opacity-60 lg:flex">
          Haz scroll para explorar
          <motion.span
            aria-hidden
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </p>
      </div>
    </Panel>
  );
}