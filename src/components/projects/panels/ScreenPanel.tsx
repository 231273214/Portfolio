import { motion } from "motion/react";
import type { Project } from "../../../data/projects";
import type { ScreenData } from "./types";
import { Panel, Shot, gradient, reveal } from "./shared";

export default function ScreenPanel({
  project,
  screen,
  index,
  total,
}: {
  project: Project;
  screen: ScreenData;
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