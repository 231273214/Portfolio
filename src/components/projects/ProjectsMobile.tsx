import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router";
import { projects } from "../../data/projects";
import { useSound } from "../../hooks/useSound";
import ProjectCard from "./ProjectCard";
import ProjectInfo from "./ProjectInfo";

interface Props {
  selectedId: string;
  select: (id: string) => void;
}

export default function ProjectsMobile({ selectedId, select }: Props) {
  const { onClick } = useSound();
  const selected = projects.find((p) => p.id === selectedId)!;

  return (
    <div className="flex flex-col gap-8 pb-10 overflow-x-hidden w-full">
      
      <div className="mx-auto w-[85%] max-w-sm mt-4" style={{ perspective: 900 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, rotateY: -25, y: 20 }}
            animate={{ opacity: 1, rotateY: -5, rotateX: 5, y: 0 }}
            exit={{ opacity: 0, rotateY: 25 }}
            transition={{ type: "spring", stiffness: 100, damping: 16 }}
          >
            <Link to={`/projects/${selected.id}`} onClick={onClick} className="block">
              <ProjectCard project={selected} />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-2">
        <ProjectInfo project={selected} />
      </div>

      <ul className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {projects.map((p) => {
          const active = p.id === selectedId;
          return (
            <li key={p.id} className="w-40 shrink-0 snap-center">
              <button
                onClick={() => {
                  select(p.id);
                  onClick();
                }}
                aria-label={`Ver ${p.title}`}
                className="block w-full transition duration-300"
                style={{
                  opacity: active ? 1 : 0.6,
                  transform: `perspective(500px) rotateY(${active ? '-4deg' : '-8deg'}) rotateX(4deg) scale(${
                    active ? 1.05 : 0.95
                  })`,
                }}
              >
                <ProjectCard project={p} />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}