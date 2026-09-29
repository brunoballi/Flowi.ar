# Flowi · autoflowi.com (diseño nuevo)

Versión de autoflowi.com con el contenido actual (FlowiGest, bolillero, bot en vivo, proceso, servicios y contacto) dentro del diseño nuevo: un haz de luz en WebGL que recorre todo el sitio, secciones que entran desenfocadas, una "placa" que se abre desde el logo y un panel de ejemplo animado.

## Stack

- Next.js 16 (App Router, TypeScript, Turbopack)
- Tailwind CSS v4 (tokens en `src/app/globals.css`, bloque `@theme`)
- three + @react-three/fiber 9 (haz de luz)
- gsap + ScrollTrigger + @gsap/react (animaciones con scroll)
- lenis (smooth scroll)

## Correrlo

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de producción
npm run start      # servir el build
npm run lint
```

## Dónde cambiar cosas

| Qué | Dónde |
|---|---|
| Todos los textos, métricas de ejemplo, precios, links | `src/content/site.ts` |
| Colores, tipografías, radios | `src/app/globals.css` (`@theme`) |
| Posición/intensidad del haz por sección | `src/components/canvas/streamShader.ts` → `STREAM_PRESETS`, y el atributo `data-stream` de cada sección |
| Nodos del flujo del hero | `src/components/ui/FlowGraph.tsx` |
| Conversaciones del bot de demo (barbería, pádel, gimnasio) | `src/content/botFlows.ts` |
| Video de la demo de FlowiGest (notebook + celular) | `public/media/` (`escena-sistema.webm`, `.mp4` y `escena-poster.jpg`); rutas en `src/content/site.ts` → `flowigest.video` |
| Premios del bolillero | `src/content/site.ts` → `bolillero.prizes` |
| Formulario de contacto (backend) | `src/app/api/lead/route.ts` |

Los datos del panel de FlowiGest y del relevamiento son **de ejemplo** (así lo dice la página). Las cifras del hero y de "Números" (+20, 8 a 12, 100%) son las de la web actual.

## Formulario de contacto

`POST /api/lead` con `{ name, whatsapp, business, process, privacy }`.

- Valida todos los campos y que la política de privacidad esté aceptada.
- Si falla el envío, el formulario ofrece abrir WhatsApp con la consulta ya escrita.
- Si existe la variable `LEAD_WEBHOOK_URL`, reenvía el lead como JSON a esa URL (webhook de Make, n8n, Supabase Edge Function, etc.).
- Si no existe, lo escribe en el log del servidor.

```bash
# .env.local
LEAD_WEBHOOK_URL=https://hook.make.com/xxxxxxxx
```

## Deploy en Vercel

1. Subí el repo a GitHub.
2. En Vercel: **Add New → Project**, importá el repo (detecta Next.js solo).
3. En **Settings → Environment Variables** cargá `LEAD_WEBHOOK_URL`.
4. Deploy. Para dominio propio: **Settings → Domains**.

## Accesibilidad y movimiento reducido

Con `prefers-reduced-motion: reduce` no se muestra el loader, la placa queda estática y abierta, no hay inclinación con el mouse, los contadores muestran su valor final y el haz se dibuja en un solo frame. Sin JavaScript, todo el contenido queda visible.

## Notas técnicas

- R3F **clona** el objeto `uniforms` al crear cada `shaderMaterial`. Por eso `LightStream` actualiza los valores a través de refs a los materiales (`material.uniforms.x.value`), no sobre la constante.
- La consola muestra `THREE.Clock: This module has been deprecated`. Sale de @react-three/fiber, es inofensivo y desaparece cuando R3F actualice.
