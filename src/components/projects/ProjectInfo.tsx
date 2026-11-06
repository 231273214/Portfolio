import { AnimatePresence, motion, type Variants } from "motion/react";
import { Link } from "react-router";
import type { Project } from "../../data/projects";
import { useSound } from "../../hooks/useSound";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.2 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function ProjectInfo({ project }: { project: Project }) {
  const { onHover, onClick } = useSound();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.id}
        variants={container}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        <motion.span
          variants={item}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs lg:gap-[0.6cqw] lg:px-[1.1cqw] lg:py-[0.4cqw] lg:text-[1cqw]"
        >
          <span className="h-2 w-2 rounded-full bg-[#b36bff] lg:h-[0.6cqw] lg:w-[0.6cqw]" />
          Proyecto destacado
        </motion.span>

        <motion.h2
          variants={item}
          className="mt-3 text-4xl leading-tight lg:mt-[1.2cqw] lg:text-[3.6cqw]"
        >
          {project.title}
        </motion.h2>

        <motion.p variants={item} className="mt-1 text-lg opacity-80 lg:text-[1.7cqw]">
          {project.subtitle}
        </motion.p>

        <motion.p
          variants={item}
          className="mt-3 max-w-prose text-sm opacity-70 lg:mt-[1.2cqw] lg:text-[1.15cqw] lg:leading-relaxed"
        >
          {project.description}
        </motion.p>

        <motion.ul variants={item} className="mt-4 flex flex-wrap gap-2 lg:mt-[1.4cqw] lg:gap-[0.7cqw]">
          {(project.tags ?? []).map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs lg:px-[1.1cqw] lg:py-[0.45cqw] lg:text-[0.95cqw]"
            >
              {tag}
            </li>
          ))}
        </motion.ul>

        <motion.div variants={item} className="mt-5 lg:mt-[1.8cqw]">
          <Link
            to={`/projects/${project.id}`}
            onMouseEnter={onHover}
            onClick={onClick}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2 text-sm transition hover:bg-white/15 lg:px-[1.8cqw] lg:py-[0.7cqw] lg:text-[1.1cqw]"
          >
            Ver proyecto <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}