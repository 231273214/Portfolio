import { useRef } from "react";
import { motion, useAnimate } from "motion/react";

function Letter({ char, index }: { char: string; index: number }) {
  const [scope, animate] = useAnimate();
  const busy = useRef(false);

  const boing = async () => {
    if (busy.current || !scope.current) return;
    busy.current = true;
    const dir = Math.random() > 0.5 ? 1 : -1;
    await animate(
      scope.current,
      {
        y: [0, -38, 0, -10, 0],
        scaleX: [1, 0.8, 1.28, 0.95, 1],
        scaleY: [1, 1.3, 0.68, 1.08, 1],
        rotate: [0, 9 * dir, -5 * dir, 0, 0],
      },
      { duration: 0.75, ease: "easeOut", times: [0, 0.3, 0.55, 0.8, 1] }
    );
    busy.current = false;
  };

  return (
    <motion.span
      className="inline-block"
      initial={{ y: 70, opacity: 0, rotate: 8 }}
      animate={{ y: 0, opacity: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 14,
        delay: 0.3 + index * 0.04,
      }}
    >
      <span
        ref={scope}
        onPointerEnter={boing}
        className="inline-block"
        style={{ transformOrigin: "50% 100%" }}
      >
        {char}
      </span>
    </motion.span>
  );
}

export default function CartoonText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");
  let index = 0;

  return (
    <h1 aria-label={text} className={className}>
      {words.map((word, w) => (
        <span key={w}>
          {/* cada palabra es un bloque: si hay que partir línea, se parte entre palabras */}
          <span aria-hidden className="inline-block whitespace-nowrap">
            {[...word].map((ch, c) => (
              <Letter key={c} char={ch} index={index++} />
            ))}
          </span>
          {w < words.length - 1 && " "}
        </span>
      ))}
    </h1>
  );
}