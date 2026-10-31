import { Howl } from "howler";

export const tracks = [
  { title: "Lo-fi 1", src: "/music/lofi-1.mp3" },
  { title: "Lo-fi 2", src: "/music/lofi-2.mp3" },
  { title: "Lo-fi 3", src: "/music/lofi-3.mp3" },
];

const TARGET_VOLUME = 0.35;

let howl: Howl | null = null;
let loadedIndex = -1;

function ensure(index: number, onEnd: () => void) {
  if (howl && loadedIndex === index) return howl;
  howl?.unload();
  howl = new Howl({
    src: [tracks[index].src],
    html5: true, 
    volume: 0,
    onend: onEnd, 
    onloaderror: () => {},
  });
  loadedIndex = index;
  return howl;
}

export function startMusic(index: number, onEnd: () => void) {
  const h = ensure(index, onEnd);
  if (!h.playing()) h.play();
  h.fade(h.volume(), TARGET_VOLUME, 800);
}

export function stopMusic() {
  if (!howl) return;
  const h = howl;
  h.fade(h.volume(), 0, 600);
  h.once("fade", () => {
    if (h.volume() === 0) h.pause();
  });
}