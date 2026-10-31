import { useEffect } from "react";
import { useAudioStore } from "../store/useAudioStore";
import { useMusicStore } from "../store/useMusicStore";
import { startMusic, stopMusic } from "../lib/music";

export function useMusicEngine() {
  const soundEnabled = useAudioStore((s) => s.soundEnabled);
  const isPlaying = useMusicStore((s) => s.isPlaying);
  const trackIndex = useMusicStore((s) => s.trackIndex);
  const next = useMusicStore((s) => s.next);

  useEffect(() => {
    if (soundEnabled && isPlaying) startMusic(trackIndex, next);
    else stopMusic();
  }, [soundEnabled, isPlaying, trackIndex, next]);
}