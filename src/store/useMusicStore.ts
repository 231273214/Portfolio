import { create } from "zustand";
import { tracks } from "../lib/music";

interface MusicState {
  isPlaying: boolean; 
  trackIndex: number;
  toggle: () => void;
  play: () => void;
  next: () => void;
  prev: () => void;
}

export const useMusicStore = create<MusicState>((set) => ({
  isPlaying: true, 
  trackIndex: 0,
  toggle: () => set((s) => ({ isPlaying: !s.isPlaying })),
  play: () => set({ isPlaying: true }),
  next: () => set((s) => ({ trackIndex: (s.trackIndex + 1) % tracks.length })),
  prev: () =>
    set((s) => ({
      trackIndex: (s.trackIndex - 1 + tracks.length) % tracks.length,
    })),
}));