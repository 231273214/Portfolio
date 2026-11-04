import { motion } from "motion/react";
import CartoonText from "../ui/CartoonText";
import SwapText from "../ui/SwapText";
import Clock from "./Clock";
import { useSound } from "../../hooks/useSound";

const tags = [
  { text: "Artesano Digital", swap: "hecho a mano" },
  { text: "UX/UI", swap: "diseño" },
  { text: "Interactividad", swap: "toca y juega" },
];

export default function HeroSection() {
  const { onHover } = useSound();

  return (
    <section className="relative -mt-36 flex min-h-svh flex-col items-center justify-center gap-10 pb-56 pt-36 md:-mt-28 md:gap-16 md:pb-36 md:pt-28">
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="self-start text-lg md:ml-[8%] md:text-2xl"
      >
        Hola, yo soy Sergio Rangel
      </motion.p>

      <CartoonText
        text="Ingeniero en multimedia"
        className="hero-shadow max-w-full text-center text-[clamp(2.5rem,7vw,6.5rem)] leading-[1.1]"
      />

      <motion.ul
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-base md:gap-x-14 md:text-2xl"
      >
        {tags.map((t, i) => (
          <li key={t.text} onMouseEnter={onHover}>
            <SwapText text={t.text} swap={t.swap} autoDelay={2 + i * 1.5} />
          </li>
        ))}
      </motion.ul>

      <Clock />
    </section>
  );
}