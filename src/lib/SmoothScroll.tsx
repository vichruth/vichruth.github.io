import * as React from "react";
import Lenis from "lenis";

const LenisContext = React.createContext<Lenis | null>(null);

/** Access the active Lenis instance (null when reduced-motion is on). */
export const useLenis = () => React.useContext(LenisContext);

/**
 * Wraps the app in a single Lenis smooth-scroll instance driven by one RAF loop,
 * so every scroll-linked animation reads from the same clock (no drift/jank).
 * Disabled automatically when the user prefers reduced motion.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = React.useState<Lenis | null>(null);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    setLenis(instance);

    let rafId = 0;
    const raf = (time: number) => {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
