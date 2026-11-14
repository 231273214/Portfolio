import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { useReducedMotion } from "motion/react";
import { models } from "../../data/models";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import ModelCard from "./ModelCard";
//import ModelInfo from "./ModelInfo";
import { createDrag } from "./ModelScene";

// Posición de cada tarjeta en el arco
function arc(i: number, n: number) {
  const t = n > 1 ? (i / (n - 1)) * 2 - 1 : 0; // -1 a 1
  return { left: 50 + t * 34.2 - 7.03, top: 32.6 - 23.9 * t * t };
}

export default function Lab3DViewer() {
  const [index, setIndex] = useState(Math.floor(models.length / 2));
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduced = useReducedMotion();
  const spin = reduced ? 0 : 0.6;
  const drags = useMemo(() => models.map(() => ({ current: createDrag() })), []);
  const listRef = useRef<HTMLUListElement>(null);

  const go = useCallback((dir: number) => setIndex((i) => (i + dir + models.length) % models.length), []);

  // Flechas del teclado
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  // En móvil, centra la tarjeta elegida en el carrusel
  useEffect(() => {
    if (isDesktop) return;
    (listRef.current?.children[index] as HTMLElement | undefined)?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [index, isDesktop]);

  // const info = (
  //   <ModelInfo
  //     model={models[index]}
  //     index={index}
  //     total={models.length}
  //     onPrev={() => go(-1)}
  //     onNext={() => go(1)}
  //   />
  // );

  
  return (
    <>
      {isDesktop ? (
        <div className="@container relative mx-auto aspect-[1920/920] w-[min(100%,calc((100svh-7rem)*1920/920))]">
          {models.map((m, i) => {
            const p = arc(i, models.length);
            return (
              <ModelCard
                key={m.id}
                model={m}
                index={i}
                selected={i === index}
                drag={drags[i]}
                spin={spin}
                onSelect={() => setIndex(i)}
                className="absolute w-[14.06%]"
                style={{ left: `${p.left}%`, top: `${p.top}%` }}
              />
            );
          })}
          {/* <div className="absolute left-[27%] top-[86%] w-[46%]">{info}</div> */}
        </div>
      ) : (
        <div className="flex flex-col gap-4 pb-10">
          <ul
            ref={listRef}
            className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[19vw] py-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {models.map((m, i) => (
              <li key={m.id} className="w-[62vw] max-w-[280px] shrink-0 snap-center">
                <ModelCard
                  model={m}
                  index={i}
                  selected={i === index}
                  drag={drags[i]}
                  spin={spin}
                  onSelect={() => setIndex(i)}
                />
              </li>
            ))}
          </ul>
          {/* {info} */}
        </div>
      )}

      <Canvas
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 40 }}
      >
        <View.Port />
      </Canvas>
    </>
  );
}