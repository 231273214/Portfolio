import { useCallback, useState } from "react";
import { projects } from "../data/projects";

export function useProjectSelection() {
  const [selectedId, setSelectedId] = useState(projects[0].id);
  const [slots, setSlots] = useState(() => projects.slice(1).map((p) => p.id));

  const select = useCallback(
    (id: string) => {
      if (id === selectedId) return;
      setSlots((s) => s.map((x) => (x === id ? selectedId : x)));
      setSelectedId(id);
    },
    [selectedId]
  );

  const index = projects.findIndex((p) => p.id === selectedId);
  const go = (dir: number) =>
    select(projects[(index + dir + projects.length) % projects.length].id);

  return {
    selectedId,
    slots,
    index,
    select,
    next: () => go(1),
    prev: () => go(-1),
  };
}