import { AnimatePresence, motion } from "motion/react";
import { useAudioStore } from "../../store/useAudioStore";
import { playSound } from "../../lib/sounds";

export default function EntryModal() {
  const hasEntered = useAudioStore((s) => s.hasEntered);
  const enter = useAudioStore((s) => s.enter);

  const handleEnter = (withSound: boolean) => {
    enter(withSound);
    if (withSound) playSound("click");
  };

  return (
    <AnimatePresence>
      {!hasEntered && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1a1025]/80 backdrop-blur-xl"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-6 max-w-sm rounded-3xl border border-white/20 bg-white/10 p-8 text-center backdrop-blur-md"
          >
            <h2 className="text-2xl">Bienvenido</h2>
            <p className="mt-2 text-sm opacity-70">
              Esta experiencia tiene música y sonidos suaves. ¿Cómo quieres entrar?
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={() => handleEnter(true)}
                className="rounded-xl bg-white/25 px-5 py-3 transition hover:bg-white/35"
              >
                Entrar con sonido
              </button>
              <button
                onClick={() => handleEnter(false)}
                className="rounded-xl border border-white/20 px-5 py-3 transition hover:bg-white/10"
              >
                Entrar en silencio
              </button>
            </div>
            <p className="mt-4 text-xs opacity-50">
              Podrás cambiarlo en cualquier momento.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}