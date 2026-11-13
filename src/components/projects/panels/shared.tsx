import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useInView, useReducedMotion } from "motion/react";

export const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div {...reveal(delay)} className={className}>
      {children}
    </motion.div>
  );
}

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`w-full lg:flex lg:h-full lg:shrink-0 lg:flex-col lg:justify-center lg:px-[4vw] lg:pb-16 lg:pt-24 ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionTitle({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="text-xl opacity-50 lg:text-2xl">{n}</span>
      <h2 className="text-4xl leading-none lg:text-[clamp(2.6rem,4.4vw,5rem)]">{title}</h2>
    </div>
  );
}

export function CountUp({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduced = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) return setN(value);
    const controls = animate(0, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduced]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {n}
      {suffix}
    </span>
  );
}

export const gradient = (hue: number) =>
  `linear-gradient(135deg, hsl(${hue} 55% 32%), hsl(${hue + 40} 65% 12%))`;

export function Shot({
  image,
  bg,
  label,
  fill = false,
  className = "",
}: {
  image?: string;
  bg: string;
  label: string;
  fill?: boolean; 
  className?: string;
}) {
  return (
    <div className={fill ? "absolute inset-0" : "relative"} style={{ background: bg }}>
      {image ? (
        <img
          src={image}
          alt=""
          draggable={false}
          className={fill ? "h-full w-full object-cover" : `block h-auto w-full ${className}`}
        />
      ) : (
        <div className={fill ? "h-full w-full" : "aspect-[16/10] w-full"}>
          <span className="absolute inset-0 grid place-items-center text-2xl opacity-40">
            {label}
          </span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent" />
    </div>
  );
}