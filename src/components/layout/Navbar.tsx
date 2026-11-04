import { useLayoutEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { motion } from "motion/react";
import { useSound } from "../../hooks/useSound";
import SoundToggle from "../audio/SoundToggle";
import ThemeToggle from "../ui/ThemeToggle";
import SwapText from "../ui/SwapText";

const links = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/gallery", label: "Gallery" },
  { to: "/lab", label: "Lab" },
  { to: "/work-with-me", label: "Work with me", cta: true },
];

// "line" = línea líquida · "dot" = gota
const INDICATOR: "line" | "dot" = "line";

// Cabeza rápida + cola lenta = efecto de estiramiento
const SPRINGS = [
  { stiffness: 380, damping: 30 },
  { stiffness: 140, damping: 18 },
];

// Formas del navbar (siempre el mismo formato de 8 valores para que Motion interpole)
const R = "16px 16px 16px 16px / 16px 16px 16px 16px";
const blob = {
  rest: {
    borderRadius: R,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 200, damping: 20 },
  },
  hover: {
    scale: 1.015,
    borderRadius: [
      R,
      "28px 14px 26px 16px / 18px 26px 14px 28px",
      "14px 28px 16px 26px / 26px 14px 28px 18px",
      R,
    ],
    transition: {
      borderRadius: { duration: 5, repeat: Infinity, ease: "easeInOut" as const },
      scale: { type: "spring" as const, stiffness: 200, damping: 15 },
    },
  },
};

function isActive(pathname: string, to: string) {
  return to === "/"
    ? pathname === "/"
    : pathname === to || pathname.startsWith(to + "/");
}

function MailIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden>
      <rect x="2" y="3" width="20" height="18" rx="4" fill="white" />
      <path
        d="M6 16V8l6 5 6-5v8"
        fill="none"
        stroke="#703587"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Navbar() {
  const { onHover, onClick } = useSound();
  const { pathname } = useLocation();
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [pos, setPos] = useState<{ x: number; w: number; y: number } | null>(null);

  const activeIndex = links.findIndex((l) => isActive(pathname, l.to));

  // Mide el link activo (y vuelve a medir si cambia el tamaño o carga la fuente)
  useLayoutEffect(() => {
    const measure = () => {
      const el = linkRefs.current[activeIndex];
      if (!el) return setPos(null);
      setPos({ x: el.offsetLeft, w: el.offsetWidth, y: el.offsetTop + el.offsetHeight });
    };
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeIndex]);

  const target = pos && {
    left: INDICATOR === "line" ? pos.x + 16 : pos.x + pos.w / 2 - 3,
    width: INDICATOR === "line" ? pos.w - 32 : 6,
    top: pos.y - (INDICATOR === "line" ? 6 : 7),
    height: INDICATOR === "line" ? 4 : 6,
  };

  return (
    <>
      {/* Filtro gooey: fusiona las dos líneas como líquido */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
        <filter id="goo" x="-10%" y="-60%" width="120%" height="220%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8"
          />
        </filter>
      </svg>

      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 grid grid-cols-2 items-center gap-y-3 px-4 pt-4 md:grid-cols-[1fr_auto_1fr] md:gap-y-0 md:px-10">
        <Link
          to="/"
            onMouseEnter={onHover}
            onClick={onClick}
            className="pointer-events-auto col-start-1 row-start-1 justify-self-start"
          >
            <SwapText text="Sergio" swap="rangel" autoDelay={0.8} />
        </Link>

        <motion.nav
          variants={blob}
          initial="rest"
          animate="rest"
          whileHover="hover"
          className="glass pointer-events-auto col-span-2 row-start-2 flex items-center gap-1 justify-self-center px-2 py-2 md:col-span-1 md:col-start-2 md:row-start-1 md:gap-2 md:px-3"
        >
          {/* Capa del indicador. position inline porque ".glass > *" la forzaría a relative */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              filter: "url(#goo)",
            }}
          >
            {target &&
              SPRINGS.map((spring, i) => (
                <motion.span
                  key={i}
                  initial={false}
                  animate={target}
                  transition={{ type: "spring", ...spring }}
                  style={{
                    position: "absolute",
                    borderRadius: 999,
                    background: "var(--fg)",
                  }}
                />
              ))}
          </div>

          {links.map(({ to, label, cta }, i) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              ref={(el) => {
                linkRefs.current[i] = el;
              }}
              onMouseEnter={onHover}
              onClick={onClick}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-xl px-3 py-2 text-xs transition-opacity md:gap-3 md:px-4 md:text-sm ${
                  cta ? "relief" : ""
                } ${isActive || cta ? "opacity-100" : "opacity-70 hover:opacity-100"}`
              }
            >
              {cta && <MailIcon />}
              {cta ? <span className="sr-only md:not-sr-only">{label}</span> : label}
            </NavLink>
          ))}
        </motion.nav>

        <div className="pointer-events-auto col-start-2 row-start-1 flex items-center gap-1 justify-self-end md:col-start-3">
          <SoundToggle />
          <ThemeToggle />
        </div>
      </header>
    </>
  );
}