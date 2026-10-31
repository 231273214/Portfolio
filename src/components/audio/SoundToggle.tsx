import { useAudioStore } from "../../store/useAudioStore";
import { playSound } from "../../lib/sounds";

export default function SoundToggle() {
  const hasEntered = useAudioStore((s) => s.hasEntered);
  const soundEnabled = useAudioStore((s) => s.soundEnabled);
  const toggleSound = useAudioStore((s) => s.toggleSound);

  if (!hasEntered) return null;

  const handleClick = () => {
    const willBeEnabled = !soundEnabled;
    toggleSound();
    if (willBeEnabled) playSound("click");
  };

  return (
    <button
      onClick={handleClick}
      aria-label={soundEnabled ? "Silenciar" : "Activar sonido"}
      className="fixed right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition hover:bg-white/20"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11 5 6 9H2v6h4l5 4V5z" />
        {soundEnabled ? (
          <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" />
        ) : (
          <path d="m22 9-6 6m0-6 6 6" />
        )}
      </svg>
    </button>
  );
}