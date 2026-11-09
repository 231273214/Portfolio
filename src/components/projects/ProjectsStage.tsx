import { motion, useReducedMotion } from "motion/react";
import { useNavigate } from "react-router";
import { projects } from "../../data/projects";
import { useSound } from "../../hooks/useSound";
import ProjectCard from "./ProjectCard";
import ProjectInfo from "./ProjectInfo";
import ProjectMockup from "./ProjectMockup";

type Slot = { x: number; y: number; rotateX: number; rotateY: number; rotate: number; scale: number };

// Cuatro espacios a la izquierda (centro de cada tarjeta, en % del escenario)
const SLOT_LAYOUTS: Record<number, Slot[]> = {
  4: [
    { x: 13, y: 24, rotateX: 52, rotateY: 6, rotate: 20, scale: 1 },
    { x: 37, y: 30, rotateX: 52, rotateY: 4, rotate: 18, scale: 0.9 },
    { x: 13, y: 61, rotateX: 52, rotateY: 8, rotate: 20, scale: 1.05 },
    { x: 37, y: 72, rotateX: 52, rotateY: 4, rotate: 16, scale: 1 },
  ],
  3: [
    { x: 14, y: 28, rotateX: 52, rotateY: 6, rotate: 20, scale: 1.05 },
    { x: 30, y: 62, rotateX: 52, rotateY: 6, rotate: 18, scale: 1.1 },
    { x: 14, y: 80, rotateX: 52, rotateY: 8, rotate: 20, scale: 0.9 },
  ],
  2: [
    { x: 16, y: 32, rotateX: 52, rotateY: 6, rotate: 20, scale: 1.1 },
    { x: 32, y: 66, rotateX: 52, rotateY: 5, rotate: 18, scale: 1.15 },
  ],
};

const SLOTS = SLOT_LAYOUTS[projects.length - 1] ?? SLOT_LAYOUTS[4];

// Mockup destacado dentro del círculo (más pequeño y más abajo para no tapar el botón)
const FEATURED = { x: 75, y: 76, rotateX: 10, rotateY: -10, rotate: 1, scale: 1.76 };

const SPRING = { type: "spring", stiffness: 70, damping: 15, mass: 0.9 } as const;

interface Props {
  selectedId: string;
  slots: string[];
  index: number;
  select: (id: string) => void;
  next: () => void;
  prev: () => void;
}

function Arrow({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  const { onHover, onClick: click } = useSound();
  return (
    <button
      onClick={() => {
        onClick();
        click();
      }}
      onMouseEnter={onHover}
      aria-label={dir === "prev" ? "Proyecto anterior" : "Proyecto siguiente"}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-lg transition hover:bg-white/15"
    >
      {dir === "prev" ? "←" : "→"}
    </button>
  );
}

export default function ProjectsStage({ selectedId, slots, index, select, next, prev }: Props) {
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const { onHover, onClick } = useSound();
  const selected = projects.find((p) => p.id === selectedId)!;

  return (
    <div
      className="@container relative mx-auto aspect-[16/9] w-[min(100%,calc((100svh-7rem)*16/9))]"
      style={{ perspective: "1600px", perspectiveOrigin: "50% 40%" }}
    >
      {/* Anillo decorativo (más grande y más a la derecha) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[75%] top-1/2 aspect-square w-[48%] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="absolute inset-0 rounded-full border border-white/20"
          style={{
            boxShadow:
              "0 0 80px rgba(190,120,255,0.25), inset 0 0 60px rgba(190,120,255,0.15)",
          }}
        />
        <motion.div
          className="absolute inset-[6%] rounded-full border border-dashed border-white/15"
          animate={reduced ? undefined : { rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Información */}
      <div className="absolute left-[57%] top-[8%] w-[36%]">
        <ProjectInfo project={selected} />
      </div>

      {/* Tarjetas */}
      {projects.map((project, i) => {
        const isSelected = project.id === selectedId;
        const slotIndex = slots.indexOf(project.id);
        const pos = isSelected ? FEATURED : SLOTS[slotIndex];
        if (!pos) return null;

        const target = {
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          rotateX: pos.rotateX,
          rotateY: pos.rotateY,
          rotate: pos.rotate,
          scale: pos.scale,
          opacity: 1,
        };

        return (
          <motion.div
            key={project.id}
            className="absolute w-[17%]"
            style={{ x: "-50%", y: "-50%", zIndex: isSelected ? 20 : 10 }}
            initial={{ ...target, opacity: 0, scale: pos.scale * 0.7 }}
            animate={target}
            transition={{ ...SPRING, opacity: { duration: 0.5, delay: 0.15 + i * 0.1 } }}
          >
            {/* Vaivén flotante */}
            <motion.div
              animate={reduced ? undefined : { y: [0, -8, 0] }}
              transition={{
                duration: 5 + i * 0.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
            >
              <motion.button
                type="button"
                onMouseEnter={onHover}
                onClick={() => {
                  onClick();
                  if (isSelected) navigate(`/projects/${project.id}`);
                  else select(project.id);
                }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
                aria-label={isSelected ? `Abrir ${project.title}` : `Destacar ${project.title}`}
                className="relative block w-full cursor-pointer"
              >
                {/* Tarjeta en la izquierda, mockup en el círculo (crossfade) */}
                <motion.div
                  animate={{ opacity: isSelected ? 0 : 1 }}
                  transition={{ duration: 0.35 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
                <motion.div
                  className="absolute inset-0"
                  animate={{ opacity: isSelected ? 1 : 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <ProjectMockup project={project} />
                </motion.div>
              </motion.button>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Contador y flechas */}
      <div className="absolute bottom-[2%] left-[2%] z-30 flex items-center gap-4 text-[1.4cqw]">
        <span className="tabular-nums">
          {String(index + 1).padStart(2, "0")}
          <span className="mx-2 opacity-50">—</span>
          <span className="opacity-50">{String(projects.length).padStart(2, "0")}</span>
        </span>
        <div className="h-px w-24 bg-white/20">
          <motion.div
            className="h-full bg-white/80"
            animate={{ width: `${((index + 1) / projects.length) * 100}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
        </div>
        <Arrow dir="prev" onClick={prev} />
        <Arrow dir="next" onClick={next} />
      </div>
    </div>
  );
}