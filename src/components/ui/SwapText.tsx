import { useEffect, useState } from "react";

interface Props {
  text: string;
  swap: string;
  className?: string;
  stagger?: number; // segundos entre letra y letra
  autoDelay?: number; // segundos antes del primer cambio automático (solo táctil)
  autoShow?: number; // segundos que se muestra la segunda frase
  autoRest?: number; // segundos que se muestra la frase original
}

function Layer({
  value,
  className,
  stagger,
}: {
  value: string;
  className: string;
  stagger: number;
}) {
  return (
    <span aria-hidden className="col-start-1 row-start-1 block">
      {[...value].map((ch, i) => (
        <span
          key={i}
          className={`inline-block whitespace-pre transition-transform duration-300 ease-out ${className}`}
          style={{ transitionDelay: `${i * stagger}s` }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

function useAutoSwap(delay: number, show: number, rest: number) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const noHover = window.matchMedia("(hover: none)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!noHover || reduced) return;

    let timer: number;
    let on = false;
    const tick = () => {
      on = !on;
      setActive(on);
      timer = window.setTimeout(tick, (on ? show : rest) * 1000);
    };
    timer = window.setTimeout(tick, delay * 1000);
    return () => window.clearTimeout(timer);
  }, [delay, show, rest]);

  return active;
}

export default function SwapText({
  text,
  swap,
  className = "",
  stagger = 0.02,
  autoDelay = 0,
  autoShow = 2.2,
  autoRest = 4,
}: Props) {
  const active = useAutoSwap(autoDelay, autoShow, autoRest);

  return (
    <span
      aria-label={text}
      data-active={active}
      className={`group inline-grid cursor-pointer overflow-hidden py-[0.15em] leading-[1.3] ${className}`}
    >
      <Layer
        value={text}
        stagger={stagger}
        className="group-hover:-translate-y-[130%] group-focus-visible:-translate-y-[130%] group-data-[active=true]:-translate-y-[130%]"
      />
      <Layer
        value={swap}
        stagger={stagger}
        className="translate-y-[130%] group-hover:translate-y-0 group-focus-visible:translate-y-0 group-data-[active=true]:translate-y-0"
      />
    </span>
  );
}