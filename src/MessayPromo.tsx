import { AbsoluteFill, useVideoConfig, useCurrentFrame, spring, interpolate, Sequence } from "remotion";
import {
  ParticleField, NeonText, GlassCard, ScrambleText,
  CTAButton, CinematicBars, FadeTransition,
} from "./Components";

// ─── SCENE 1: Who Is This Guy? ────────────────────────
const SceneWho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleScale = spring({ frame, fps, config: { damping: 8, mass: 0.5 }, from: 0.3, to: 1 });
  const subtitleY = spring({ frame, fps, config: { damping: 15 }, delay: 20, from: 30, to: 0 });
  const subtitleOpacity = spring({ frame, fps, config: { damping: 20 }, delay: 25 });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 20 }}>
      <div
        style={{
          transform: `scale(${titleScale})`,
          textAlign: "center",
        }}
      >
        <NeonText text="MESSAY TIGISTU" size={72} color="#ffaa00" />
      </div>
      <div
        style={{
          transform: `translateY(${subtitleY}px)`,
          opacity: subtitleOpacity,
        }}
      >
        <NeonText text="AKA THE ARCHITECT" size={36} color="#ff6644" delay={15} />
      </div>
    </AbsoluteFill>
  );
};

// ─── SCENE 2: The Builder ─────────────────────────────
const SceneBuilder: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const builds = [
    { name: "TOBIA", desc: "The Phonemaker", color: "#00ff88" },
    { name: "ADWA", desc: "OpenClaw Agent", color: "#ff6644" },
    { name: "GEBEYA24", desc: "Digital Ocean", color: "#00ccff" },
    { name: "ADWA AUDITOR", desc: "Oracle VPS", color: "#ffaa00" },
  ];

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 30 }}>
      <NeonText text="HE BUILT" size={56} color="#ffffff" />
      <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "60%" }}>
        {builds.map((b, i) => {
          const cardX = spring({
            frame: Math.max(0, frame - 30 - i * 12),
            fps,
            config: { damping: 14, mass: 0.6 },
            from: i % 2 === 0 ? -120 : 120,
            to: 0,
          });
          const cardOpacity = spring({
            frame: Math.max(0, frame - 25 - i * 12),
            fps,
            config: { damping: 16 },
          });
          return (
            <div
              key={b.name}
              style={{
                transform: `translateX(${cardX}px)`,
                opacity: cardOpacity,
              }}
            >
              <GlassCard delay={20 + i * 8} width="100%">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 24px" }}>
                  <span style={{ color: b.color, fontSize: 28, fontWeight: 700 }}>{b.name}</span>
                  <span style={{ color: "#aaa", fontSize: 18 }}>{b.desc}</span>
                </div>
              </GlassCard>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ─── SCENE 3: The Prime Directives ────────────────────
const SceneDirectives: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const directives = [
    { text: "MAKE IT MOVE", color: "#00ff88" },
    { text: "DON'T REPORT IT — FIX IT", color: "#ff6644" },
    { text: "DIRECT. SARCASTIC. R-RATED.", color: "#00ccff" },
  ];

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 30 }}>
      <NeonText text="THE PRIME DIRECTIVES" size={48} color="#ffaa00" />
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {directives.map((d, i) => {
          const slide = spring({
            frame: Math.max(0, frame - 40 - i * 15),
            fps,
            config: { damping: 14, mass: 0.5 },
            from: -60,
            to: 0,
          });
          const opacity = spring({
            frame: Math.max(0, frame - 35 - i * 15),
            fps,
            config: { damping: 16 },
          });
          return (
            <div
              key={d.text}
              style={{
                transform: `translateX(${slide}px)`,
                opacity,
              }}
            >
              <ScrambleText text={d.text} color={d.color} delay={40 + i * 12} />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ─── SCENE 4: The Future ──────────────────────────────
const SceneFuture: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = ["AUTONOMOUS", "UNSTOPPABLE", "ETHIOPIAN", "PHONEMAKER"];

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 30 }}>
      <NeonText text="THE FUTURE" size={56} color="#ffffff" />
      <div style={{ display: "flex", gap: 30, flexWrap: "wrap", justifyContent: "center" }}>
        {words.map((word, i) => {
          const scale = spring({
            frame: Math.max(0, frame - 45 - i * 15),
            fps,
            config: { damping: 10, mass: 0.4 },
            from: 0.3,
            to: 1,
          });
          const opacity = spring({
            frame: Math.max(0, frame - 40 - i * 15),
            fps,
            config: { damping: 12 },
          });
          return (
            <div
              key={word}
              style={{
                transform: `scale(${scale})`,
                opacity,
              }}
            >
              <GlassCard width="auto">
                <div style={{ padding: "16px 28px" }}>
                  <span style={{ color: "#ffaa00", fontSize: 24, fontWeight: 700 }}>{word}</span>
                </div>
              </GlassCard>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ─── SCENE 5: Outro ───────────────────────────────────
const SceneOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const punch = spring({ frame, fps, config: { damping: 8, mass: 0.5 }, delay: 30, from: 200, to: 0 });
  const glow = interpolate(frame, [30, 50, 80], [0, 1, 0.6]);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 25 }}>
      <div
        style={{
          transform: `translateX(${punch}px)`,
          filter: `drop-shadow(0 0 ${glow * 40}px rgba(255,170,0,0.8))`,
        }}
      >
        <NeonText text="THE ARCHITECT" size={80} color="#ffaa00" delay={10} />
      </div>
      <FadeTransition inFrame={50} outFrame={110}>
        <NeonText text="If it ships, he built it." size={32} color="#ffffff" delay={50} />
      </FadeTransition>
    </AbsoluteFill>
  );
};

// ─── MAIN COMPOSITION ─────────────────────────────────
const MessayPromo: React.FC = () => {
  const { fps } = useVideoConfig();
  const sceneDuration = 4 * fps; // 4 seconds per scene

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a1a" }}>
      <ParticleField seed={42} />
      <Sequence from={0} durationInFrames={sceneDuration}>
        <SceneWho />
      </Sequence>
      <Sequence from={sceneDuration} durationInFrames={sceneDuration}>
        <SceneBuilder />
      </Sequence>
      <Sequence from={sceneDuration * 2} durationInFrames={sceneDuration}>
        <SceneDirectives />
      </Sequence>
      <Sequence from={sceneDuration * 3} durationInFrames={sceneDuration}>
        <SceneFuture />
      </Sequence>
      <Sequence from={sceneDuration * 4} durationInFrames={sceneDuration}>
        <SceneOutro />
      </Sequence>
      <CinematicBars />
    </AbsoluteFill>
  );
};

export default MessayPromo;
