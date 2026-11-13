import { motion } from "motion/react";
import type { Project } from "../../../data/projects";
import type { ScreenData } from "./types";
import { Panel, gradient, reveal } from "./shared";

export default function Phones({
  project,
  screens,
}: {
  project: Project;
  screens: ScreenData[];
}) {
  return (
    <Panel className="lg:w-auto">
      <ul className="flex snap-x gap-6 overflow-x-auto px-1 py-8 [scrollbar-width:none] lg:gap-[2.5vw] lg:overflow-visible lg:px-[3vw] [&::-webkit-scrollbar]:hidden">
        {screens.map((s, i) => (
          <li
            key={s.label}
            className={`w-44 shrink-0 snap-center lg:w-[min(15vw,26svh)] ${
              i % 2 ? "lg:translate-y-10" : "lg:-translate-y-6"
            }`}
          >
            <motion.div {...reveal(i * 0.1)} whileHover={{ y: -12, rotate: i % 2 ? 1.5 : -1.5 }}>
              <div className="overflow-hidden rounded-[2rem] border-[6px] border-[#14101c] shadow-[0_30px_50px_-15px_rgba(0,0,0,0.7)]">
                {s.image ? (
                  <img src={s.image} alt={`${project.title}: ${s.label}`} draggable={false} className="block h-auto w-full" />
                ) : (
                  <div
                    className="grid aspect-[9/19.5] w-full place-items-center text-lg opacity-60"
                    style={{ background: gradient(project.hue) }}
                  >
                    {s.label}
                  </div>
                )}
              </div>
              <p className="mt-4 text-center text-sm opacity-70">
                {String(i + 1).padStart(2, "0")} — {s.label}
              </p>
            </motion.div>
          </li>
        ))}
      </ul>
    </Panel>
  );
}