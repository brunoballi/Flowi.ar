"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  // En mobile, ocultar/mostrar la barra de direcciones al scrollear dispara un resize
  // que hace que ScrollTrigger recalcule posiciones y "salte" la página. Lo ignoramos.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger, useGSAP };
