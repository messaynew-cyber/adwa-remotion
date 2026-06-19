import { AbsoluteFill, useVideoConfig, useCurrentFrame, spring, interpolate, Sequence } from "remotion";
import {
  ParticleField, NeonText, GlassCard, ScrambleText,
  CTAButton, CinematicBars, FadeTransition,
} from "./Components";

// ─── SCENE 1: Who Is This Guy? ────────────────────────
const SceneWho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const subtitleY = spring({ frame, fps, config: { damping: 15 }, delay: 20, from: 30, to: 0 });
  const subtitleOpacity = spring({ frame, fps, config: { damping: 20 }, delay: 25 });

  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #0a0a1a 0%, #0d1025 100%)" }}>
      <ParticleField seed={777} color="#ffaa00" />
      <CinematicBars opacity={0.5} />
      <div style={{
        position: "absolute", top: "25%", width: "100%",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 20,
      }}>
        <NeonText text="MESSAY" size={80} color="#ffaa00" delay={10} />
        <div style={{ transform: `translateY(${subtitleY}px)`, opacity: subtitleOpacity }}>
          <NeonText text="TIGISTU" size={36} color="#ffcc44" delay={30} />
        </div>
      </div>
      <div style={{
        position: "absolute", top: "62%", width: "100%",
        display: "flex", justifyContent: "center", opacity: subtitleOpacity,
      }}>
        <GlassCard delay={35} width="50%">
          <div style={{ padding: 20, textAlign: "center" }}>
            <ScrambleText
              text="aka THE ARCHITECT"
              size={22} color="#ffffff" delay={40} speed={3} />
          </div>
        </GlassCard>
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
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #0d1025 0%, #0a0a1a 100%)" }}>
      <ParticleField seed={42} color="#00ff88" />
      <CinematicBars opacity={0.4} />
      <div style={{
        position: "absolute", top: "12%", width: "100%", textAlign: "center",
      }}>
        <NeonText text="HE BUILT" size={52} color="#ffffff" delay={10} />
      </div>
      <div style={{
        position: "absolute", top: "32%", width: "100%",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
      }}>
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
            <div key={b.name} style={{
              transform: `translateX(${cardX}px)`,
              opacity: cardOpacity,
              display: "flex", gap: 20, alignItems: "center",
              background: "rgba(255,255,255,0.04)",
              borderRadius: 12, padding: "12px 28px",
              border: `1px solid ${b.color}33`,
              minWidth: 420, justifyContent: "space-between",
            }}>
              <span style={{
                color: b.color, fontSize: 22, fontWeight: 800,
                fontFamily: "monospace", letterSpacing: 2,
              }}>{b.name}</span>
              <span style={{
                color: "#aaa", fontSize: 16, fontFamily: "sans-serif",
              }}>{b.desc}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ─── SCENE 3: The Quote ───────────────────────────────
