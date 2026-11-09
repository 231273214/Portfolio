import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import type { Project } from "../../data/projects";
import SwapText from "../ui/SwapText";
import { useSound } from "../../hooks/useSound";

export interface PanelDef {
  id: string;
  label: string;
  node: ReactNode;
}

/* ---------- Utilidades ---------- */

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div {...reveal(delay)} className={className}>
      {children}
    </motion.div>
  );
}

function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`w-full lg:flex lg:h-full lg:shrink-0 lg:flex-col lg:justify-center lg:px-[4vw] lg:pb-16 lg:pt-24 ${className}`}
    >
      {children}
    </div>
  );
}

function SectionTitle({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="text-xl opacity-50 lg:text-2xl">{n}</span>
      <h2 className="text-4xl leading-none lg:text-[clamp(2.6rem,4.4vw,5rem)]">{title}</h2>
    </div>
  );
}

function CountUp({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduced = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) return setN(value);
    const controls = animate(0, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduced]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {n}
      {suffix}
    </span>
  );
}

const gradient = (hue: number) =>
  `linear-gradient(135deg, hsl(${hue} 55% 32%), hsl(${hue + 40} 65% 12%))`;

function Shot({image, bg, label, fill = false, className = "",
}: {
  image?: string;
  bg: string;
  label: string;
  fill?: boolean; 
  className?: string;
}) {
  return (
    <div className={fill ? "absolute inset-0" : "relative"} style={{ background: bg }}>
      {image ? (
        <img
          src={image}
          alt=""
          draggable={false}
          className={fill ? "h-full w-full object-cover" : `block h-auto w-full ${className}`}
        />
      ) : (
        <div className={fill ? "h-full w-full" : "aspect-[16/10] w-full"}>
          <span className="absolute inset-0 grid place-items-center text-2xl opacity-40">
            {label}
          </span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent" />
    </div>
  );
}

/* ---------- Paneles ---------- */

function Intro({ project }: { project: Project }) {
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
            <dl className="grid max-w-[34rem] grid-cols-3 gap-4 border-y border-white/15 py-4 text-sm">
              {[
                { k: "Rol", v: d.role },
                { k: "Año", v: d.year },
                { k: "Duración", v: d.duration },
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

function ScreenPanel({
  project,
  screen,
  index,
  total,
}: {
  project: Project;
  screen: { label: string; image?: string };
  index: number;
  total: number;
}) {
  return (
    <Panel className="lg:w-[64vw]">
      <motion.div {...reveal()} whileHover={{ scale: 1.015 }} className="w-full lg:w-fit lg:max-w-[54vw]">
        <div className="overflow-hidden rounded-xl border border-white/25 bg-black/30 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/10 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#06d6a0]" />
            <span className="ml-3 truncate rounded-md bg-black/20 px-3 py-0.5 text-xs opacity-70">
              {project.title} · {screen.label}
            </span>
          </div>
          <Shot
            image={screen.image}
            bg={gradient(project.hue)}
            label={screen.label}
            className="lg:w-auto lg:max-h-[62svh] lg:max-w-[54vw]"
          />
        </div>
      </motion.div>
      <p className="mt-4 text-sm opacity-70">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} — {screen.label}
      </p>
    </Panel>
  );
}

function Problem({ data, n }: { data: NonNullable<Project["detail"]>["problem"]; n: string }) {
  if (!data) return null;
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
      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-white"
        style={{ left: `${pos}%` }}
      >
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

function Solution({ project, n }: { project: Project; n: string }) {
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

function Process({ steps, n }: { steps: NonNullable<Project["detail"]>["process"]; n: string }) {
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

function Metrics({ metrics, n }: { metrics: NonNullable<NonNullable<Project["detail"]>["metrics"]>; n: string }) {
  return (
    <Panel className="lg:w-[62vw]">
      <Reveal>
        <SectionTitle n={n} title="Resultados" />
      </Reveal>
      <ul className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-5">
        {metrics.map((m, i) => (
          <motion.li
            key={m.label}
            {...reveal(i * 0.1)}
            className="rounded-2xl border border-white/20 bg-white/10 p-6"
          >
            <p className="text-5xl leading-none lg:text-[clamp(2.6rem,4.2vw,4.5rem)] tabular-nums">
              <CountUp value={m.value} prefix={m.prefix} />
              
              {m.suffix && (
                <span className="text-[0.55em] opacity-70">{m.suffix}</span>
              )}
            </p>
            <p className="mt-3 text-sm opacity-70">{m.label}</p>
          </motion.li>
        ))}
      </ul>
    </Panel>
  );
}

function Outro({ next }: { next: Project }) {
  const { onHover, onClick } = useSound();
  const pill = "rounded-full border border-white/30 px-5 py-2 text-sm transition hover:bg-white/15";
  return (
    <Panel className="lg:w-[70vw]">
      <Reveal>
        <p className="text-sm uppercase tracking-wider opacity-50">Siguiente proyecto</p>
      </Reveal>
      <Reveal delay={0.1} className="mt-4">
        <Link to={`/projects/${next.id}`} onMouseEnter={onHover} onClick={onClick} className="inline-block">
          <SwapText
            text={next.title}
            swap="ver proyecto →"
            className="text-[clamp(2.5rem,7vw,7rem)]"
          />
        </Link>
      </Reveal>
      <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center gap-4">
        <Link to="/work-with-me" onMouseEnter={onHover} onClick={onClick} className={`${pill} bg-white/15`}>
          ¿Te interesa algo así? Trabajemos juntos →
        </Link>
        <Link to="/projects" onMouseEnter={onHover} onClick={onClick} className={pill}>
          Volver a proyectos
        </Link>
      </Reveal>
    </Panel>
  );
}

function Features({ items, n }: { items: { title: string; text: string }[]; n: string }) {
  return (
    <Panel className="lg:w-[68vw]">
      <Reveal>
        <SectionTitle n={n} title="Funcionalidades" />
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

function Tech({ groups, n }: { groups: { label: string; items: string[] }[]; n: string }) {
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

/* ---------- Ensamblado ---------- */

export function buildPanels(project: Project, next: Project): PanelDef[] {
  const d = project.detail;
  let count = 0; 
  const num = () => String(++count).padStart(2, "0");
  
  const panels: PanelDef[] = [{ id: "intro", label: "Intro", node: <Intro project={project} /> }];

  const screens = d?.screens?.length ? d.screens : [{ label: "Pantalla principal" }];
  screens.forEach((screen, i) =>
    panels.push({
      id: `screen-${i}`,
      label: "Pantallas",
      node: <ScreenPanel project={project} screen={screen} index={i} total={screens.length} />,
    })
  );

  if (d?.problem) panels.push({ id: "problem", label: "Problema", node: <Problem data={d.problem} n={num()} /> });
  if (d?.solution) panels.push({ id: "solution", label: "Solución", node: <Solution project={project} n={num()} /> });
  if (d?.features?.length) panels.push({ id: "features", label: "Funciones", node: <Features items={d.features} n={num()} /> });
  if (d?.stackGroups?.length) panels.push({ id: "tech", label: "Tecnología", node: <Tech groups={d.stackGroups} n={num()} /> });
  if (d?.process?.length) panels.push({ id: "process", label: "Proceso", node: <Process steps={d.process} n={num()} /> });
  if (d?.metrics?.length) panels.push({ id: "metrics", label: "Resultados", node: <Metrics metrics={d.metrics} n={num()} /> });

  panels.push({ id: "outro", label: "Siguiente", node: <Outro next={next} /> });
  
  return panels; 
}