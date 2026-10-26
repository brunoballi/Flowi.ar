import { useSyncExternalStore } from "react";

/** true si la media query se cumple. En el servidor devuelve false (sin diseño móvil) y se corrige al hidratar. */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** false en el servidor y durante la hidratación; true ya en el navegador. Sirve para no pedir recursos que dependen del dispositivo antes de saberlo. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}
