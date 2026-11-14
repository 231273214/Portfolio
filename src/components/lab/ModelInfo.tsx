import { AnimatePresence, motion } from "motion/react";
import type { LabModel } from "../../data/models";
import { useSound } from "../../hooks/useSound";

interface Props {
  model: LabModel;
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function ModelInfo({ model, index, total, onPrev, onNext }: Props) {
  const { onHover, onClick } = useSound();
  const arrow =
    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 text-lg transition hover:bg-white/15";

  return (
    <div className="glass rounded-2xl px-5 py-4 lg:px-[2cqw] lg:py-[1cqw]">
      <div className="flex items-center gap-4 lg:gap-[2cqw]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={model.id}
            className="min-w-0 flex-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <p className="text-xs opacity-50">
              {String(index + 1).padStart(2, "0")} — {String(total).padStart(2, "0")}
            </p>
            <h2 className="truncate text-xl lg:text-[max(1.2rem,1.7cqw)]">{model.title}</h2>
            <p className="mt-1 text-sm opacity-70 lg:text-[max(0.85rem,0.95cqw)]">{model.description}</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {model.tags.map((t) => (
                <li key={t} className="rounded-full border border-white/20 bg-white/5 px-3 py-0.5 text-xs">
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
        <div className="flex gap-2">
          <button
            onClick={() => {
              onPrev();
              onClick();
            }}
            onMouseEnter={onHover}
            aria-label="Modelo anterior"
            className={arrow}
          >
            ←
          </button>
          <button
            onClick={() => {
              onNext();
              onClick();
            }}
            onMouseEnter={onHover}
            aria-label="Modelo siguiente"
            className={arrow}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}