const SceneQuote: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lines = [
    "\"MAKE IT MOVE\"",
    "\"DON'T REPORT IT — FIX IT\"",
    "\"DIRECT. SARCASTIC. R-RATED.\"",
  ];

  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #0a0a1a 0%, #150a20 100%)" }}>
      <ParticleField seed={999} color="#ff6644" />
      <CinematicBars opacity={0.5} />
      <div style={{
        position: "absolute", top: "15%", width: "100%", textAlign: "center",
      }}>
        <NeonText text="THE PRIME" size={44} color="#ff6644" delay={10} />
        <div style={{ marginTop: 8 }}>
          <NeonText text="DIRECTIVES" size={28} color="#ff8866" delay={25} />
        </div>
      </div>
      <div style={{
        position: "absolute", top: "42%", width: "100%",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 22,
      }}>
        {lines.map((line, i) => {
          const opacity = spring({
            frame: Math.max(0, frame - 35 - i * 18),
            fps, config: { damping: 15 },
          });
          return (
            <div key={i} style={{ opacity }}>
              <ScrambleText
                text={line}
                size={i === 0 ? 34 : 22}
                color={i === 0 ? "#ffffff" : "#cccccc"}
                delay={40 + i * 18}
                speed={2}
              />
            </div>
          );
        })}
      </div>
      <div style={{
        position: "absolute", top: "78%", width: "100%",
        display: "flex", justifyContent: "center",
        opacity: spring({ frame: Math.max(0, frame - 80), fps, config: { damping: 14 } }),
      }}>
        <GlassCard delay={85} width="55%">
          <div style={{ padding: 16, textAlign: "center" }}>
            <span style={{ color: "#ffaa00", fontSize: 16, fontFamily: "monospace" }}>
              HE SHIPS. HE DOESN'T DEBATE.
            </span>
          </div>
        </GlassCard>
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
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #150a20 0%, #0a0a1a 100%)" }}>
      <ParticleField seed={333} color="#ffaa00" />
      <CinematicBars opacity={0.3} />
      <div style={{
        position: "absolute", top: "20%", width: "100%", textAlign: "center",
      }}>
        <NeonText text="THE FUTURE" size={50} color="#ffffff" delay={10} />
      </div>
      <div style={{
        position: "absolute", top: "42%", width: "100%",
        display: "flex", justifyContent: "center", gap: 30, flexWrap: "wrap",
      }}>
        {words.map((word, i) => {
          const scale = spring({
            frame: Math.max(0, frame - 45 - i * 15),
            fps, config: { damping: 10, mass: 0.4 },
            from: 0.3, to: 1,
          });
          return (
            <div key={word} style={{
              transform: `scale(${scale})`,
              padding: "14px 24px",
              border: "1px solid rgba(255,170,0,0.3)",
              borderRadius: 8,
              background: "rgba(255,170,0,0.06)",
            }}>
              <span style={{
                color: "#ffaa00", fontSize: 20, fontWeight: 700,
                fontFamily: "monospace", letterSpacing: 1,
              }}>{word}</span>
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
    <AbsoluteFill style={{
      background: "radial-gradient(circle at center, #1a1000 0%, #0a0a1a 70%)",
    }}>
      <ParticleField seed={777} color="#ffaa00" />
      <CinematicBars opacity={0.6} />
      <div style={{
        position: "absolute", top: "28%", width: "100%",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
        transform: `translateY(${punch}px)`,
      }}>
        <NeonText text="MESSAY" size={88} color="#ffaa00" delay={20} />
        <div style={{ marginTop: 8 }}>
          <NeonText text="TIGISTU" size={42} color="#ffcc44" delay={40} />
        </div>
      </div>
      <div style={{
        position: "absolute", top: "68%", width: "100%",
        display: "flex", justifyContent: "center",
        opacity: spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 12 } }),
      }}>
        <GlassCard delay={65} width="45%">
          <div style={{
            padding: 20, textAlign: "center",
            filter: `drop-shadow(0 0 ${glow * 40}px rgba(255,170,0,0.6))`,
          }}>
            <span style={{
              color: "#ffaa00", fontSize: 28, fontWeight: 900,
              fontFamily: "monospace", letterSpacing: 3,
            }}>
              THE ARCHITECT
            </span>
            <div style={{ marginTop: 12 }}>
              <span style={{ color: "#888", fontSize: 14, fontFamily: "sans-serif" }}>
                If it ships, he built it.
              </span>
            </div>
          </div>
        </GlassCard>
      </div>
    </AbsoluteFill>
  );
};

// ─── MAIN COMPOSITION ─────────────────────────────────
const MessayPromo: React.FC = () => {
  const { fps } = useVideoConfig();
  const sceneDuration = 4 * fps; // 4 seconds per scene

  return (
    <AbsoluteFill style={{ background: "#0a0a1a", fontFamily: "sans-serif" }}>
      <Sequence from={0} durationInFrames={sceneDuration}>
        <SceneWho />
        <FadeTransition duration={15} />
      </Sequence>
      <Sequence from={sceneDuration} durationInFrames={sceneDuration}>
        <SceneBuilder />
        <FadeTransition duration={15} />
      </Sequence>
      <Sequence from={sceneDuration * 2} durationInFrames={sceneDuration}>
        <SceneQuote />
        <FadeTransition duration={15} />
      </Sequence>
      <Sequence from={sceneDuration * 3} durationInFrames={sceneDuration}>
        <SceneFuture />
        <FadeTransition duration={15} />
      </Sequence>
      <Sequence from={sceneDuration * 4} durationInFrames={sceneDuration + fps}>
        <SceneOutro />
      </Sequence>
    </AbsoluteFill>
  );
};

export default MessayPromo;
