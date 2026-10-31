import { Howl } from "howler";
import { useAudioStore } from "../store/useAudioStore";

const config = {
  hover: { src: "/sounds/hover.mp3", volume: 0.15 },
  click: { src: "/sounds/click.mp3", volume: 0.3 },
  transition: { src: "/sounds/transition.mp3", volume: 0.25 },
} as const;

export type SoundName = keyof typeof config;

const cache: Partial<Record<SoundName, Howl>> = {};

export function playSound(name: SoundName) {
  if (!useAudioStore.getState().soundEnabled) return;

  let howl = cache[name];
  if (!howl) {
    howl = new Howl({
      src: [config[name].src],
      volume: config[name].volume,
      onloaderror: () => {}, 
    });
    cache[name] = howl;
  }
  howl.play();
}