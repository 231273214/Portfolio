import { playSound } from "../lib/sounds";

export function useSound() {
  return {
    onHover: () => playSound("hover"),
    onClick: () => playSound("click"),
  };
}