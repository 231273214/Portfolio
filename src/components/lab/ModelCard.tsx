import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { motion } from "motion/react";
import { View } from "@react-three/drei";
import type { LabModel } from "../../data/models";
import { useSound } from "../../hooks/useSound";
import ModelScene, { type DragRef } from "./ModelScene";

interface Props {
  model: LabModel;
  index: number;
  selected: boolean;
  drag: DragRef;
  spin: number;
  onSelect: () => void;
  className?: string;
  style?: CSSProperties;
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export default function ModelCard({ model, index, selected, drag, spin, onSelect, className = "", style }: Props) {
  const { onHover, onClick } = useSound();
  const [hovered, setHovered] = useState(false);
  const last = useRef({ x: 0, y: 0 });

  const down = (e: PointerEvent<HTMLDivElement>) => {
    if (!selected) return;
    drag.current.dragging = true;
    last.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const move = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.dragging) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    last.current = { x: e.clientX, y: e.clientY };
    d.rotY += dx * 0.01;
    d.rotX = clamp(d.rotX + dy * 0.01, -0.8, 0.8);
    d.velY = clamp(dx * 0.6, -6, 6);
  };
  const up = (e: PointerEvent<HTMLDivElement>) => {
    drag.current.dragging = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 90, damping: 16, delay: 0.1 + index * 0.08 }}
    >
      <motion.div
        whileHover={{ y: -10 }}
        animate={{ scale: selected ? 1.05 : 1, opacity: selected ? 1 : 0.85 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div
          role="button"
          tabIndex={0}
          aria-pressed={selected}
          aria-label={`${model.title}${selected ? " (seleccionado)" : ""}`}
          onClick={() => {
            if (!selected) {
              onClick();
              onSelect();
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelect();
            }
          }}
          onPointerEnter={() => {
            setHovered(true);
            onHover();
          }}
          onPointerLeave={() => setHovered(false)}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
          className={`relative aspect-[27/41] w-full select-none overflow-hidden rounded-2xl border bg-white/10 outline-none transition-[border-color,box-shadow] duration-300 focus-visible:ring-2 focus-visible:ring-white ${
            selected ? "cursor-grab border-transparent active:cursor-grabbing" : "cursor-pointer border-white/25"
          }`}
          style={{
            boxShadow: selected
              ? `0 0 0 1.5px ${model.color}, 0 0 44px -8px ${model.color}`
              : "0 20px 40px -14px rgba(0,0,0,0.5)",
            touchAction: selected ? "pan-y" : "auto",
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: `radial-gradient(80% 60% at 50% 35%, ${model.color}40, transparent 70%)` }}
          />
          <View className="pointer-events-none absolute inset-0">
            <ModelScene model={model} drag={drag} active={selected} hovered={hovered} spin={spin} />
          </View>
          <span className="absolute left-3 top-3 text-xs opacity-60">{String(index + 1).padStart(2, "0")}</span>
          <span className="absolute inset-x-0 bottom-3 text-center text-xs opacity-80 lg:text-sm">
            {selected ? "↻ Arrastra para girar" : model.title}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}