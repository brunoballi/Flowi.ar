"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { planeFragment, planeVertex, pointsFragment, pointsVertex, STREAM_PRESETS, STRANDS, type StreamPresetName } from "./streamShader";
import { prefersReducedMotion } from "@/lib/useReducedMotion";

/** Preset de la sección que ocupa el centro de la pantalla ([data-stream]). */
function activePreset(): StreamPresetName {
  const mid = window.innerHeight / 2;
  const els = document.querySelectorAll<HTMLElement>("[data-stream]");
  let name: StreamPresetName = "hero";
  for (const el of els) {
    const r = el.getBoundingClientRect();
    if (r.top <= mid && r.bottom >= mid) {
      name = el.dataset.stream as StreamPresetName;
      break;
    }
    if (r.top <= mid) name = el.dataset.stream as StreamPresetName;
  }
  return name in STREAM_PRESETS ? name : "hero";
}

// Plantilla de uniforms. OJO: R3F clona el objeto `uniforms` al crear cada material,
// así que los valores se actualizan sobre `material.uniforms` (vía refs), nunca sobre esta constante.
const UNIFORMS = {
  uTime: { value: 0 },
  uScroll: { value: 0 },
  uRes: { value: new THREE.Vector2(1, 1) },
  uCx: { value: 0.1 },
  uTilt: { value: 0.9 },
  uAmp: { value: 0.07 },
  uInt: { value: 1 },
  uRot: { value: 0 },
  uSpread: { value: 0.014 },
  uDpr: { value: 1 },
};
type U = typeof UNIFORMS;

// PRNG determinístico (mulberry32): mismas partículas en cada render, sin Math.random en render.
function makeSeeds(count: number) {
  let a = 0x9e3779b9;
  const rnd = () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    arr[i * 3] = Math.floor(rnd() * STRANDS);
    arr[i * 3 + 1] = rnd();
    arr[i * 3 + 2] = rnd();
  }
  return arr;
}

function Stream({ reduced, count }: { reduced: boolean; count: number }) {
  const { size, gl, invalidate } = useThree();
  const planeMat = useRef<THREE.ShaderMaterial>(null);
  const pointsMat = useRef<THREE.ShaderMaterial>(null);
  const seeds = useMemo(() => makeSeeds(count), [count]);
  const positions = useMemo(() => new Float32Array(count * 3), [count]);

  const target = useRef<StreamPresetName>("hero");
  useEffect(() => {
    const onScroll = () => {
      target.current = activePreset();
      if (reduced) invalidate();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced, invalidate]);

  useEffect(() => invalidate(), [size, invalidate]);

  useFrame((state, delta) => {
    const main = planeMat.current?.uniforms as U | undefined;
    const pts = pointsMat.current?.uniforms as U | undefined;
    if (!main || !pts) return;
    const k = STREAM_PRESETS[target.current];
    const dpr = gl.getPixelRatio();
    const asp = size.width / size.height;
    const f = reduced ? 1 : Math.min(1, delta * 2.2);
    const lerp = (a: number, b: number) => a + (b - a) * f;

    main.uRes.value.set(size.width * dpr, size.height * dpr);
    main.uDpr.value = dpr;
    main.uCx.value = lerp(main.uCx.value, (k.cx - 0.5) * asp);
    main.uTilt.value = lerp(main.uTilt.value, k.tilt);
    main.uAmp.value = lerp(main.uAmp.value, k.amp);
    main.uInt.value = lerp(main.uInt.value, k.intensity);
    main.uRot.value = lerp(main.uRot.value, k.rot);
    main.uSpread.value = lerp(main.uSpread.value, k.spread);
    main.uScroll.value = lerp(main.uScroll.value, window.scrollY / window.innerHeight);
    main.uTime.value = reduced ? 0 : state.clock.elapsedTime;

    // Las partículas usan exactamente la misma curva que el plano.
    for (const key of Object.keys(main) as (keyof U)[]) {
      if (key === "uRes") pts.uRes.value.copy(main.uRes.value);
      else (pts[key] as { value: number }).value = (main[key] as { value: number }).value;
    }
  });

  return (
    <>
      <mesh frustumCulled={false}>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial ref={planeMat} vertexShader={planeVertex} fragmentShader={planeFragment} uniforms={UNIFORMS} depthWrite={false} depthTest={false} />
      </mesh>
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aSeed" args={[seeds, 3]} />
        </bufferGeometry>
        <shaderMaterial
          ref={pointsMat}
          vertexShader={pointsVertex}
          fragmentShader={pointsFragment}
          uniforms={UNIFORMS}
          transparent
          depthWrite={false}
          depthTest={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
}

export default function LightStream() {
  const [hidden, setHidden] = useState(false);
  const [reduced] = useState(() => prefersReducedMotion());
  const [count] = useState(() => (window.innerWidth < 768 ? 500 : 1500));

  useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        frameloop={hidden ? "never" : reduced ? "demand" : "always"}
        orthographic
        camera={{ position: [0, 0, 1] }}
        fallback={<div className="stream-fallback absolute inset-0" />}
      >
        <Stream reduced={reduced} count={count} />
      </Canvas>
    </div>
  );
}
