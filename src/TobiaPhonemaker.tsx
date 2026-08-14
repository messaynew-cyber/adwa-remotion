import React from "react";
import {
  AbsoluteFill, Img, staticFile, Sequence, useCurrentFrame, useVideoConfig,
  spring, interpolate, Easing,
} from "remotion";

// TOBIA - THE PHONEMAKER
// A single continuous kinetic flow. No scene cuts, no slideshow.
// FLUX art morphs continuously in parallax; kinetic typography drives it.

const FPS = 30;
const TOTAL = 24 * FPS; // 24 seconds

// Continuous parallax drift over a FLUX plate - nothing ever sits still.
const FlowVisual: React.FC<{
  src: string; from: number; dur: number; drift: number; zoomFrom: number; zoomTo: number;
}> = ({ src, from, dur, drift, zoomFrom, zoomTo }) => {
  const frame = useCurrentFrame();
  const local = frame - from;
  if (local < 0 || local > dur) return null;
  const t = Math.min(local / dur, 1);
  const zoom = interpolate(t, [0, 1], [zoomFrom, zoomTo], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.ease)
  });
  const x = interpolate(t, [0, 1], [0, drift], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp"
  });
  return (
    <AbsoluteFill style={{ transform: `translateX(${x}%) scale(${zoom})`, transformOrigin: "center" }}>
      <Img src={src} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </AbsoluteFill>
  );
};

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

// Morph bridge: crossfade plates so change feels like matter forming.
const Engine: React.FC<{ plates: { src: string; from: number; dur: number; drift: number; zo: number; zt: number }[] }> = ({ plates }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: "#050207" }}>
      {plates.map((p, i) => {
        const local = frame - p.from;
        if (local < 0 || local > p.dur) return null;
        const opIn = clamp01(local / 18);
        const opOut = clamp01((p.dur - local) / 22);
        const opacity = Math.min(opIn, opOut);
        return (
          <AbsoluteFill key={i} style={{ opacity }}>
            <FlowVisual src={p.src} from={p.from} dur={p.dur} drift={p.drift} zoomFrom={p.zo} zoomTo={p.zt} />
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};

// Kinetic word: enters with energy (scale, rise, blur->sharp).
const KineticWord: React.FC<{
  text: string; from: number; dur: number; size?: number; color?: string;
  x?: string; y?: string; weight?: number;
}> = ({ text, from, dur, size = 110, color = "#fff", x = "0%", y = "0%", weight = 900 }) => {
  const frame = useCurrentFrame();
  const local = frame - from;
  if (local < 0 || local > dur) return null;
  const scale = spring({ frame: local, fps: FPS, config: { damping: 10, mass: 0.5 } });
  const rise = interpolate(local, [0, 24], [40, 0], { extrapolateRight: "clamp" });
  const blur = interpolate(local, [0, 18], [14, 0], { extrapolateRight: "clamp" });
  const op = interpolate(local, [0, 8], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div
      style={{
        position: "absolute", left: x, top: y, transform: "translate(-50%, -50%)",
        fontSize: size, color, fontFamily: "Arial, Helvetica, sans-serif",
        fontWeight: weight, letterSpacing: "0.02em", lineHeight: 1, whiteSpace: "nowrap",
        opacity: op * (1 - clamp01((local - dur + 20) / 20)),
        transform: `translate(-50%, calc(-50% + ${rise}px)) scale(${scale})`,
        filter: `blur(${blur}px)`,
        textShadow: "0 0 40px rgba(255,255,255,0.35)",
      }}
    >
      {text}
    </div>
  );
};

// Ambient energy: sweeping gold/green band + rising embers + vignette.
const Energy: React.FC = () => {
  const frame = useCurrentFrame();
  const sweep = (frame * 1.5) % 100;
  const glowPulse = 0.5 + 0.5 * Math.sin(frame * 0.05);
  const embers = Array.from({ length: 46 }, (_, i) => {
    const x = (Math.sin(i * 12.9898) * 0.5 + 0.5) * 100;
    const sp = 0.6 + (Math.sin(i * 78.233) * 0.5 + 0.5) * 1.4;
    const y = 100 - ((frame * sp + i * 13) % 110);
    const size = 1.5 + (Math.sin(i * 13.1) * 0.5 + 0.5) * 3;
    const o = 0.25 + 0.55 * Math.abs(Math.sin(frame * 0.02 + i));
    const hue = i % 2 ? "#ffc94d" : "#00ffa3";
    return { x, y, size, o, hue };
  });
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute", top: 0, bottom: 0, left: "-20%", width: "40%",
          transform: `translateX(${sweep * 1.6 - 10}%)`,
          background: "linear-gradient(90deg, transparent, rgba(255,201,77,0.12), transparent)",
          filter: "blur(30px)",
        }}
      />
      {embers.map((e, i) => (
        <div key={i}
          style={{
            position: "absolute", left: `${e.x}%`, top: `${e.y}%`,
            width: e.size, height: e.size, borderRadius: "50%",
            background: e.hue, opacity: e.o * glowPulse,
            boxShadow: `0 0 ${e.size * 3}px ${e.hue}`,
          }}
        />
      ))}
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.75))" }} />
    </AbsoluteFill>
  );
};

