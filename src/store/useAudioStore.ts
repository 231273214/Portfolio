import { create } from "zustand";

interface AudioState {
  hasEntered: boolean;
  soundEnabled: boolean;
  enter: (withSound: boolean) => void;
  toggleSound: () => void;
}

export const useAudioStore = create<AudioState>((set) => ({
  hasEntered: false,
  soundEnabled: false,
  enter: (withSound) => set({ hasEntered: true, soundEnabled: withSound }),
  toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
}));