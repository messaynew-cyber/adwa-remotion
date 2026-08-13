import React from "react";
import {
  AbsoluteFill, Img, staticFile, Sequence, useCurrentFrame, useVideoConfig,
  spring, interpolate,
} from "remotion";
import {
  ParticleField, NeonText, ScrambleText, CTAButton, CinematicBars,
} from "./Components";

// ─── Ken Burns: cinematic glide over a still ──────────
// modes: "in" zoom-in, "out" zoom-out, "panL" pan left, "panR" pan right
const KenBurns: React.FC<{ src: string; mode: string }> = ({ src, mode }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = frame / durationInFrames;
  let scale = 1;
  let tx = 0;
  if (mode === "in") {
    scale = interpolate(t, [0, 1], [1.0, 1.18], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  } else if (mode === "out") {
    scale = interpolate(t, [0, 1], [1.18, 1.0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  } else if (mode === "panL") {
    scale = 1.14;
    tx = interpolate(t, [0, 1], [3, -3], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  } else if (mode === "panR") {
    scale = 1.14;
    tx = interpolate(t, [0, 1], [-3, 3], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  }
  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#000" }}>
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: "scale(" + scale + ") translateX(" + tx + "%)",
        }}
      />
    </AbsoluteFill>
  );
};

// ─── Dark gradient scrim + text overlay ───────────────
const Overlay: React.FC<{
  title: string;
  sub: string;
  align: "left" | "center" | "right";
  delay: number;
}> = ({ title, sub, align, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = spring({ frame, fps, config: { damping: 14, mass: 0.6 }, delay });
  const alignStyle =
    align === "center"
      ? { alignItems: "center", textAlign: "center" as const }
      : align === "right"
      ? { alignItems: "flex-end", textAlign: "right" as const }
      : { alignItems: "flex-start", textAlign: "left" as const };
  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        padding: 90,
        opacity,
        background:
          "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 35%, transparent 60%)",
        display: "flex",
        flexDirection: "column",
        ...alignStyle,
      }}
    >
      <NeonText text={title} size={72} color="#00ff88" delay={delay} />
      <ScrambleText text={sub} delay={delay + 12} color="#cccccc" size={34} />
    </AbsoluteFill>
  );
};

// ─── One scene: image + fade + overlay ────────────────
const Scene: React.FC<{
  img: string;
  mode: string;
  title?: string;
  sub?: string;
  align?: "left" | "center" | "right";
}> = ({ img, mode, title, sub, align = "left" }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const fadeIn = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 14, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ opacity: Math.min(fadeIn, fadeOut) }}>
      <KenBurns src={img} mode={mode} />
      {title ? <Overlay title={title} sub={sub || ""} align={align} delay={8} /> : null}
    </AbsoluteFill>
  );
};

// ─── The Main Event ───────────────────────────────────
export const AdwaApkPromo: React.FC = () => {
  const { fps } = useVideoConfig();
  const SCENE = 135; // 4.5s per scene @30fps
  const scenes = [
    { img: "scene1_hero.jpg", mode: "in", title: "ADWA", sub: "THE AI THAT LIVES ON YOUR PHONE", align: "center" },
    { img: "scene2_chat.jpg", mode: "panR", title: "TALK TO YOUR PHONE", sub: "LIKE CHATGPT — BUT IT OWNS YOUR DEVICE", align: "left" },
    { img: "scene3_fleet.jpg", mode: "in", title: "9 AI MODELS ON BOARD", sub: "A FLEET OF MINDS IN YOUR POCKET", align: "right" },
    { img: "scene4_voice.jpg", mode: "panL", title: "VOICE BRIEFINGS", sub: "SAVAGE. EVERY SINGLE MORNING.", align: "left" },
    { img: "scene5_trading.jpg", mode: "in", title: "LIVE DASHBOARDS", sub: "MARKETS. WEATHER. YOUR EMPIRE.", align: "right" },
    { img: "scene6_forge.jpg", mode: "out", title: "BUILT ON A PHONE", sub: "THE PHONEMAKER. NO CLOUD REQUIRED.", align: "left" },
  ] as const;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", fontFamily: "Arial, Helvetica, sans-serif" }}>
      {scenes.map((s, i) => (
        <Sequence key={s.img} from={i * SCENE} durationInFrames={SCENE}>
          <Scene img={s.img} mode={s.mode} title={s.title} sub={s.sub} align={s.align} />
        </Sequence>
      ))}

      {/* ─── Finale: ADWA logo reveal ─── */}
      <Sequence from={scenes.length * SCENE} durationInFrames={150}>
        <Finale />
      </Sequence>
    </AbsoluteFill>
  );
};

const Finale: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoSpring = spring({ frame, fps, config: { damping: 12, mass: 0.7 }, delay: 10 });
  const scale = 0.9 + logoSpring * 0.1;
  const glow = interpolate(frame, [10, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fade = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        opacity: fade,
      }}
    >
      <ParticleField seed={42} color="#00ff88" />
      <div
        style={{
          fontSize: 200,
          fontWeight: 900,
          letterSpacing: 20,
          color: "#ffd700",
          textShadow: "0 0 40px rgba(255,215,0,0.8), 0 0 120px rgba(255,215,0,0.4)",
          transform: "scale(" + scale + ")",
          opacity: glow,
        }}
      >
        ADWA
      </div>
      <div style={{ marginTop: 20, opacity: glow }}>
        <NeonText text="ONE INSTALL. YOUR AI." size={44} color="#00ff88" delay={35} />
      </div>
      <div style={{ marginTop: 60, opacity: glow }}>
        <CTAButton text="GET ADWA" delay={50} />
      </div>
      <div style={{ marginTop: 90, opacity: glow }}>
        <ScrambleText text="BUILT IN ADDIS ABABA. RUNS ON YOUR PHONE." delay={60} color="#888888" size={26} />
      </div>
      <CinematicBars />
    </AbsoluteFill>
  );
};
