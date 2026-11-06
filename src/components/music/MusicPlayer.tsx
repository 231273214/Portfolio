import { tracks } from "../../lib/music";
import { useAudioStore } from "../../store/useAudioStore";
import { useMusicStore } from "../../store/useMusicStore";
import { useSound } from "../../hooks/useSound";
import { useLocation } from "react-router";

export default function MusicPlayer() {
  const { pathname } = useLocation();
  const hasEntered = useAudioStore((s) => s.hasEntered);
  const soundEnabled = useAudioStore((s) => s.soundEnabled);
  const toggleSound = useAudioStore((s) => s.toggleSound);
  const { isPlaying, trackIndex, toggle, play, next, prev } = useMusicStore();
  const { onHover, onClick } = useSound();

  if (!hasEntered || pathname !== "/") return null;

  const audible = soundEnabled && isPlaying;

  const handlePlayPause = () => {
    if (!soundEnabled) {
      toggleSound();
      play();
    } else {
      toggle();
    }
    onClick();
  };

  return (
    <div className="glass fixed bottom-6 left-6 z-40 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm">
      <button onClick={() => { prev(); onClick(); }} onMouseEnter={onHover} aria-label="Anterior">⏮</button>
      <button onClick={handlePlayPause} onMouseEnter={onHover} aria-label={audible ? "Pausar" : "Reproducir"}>
        {audible ? "⏸" : "▶"}
      </button>
      <button onClick={() => { next(); onClick(); }} onMouseEnter={onHover} aria-label="Siguiente">⏭</button>
      <span className="opacity-70">{tracks[trackIndex].title}</span>
    </div>
  );
}