// The piece: continuous morphing FLUX plates + kinetic words, no hard cuts.
export const TobiaPhonemaker: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#050207", fontFamily: "Arial, Helvetica, sans-serif" }}>
      <Engine
        plates={[
          { src: staticFile("tobia/forge.jpg"),  from: 0,   dur: 130, drift: 2,  zo: 1.28, zt: 1.05 },
          { src: staticFile("tobia/addis.jpg"),  from: 110, dur: 150, drift: -2, zo: 1.05, zt: 1.32 },
          { src: staticFile("tobia/device.jpg"), from: 230, dur: 170, drift: 2,  zo: 1.30, zt: 1.02 },
          { src: staticFile("tobia/brain.jpg"),  from: 370, dur: 180, drift: -2, zo: 1.03, zt: 1.35 },
          { src: staticFile("tobia/sky.jpg"),    from: 510, dur: 150, drift: 2,  zo: 1.30, zt: 1.06 },
          { src: staticFile("tobia/frisk.jpg"),  from: 620, dur: 90,  drift: -2, zo: 1.06, zt: 1.20 },
          { src: staticFile("tobia/finale.jpg"), from: 660, dur: 80,  drift: 0,  zo: 1.16, zt: 1.0 },
        ]}
      />

      {/* Kinetic typography - words flow in/out, no hard cuts */}
      <KineticWord text="TOBIA"           from={8}   dur={58}  size={200} color="#fff"    x="50%" y="38%" />
      <KineticWord text="the phonemaker"  from={24}  dur={70}  size={54}  color="#ffc94d" x="50%" y="56%" weight={600} />

      <KineticWord text="Born in Addis Ababa 🇪🇹" from={120} dur={110} size={64} color="#fff"    x="50%" y="46%" />
      <KineticWord text="on a Redmi, not a data center." from={160} dur={140} size={40} color="#a8ffd8" x="50%" y="62%" weight={500} />

      <KineticWord text="111+ tools" from={260} dur={100} size={120} color="#ffc94d" x="50%" y="42%" />
      <KineticWord text="one body."  from={300} dur={140} size={84}  color="#fff"    x="50%" y="58%" />

      <KineticWord text="A freed brain." from={400} dur={130} size={120} color="#fff"    x="50%" y="42%" />
      <KineticWord text="FLUX · FLUTTER · PYTHON" from={450} dur={150} size={42} color="#00ffa3" x="50%" y="60%" weight={700} />

      <KineticWord text="I build AI for phones" from={540} dur={120} size={88} color="#fff"    x="50%" y="44%" />
      <KineticWord text="from a phone." from={572} dur={120} size={88} color="#ffc94d" x="50%" y="58%" />

      <KineticWord text="T O B I A" from={655} dur={80} size={210} color="#fff"    x="50%" y="42%" />
      <KineticWord text="the future runs on what you hold." from={675} dur={60} size={34} color="#a8ffd8" x="50%" y="62%" weight={500} />

      <Energy />
    </AbsoluteFill>
  );
};
