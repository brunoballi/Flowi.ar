// Haz de luz: una familia de hebras x = f(y) en un espacio centrado y rotable.
// La misma función se usa en el plano (brillo) y en las partículas (posición).

export type StreamPreset = {
  cx: number; // centro horizontal 0..1
  tilt: number; // inclinación (y -> x)
  amp: number; // amplitud de la curva
  intensity: number;
  rot: number; // rotación en radianes (1.45 ≈ horizontal)
  spread: number; // separación entre hebras
};

// Cada sección declara data-stream="<preset>" y el haz se acomoda a la que ocupa el centro de la pantalla.
export const STREAM_PRESETS = {
  hero: { cx: 0.56, tilt: 0.9, amp: 0.07, intensity: 1.0, rot: 0.0, spread: 0.016 },
  right: { cx: 0.86, tilt: -0.12, amp: 0.08, intensity: 0.45, rot: -0.1, spread: 0.02 },
  left: { cx: 0.16, tilt: 0.15, amp: 0.1, intensity: 0.5, rot: 0.12, spread: 0.022 },
  center: { cx: 0.5, tilt: 0.3, amp: 0.06, intensity: 0.9, rot: 0.0, spread: 0.03 },
  fan: { cx: 0.5, tilt: 0.0, amp: 0.12, intensity: 1.05, rot: 1.45, spread: 0.045 },
} satisfies Record<string, StreamPreset>;

export type StreamPresetName = keyof typeof STREAM_PRESETS;

export const STRANDS = 9;

const common = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uRes;
  uniform float uCx;
  uniform float uTilt;
  uniform float uAmp;
  uniform float uInt;
  uniform float uRot;
  uniform float uSpread;

  float strandX(float y, float i) {
    float ph = uScroll * 0.55 + uTime * 0.12;
    return uCx + uTilt * y
      + uAmp * sin(y * 3.2 + ph + i * 0.45)
      + 0.035 * sin(y * 7.5 - uTime * 0.3 + i * 1.3)
      + (i - 4.0) * uSpread;
  }
  mat2 rot2(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
`;

export const planeVertex = /* glsl */ `
  void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

export const planeFragment = /* glsl */ `
  precision highp float;
  ${common}
  void main() {
    vec2 uv = gl_FragCoord.xy / uRes;
    float asp = uRes.x / uRes.y;
    vec2 q = uv - 0.5;
    q.x *= asp;
    q = rot2(-uRot) * q;

    vec3 col = vec3(0.02, 0.051, 0.043);
    vec3 teal = vec3(0.114, 0.62, 0.459);
    vec3 mint = vec3(0.263, 0.89, 0.69);
    vec3 sky = vec3(0.31, 0.70, 1.0);

    float halo = 0.0;
    for (int n = 0; n < ${STRANDS}; n++) {
      float i = float(n);
      float d = abs(q.x - strandX(q.y, i));
      float w = 0.0022 + 0.0012 * mod(i, 3.0);
      float g = w / (d + w * 0.5);
      float flick = 0.7 + 0.3 * sin(q.y * 9.0 - uTime * 1.3 + i * 2.1);
      vec3 c = (n == 2 || n == 6) ? sky : mix(teal, mint, fract(i * 0.37));
      col += c * g * 0.15 * flick * uInt;
      if (n == 4) halo = exp(-pow(d * 2.4, 2.0));
    }
    col += vec3(0.05, 0.3, 0.21) * halo * 0.5 * uInt;
    col *= 1.0 - 0.45 * length(uv - vec2(0.55, 0.5));
    gl_FragColor = vec4(col, 1.0);
  }
`;

export const pointsVertex = /* glsl */ `
  ${common}
  uniform float uDpr;
  attribute vec3 aSeed; // strand, fase, jitter
  varying float vAlpha;
  varying float vSky;
  void main() {
    float asp = uRes.x / uRes.y;
    float y = fract(aSeed.y + uTime * 0.025 * (0.5 + aSeed.z)) * 2.0 - 1.0;
    float x = strandX(y, aSeed.x) + (aSeed.z - 0.5) * 0.03;
    vec2 q = rot2(uRot) * vec2(x, y);
    vec2 uv = vec2(q.x / asp + 0.5, q.y + 0.5);
    gl_Position = vec4(uv * 2.0 - 1.0, 0.0, 1.0);
    gl_PointSize = (1.2 + aSeed.z * 3.0) * uDpr;
    vAlpha = (0.35 + 0.65 * aSeed.z) * smoothstep(1.0, 0.7, abs(y));
    vSky = step(0.82, fract(aSeed.z * 7.13));
  }
`;

export const pointsFragment = /* glsl */ `
  precision highp float;
  uniform float uInt;
  varying float vAlpha;
  varying float vSky;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float a = smoothstep(0.5, 0.0, length(c));
    vec3 col = mix(vec3(0.263, 0.89, 0.69), vec3(0.31, 0.70, 1.0), vSky);
    gl_FragColor = vec4(col, a * vAlpha * 0.85 * uInt);
  }
`;
