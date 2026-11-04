import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import SwapText from "../ui/SwapText";
import { useSound } from "../../hooks/useSound";

function Digit({ value }: { value: string }) {
  return (
    <span
      className="relative inline-block overflow-hidden align-top"
      style={{ height: "1.15em", lineHeight: "1.15em", fontVariantNumeric: "tabular-nums" }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          className="inline-block"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function Clock() {
  const [now, setNow] = useState(() => new Date());
  const [h24, setH24] = useState(false);
  const { onHover, onClick } = useSound();

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const hours = now.getHours();
  const seconds = now.getSeconds();
  const hourStr = h24 ? String(hours).padStart(2, "0") : String(hours % 12 || 12);
  const minStr = String(now.getMinutes()).padStart(2, "0");
  const suffix = hours < 12 ? "a.m." : "p.m.";

  const weekday = cap(now.toLocaleDateString("es-CO", { weekday: "long" }));
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const numeric = `${weekday} ${dd}/${mm}/${now.getFullYear()}`;
  const long = now.toLocaleDateString("es-CO", { day: "numeric", month: "long" });

  return (
    <div className="absolute bottom-24 right-0 text-right md:bottom-6 md:right-6">
      <motion.button
        type="button"
        onClick={() => {
          setH24((v) => !v);
          onClick();
        }}
        onMouseEnter={onHover}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        aria-label="Cambiar entre formato de 12 y 24 horas"
        title="Clic para cambiar 12 h / 24 h"
        className="flex items-baseline justify-end gap-2 text-4xl leading-none md:text-7xl"
      >
        <span className="flex items-baseline">
          {[...hourStr].map((ch, i) => (
            <Digit key={i} value={ch} />
          ))}
          <motion.span
            animate={{ opacity: seconds % 2 ? 0.25 : 1 }}
            transition={{ duration: 0.3 }}
            className="px-[0.05em]"
          >
            :
          </motion.span>
          {[...minStr].map((ch, i) => (
            <Digit key={i} value={ch} />
          ))}
        </span>
        <AnimatePresence initial={false}>
          {!h24 && (
            <motion.span
              key="suffix"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="text-xl md:text-4xl"
            >
              {suffix}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Línea de segundos */}
      <div className="mt-2 h-px w-full bg-current/15">
        <motion.div
          className="h-full bg-current/70"
          animate={{ width: `${(seconds / 60) * 100}%` }}
          transition={{ duration: seconds === 0 ? 0 : 1, ease: "linear" }}
        />
      </div>

      <div className="mt-2 text-base md:text-2xl">
        <SwapText text={numeric} swap={long} autoDelay={6.5} />
      </div>
    </div>
  );
}