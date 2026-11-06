import { Fragment, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import type { Project } from "../../data/projects";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useSound } from "../../hooks/useSound";
import { buildPanels, type PanelDef } from "./ProjectPanels";

function HorizontalTrack({ panels }: { panels: PanelDef[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const distanceRef = useRef(0);
  const [dims, setDims] = useState({ distance: 0, vh: 0 });
  const [active, setActive] = useState(0);
  const { onHover, onClick } = useSound();

  // Mide la pista (y vuelve a medir si cambia el tamaño o carga la fuente)
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const distance = Math.max(0, track.offsetWidth - window.innerWidth);
      distanceRef.current = distance;
      setDims({ distance, vh: window.innerHeight });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [panels]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const x = useTransform(smooth, (p) => -p * distanceRef.current);

  // Panel activo para el mini menú
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const track = trackRef.current;
    if (!track) return;
    const pos = p * distanceRef.current + window.innerWidth * 0.4;
    let idx = 0;
    for (let i = 0; i < track.children.length; i++) {
      if ((track.children[i] as HTMLElement).offsetLeft <= pos) idx = i;
    }
    if (p > 0.985) idx = track.children.length - 1;
    setActive(idx);
  });

  const goTo = (i: number) => {
    const el = trackRef.current?.children[i] as HTMLElement | undefined;
    const section = sectionRef.current;
    if (!el || !section) return;
    const top = section.getBoundingClientRect().top + window.scrollY;
    // 1 px de scroll = 1 px de desplazamiento horizontal
    window.scrollTo({ top: top + Math.min(el.offsetLeft, dims.distance), behavior: "smooth" });
  };

  // Etiquetas únicas del menú (varias pantallas comparten "Pantallas")
  const groups = panels.reduce<{ label: string; index: number }[]>(
    (acc, p, i) => (acc.some((g) => g.label === p.label) ? acc : [...acc, { label: p.label, index: i }]),
    []
  );
  const activeLabel = panels[active]?.label;

  return (
    <>
      <section
        ref={sectionRef}
        className="relative"
        style={{ height: dims.distance + dims.vh || "100svh" }}
      >
        <div className="sticky top-0 h-svh overflow-hidden">
          <motion.div ref={trackRef} style={{ x }} className="flex h-full w-max will-change-transform">
            {panels.map((p) => (
              <Fragment key={p.id}>{p.node}</Fragment>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Barra de progreso */}
      <motion.div
        aria-hidden
        className="fixed inset-x-0 bottom-0 z-40 h-1 origin-left bg-white/70"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Mini menú de secciones */}
      <nav
        aria-label="Secciones del proyecto"
        className="glass fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-full px-2 py-1.5"
      >
        {groups.map((g) => (
          <button
            key={g.label}
            onClick={() => {
              goTo(g.index);
              onClick();
            }}
            onMouseEnter={onHover}
            className={`rounded-full px-3 py-1 text-xs transition-opacity ${
              g.label === activeLabel ? "opacity-100" : "opacity-55 hover:opacity-100"
            }`}
          >
            {g.label}
          </button>
        ))}
      </nav>
    </>
  );
}

export default function ProjectHorizontalLayout({
  project,
  next,
}: {
  project: Project;
  next: Project;
}) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const panels = useMemo(() => buildPanels(project, next), [project, next]);

  // Móvil y tablet: mismos paneles, apilados en vertical
  if (!isDesktop) {
    return (
      <div className="flex flex-col gap-20 px-6 pb-24 pt-36">
        {panels.map((p) => (
          <Fragment key={p.id}>{p.node}</Fragment>
        ))}
      </div>
    );
  }

  return <HorizontalTrack panels={panels} />;
}