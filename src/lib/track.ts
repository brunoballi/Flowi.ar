import { track } from "@vercel/analytics";

/** Cuenta un clic en un botón de la demo gratis. `lugar` dice cuál botón fue (header, promo, seccion). */
export function trackDemo(lugar: string) {
  track("demo_click", { lugar });
}
