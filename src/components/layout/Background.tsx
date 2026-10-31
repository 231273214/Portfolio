import { useLayoutEffect } from "react";
import { useThemeStore } from "../../store/useThemeStore";

export default function Background() {
  const theme = useThemeStore((s) => s.theme);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <>
      <div className="bg-layer bg-dark" />
      <div className="bg-layer bg-light" />
      <div className="bg-noise" />
    </>
  );
}