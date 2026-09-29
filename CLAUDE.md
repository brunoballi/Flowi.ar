@AGENTS.md

# Proyecto: autoflowi.com (diseño nuevo)

Landing de Flowi (automatización para pymes, Rosario). Next.js 16 + Tailwind v4 + three/@react-three/fiber + GSAP + Lenis.

## Dónde está cada cosa
- Textos, links, cifras, premios del bolillero, video: `src/content/site.ts`
- Conversaciones del bot de demo: `src/content/botFlows.ts`
- Secciones: `src/components/sections/` (Hero, Integrations, Bolillero, FlowiGest, BotDemo, Plate, Process, Numbers, Services, Contact, Footer)
- Haz de luz WebGL: `src/components/canvas/` (presets por sección vía atributo `data-stream`)
- Video de FlowiGest: `public/media/` (webm + mp4 + poster)
- Formulario: `src/app/api/lead/route.ts` → reenvía a `LEAD_WEBHOOK_URL` si está definida

## Reglas
- No hardcodear textos en componentes: todo sale de `src/content/`.
- R3F clona `uniforms`: actualizar el haz vía refs a los materiales, nunca la constante.
- Respetar `prefers-reduced-motion` en toda animación nueva.
- Antes de terminar: `npm run lint` y `npm run build` sin errores.
