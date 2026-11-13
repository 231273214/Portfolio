import { Link } from "react-router";
import type { Project } from "../../../data/projects";
import { useSound } from "../../../hooks/useSound";
import SwapText from "../../ui/SwapText";
import { Panel, Reveal } from "./shared";

export default function Outro({ next }: { next: Project }) {
  const { onHover, onClick } = useSound();
  const pill = "rounded-full border border-white/30 px-5 py-2 text-sm transition hover:bg-white/15";

  return (
    <Panel className="lg:w-[70vw]">
      <Reveal>
        <p className="text-sm uppercase tracking-wider opacity-50">Siguiente proyecto</p>
      </Reveal>
      <Reveal delay={0.1} className="mt-4">
        <Link to={`/projects/${next.id}`} onMouseEnter={onHover} onClick={onClick} className="block">
          {/* Móvil: texto normal que parte por palabras */}
          <span className="block text-[clamp(2rem,10vw,3.5rem)] leading-[1.1] lg:hidden">
            {next.title}
            <span className="mt-3 block text-lg opacity-70">Ver proyecto →</span>
          </span>

          {/* Escritorio: efecto de cambio */}
          <div className="hidden lg:block">
            <SwapText text={next.title} swap="ver proyecto →" className="text-[clamp(2.5rem,5vw,5.5rem)]" />
          </div>
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