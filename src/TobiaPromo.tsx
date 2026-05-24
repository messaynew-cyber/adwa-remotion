import { AbsoluteFill, useVideoConfig, useCurrentFrame, spring, interpolate, Sequence } from "remotion";
import {
  ParticleField, NeonText, GlassCard, ScrambleText,
  CTAButton, CinematicBars, FadeTransition,
} from "./Components";

// ─── SCENE 1: Intro ───────────────────────────────────
const SceneIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const subtitleY = spring({ frame, fps, config: { damping: 15 }, delay: 20, from: 30, to: 0 });
  const subtitleOpacity = spring({ frame, fps, config: { damping: 20 }, delay: 25 });

  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, #0a0a1f 0%, #000000 70%)" }}>
      <ParticleField seed={42} color="#00ff88" />
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)", textAlign: "center",
      }}>
        <NeonText text="TOBIA" size={120} color="#00ff88" delay={5} />
        <div style={{ opacity: subtitleOpacity, transform: `translateY(${subtitleY}px)` }}>
          <NeonText text="AI THAT LIVES ON YOUR PHONE" size={28} color="#00ccff" delay={25} y={0} />
        </div>
        <div style={{ marginTop: 30 }}>
          <ScrambleText text="Built from a phone. For a phone." delay={40} color="#8888cc" size={18} />
        </div>
      </div>
      <CinematicBars />
    </AbsoluteFill>
  );
};

// ─── SCENE 2: The Problem ─────────────────────────────
const SceneProblem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lines = [
    "No Terminal. No Termux.",
    "No Docker. No root.",
    "Just an APK.",
  ];

  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 30% 50%, #0a0a1f 0%, #000000 70%)" }}>
      <ParticleField seed={137} color="#8888cc" />
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)", textAlign: "center", width: "80%",
      }}>
        <NeonText text="THE PROBLEM" size={52} color="#8888cc" delay={0} />
        <div style={{ marginTop: 40 }}>
          {lines.map((line, i) => (
            <div key={i} style={{ margin: "20px 0" }}>
              <ScrambleText text={line} delay={15 + i * 15} color="#aa88cc" size={28} />
            </div>
          ))}
        </div>
      </div>
      <CinematicBars />
    </AbsoluteFill>
  );
};

// ─── SCENE 3: The Swarm ───────────────────────────────
const SWARM_MODELS = [
  { name: "DEEPSEEK V3", color: "#00ff88", role: "Coding" },
  { name: "GEMINI 2.5 FLASH", color: "#00ccff", role: "Research" },
  { name: "QWEN3 CODER", color: "#8888cc", role: "Analysis" },
  { name: "NEMOTRON 120B", color: "#ff6644", role: "Reasoning" },
  { name: "MISTRAL LARGE", color: "#ffaa00", role: "Creative" },
  { name: "LLAMA 3.3 70B", color: "#44ff88", role: "Architecture" },
  { name: "GEMMA 4 26B", color: "#ff44aa", role: "Open Model" },
  { name: "GROQ 70B", color: "#44aaff", role: "Speed" },
  { name: "OWL ALPHA", color: "#aaff44", role: "Agent" },
];

const SceneSwarm: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, #050510 0%, #000000 80%)" }}>
      <ParticleField seed={256} color="#00ccff" />
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)", textAlign: "center", width: "90%",
      }}>
        <NeonText text="9-MODEL SWARM" size={56} color="#00ccff" delay={0} />
        <ScrambleText text="All free. All unstoppable." delay={15} color="#8888cc" size={16} />

        <div style={{
          display: "flex", flexWrap: "wrap", justifyContent: "center",
          gap: "12px", marginTop: 40, maxWidth: 800, margin: "40px auto 0",
        }}>
          {SWARM_MODELS.map((m, i) => {
            return (
              <SwarmBadge key={m.name} name={m.name} color={m.color} role={m.role} index={i} />
            );
          })}
        </div>
      </div>
      <CinematicBars />
    </AbsoluteFill>
  );
};

const SwarmBadge: React.FC<{ name: string; color: string; role: string; index: number }> = ({
  name, color, role, index,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delay = 20 + index * 6;
  const scale = spring({ frame, fps, config: { damping: 10, mass: 0.4 }, delay, from: 0 });
  const opacity = spring({ frame, fps, config: { damping: 15 }, delay });

  return (
    <div style={{
      opacity,
      transform: `scale(${scale})`,
      padding: "10px 18px",
      borderRadius: 12,
      border: `1px solid ${color}40`,
      background: `${color}10`,
      backdropFilter: "blur(10px)",
      minWidth: 130,
    }}>
      <div style={{ color, fontSize: 12, fontFamily: '"JetBrains Mono", monospace', fontWeight: 700 }}>
        {name}
      </div>
      <div style={{ color: `${color}80`, fontSize: 10, fontFamily: "system-ui", marginTop: 2 }}>
        {role}
      </div>
    </div>
  );
};

// ─── SCENE 4: Tools ───────────────────────────────────
const TOOLS = [
  { icon: "🔧", name: "Shell Access", desc: "/system/bin/sh" },
  { icon: "🐍", name: "Python Runtime", desc: "In-process Chaquopy" },
  { icon: "🔑", name: "SSH Client", desc: "Paramiko + Ed25519" },
  { icon: "🧠", name: "FTS5 Memory", desc: "Hippocampus DB" },
  { icon: "📸", name: "Image Search", desc: "DDG + Unsplash" },
  { icon: "🎙️", name: "Voice Briefings", desc: "Android TTS SDK" },
  { icon: "💹", name: "Trading", desc: "Alpaca Markets" },
  { icon: "📡", name: "Web Fetch", desc: "scrape + search" },
  { icon: "🖼️", name: "Wallpaper", desc: "Kotlin gradients" },
  { icon: "🏪", name: "Gebeya24", desc: "Classifieds deploy" },
];

const SceneTools: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 70% 30%, #0a0a1f 0%, #000000 70%)" }}>
      <ParticleField seed={512} color="#00ff88" />
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)", textAlign: "center", width: "90%",
      }}>
        <NeonText text="34 TOOLS" size={56} color="#00ff88" delay={0} />
        <ScrambleText text="Hardware · Software · Cloud" delay={15} color="#8888cc" size={16} />

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(5, 1fr)",
          gap: "10px", marginTop: 30, maxWidth: 900, margin: "30px auto 0",
        }}>
          {TOOLS.map((t, i) => {
            const delay = 20 + i * 4;
            const scale = spring({ frame, fps, config: { damping: 10, mass: 0.3 }, delay, from: 0 });
            const opacity = spring({ frame, fps, config: { damping: 15 }, delay });
            return (
              <div key={t.name} style={{
                opacity, transform: `scale(${scale})`,
                padding: "14px 10px", borderRadius: 12,
                border: "1px solid rgba(0,255,136,0.15)",
                background: "rgba(0,255,136,0.04)",
                textAlign: "center",
              }}>
                <div style={{ fontSize: 22 }}>{t.icon}</div>
                <div style={{ color: "#00ff88", fontSize: 10, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", marginTop: 6 }}>
                  {t.name}
                </div>
                <div style={{ color: "#8888cc", fontSize: 9, marginTop: 2, fontFamily: "system-ui" }}>
                  {t.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <CinematicBars />
    </AbsoluteFill>
  );
};

// ─── SCENE 5: The Phone ───────────────────────────────
const ScenePhone: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const phoneScale = spring({ frame, fps, config: { damping: 10, mass: 0.6 }, delay: 15, from: 0.5 });
  const glowPulse = Math.sin(frame * 0.05) * 0.3 + 0.7;

  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, #0a0a1f 0%, #000000 80%)" }}>
      <ParticleField seed={777} color="#00ccff" />

      {/* Phone silhouette */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: `translate(-50%, -50%) scale(${phoneScale})`,
        width: 220, height: 440,
        borderRadius: 30,
        border: "3px solid rgba(0, 255, 136, 0.4)",
        background: "linear-gradient(135deg, rgba(0,255,136,0.05), rgba(0,204,255,0.05))",
        boxShadow: `0 0 ${60 * glowPulse}px rgba(0, 255, 136, 0.15)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column",
      }}>
        <div style={{ color: "#00ff88", fontSize: 40, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>
          TOBIA
        </div>
        <div style={{ color: "#8888cc", fontSize: 12, marginTop: 8, fontFamily: "system-ui" }}>
          v149 · 19MB
        </div>
        <div style={{
          marginTop: 20, padding: "8px 20px",
          borderRadius: 20, background: "rgba(0,255,136,0.15)",
          color: "#00ff88", fontSize: 11, fontFamily: "'JetBrains Mono', monospace",
        }}>
          INSTALL
        </div>
      </div>

      <div style={{
        position: "absolute", bottom: "18%", left: "50%",
        transform: "translateX(-50%)", textAlign: "center",
      }}>
        <NeonText text="ONE APK. NO TERMINAL." size={32} color="#00ccff" delay={30} />
      </div>
      <CinematicBars />
    </AbsoluteFill>
  );
};

// ─── SCENE 6: CTA ─────────────────────────────────────
const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tagline = spring({ frame, fps, config: { damping: 8, mass: 0.3 }, delay: 10, from: -50, to: 0 });

  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, #000a00 0%, #000000 80%)" }}>
      <ParticleField seed={999} color="#00ff88" />
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)", textAlign: "center",
      }}>
        <div style={{ transform: `translateY(${tagline}px)` }}>
          <NeonText text="THE PHONEMAKER" size={72} color="#00ff88" delay={5} />
        </div>
        <div style={{ marginTop: 16 }}>
          <ScrambleText text="AI that builds AI for phones, from a phone." delay={25} color="#8888cc" size={18} />
        </div>
        <div style={{ marginTop: 50 }}>
          <CTAButton text="GITHUB.COM/MESSAYNEW-CYBER/ADWA-APK" delay={40} />
        </div>
      </div>
      <CinematicBars />
    </AbsoluteFill>
  );
};

// ─── MAIN COMPOSITION ─────────────────────────────────
export const TobiaPromo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000", fontFamily: "system-ui, sans-serif" }}>
      <Sequence from={0} durationInFrames={150}>
        <SceneIntro />
      </Sequence>
      <Sequence from={140} durationInFrames={140}>
        <SceneProblem />
      </Sequence>
      <Sequence from={270} durationInFrames={180}>
        <SceneSwarm />
      </Sequence>
      <Sequence from={440} durationInFrames={200}>
        <SceneTools />
      </Sequence>
      <Sequence from={630} durationInFrames={180}>
        <ScenePhone />
      </Sequence>
      <Sequence from={800} durationInFrames={180}>
        <SceneCTA />
      </Sequence>
    </AbsoluteFill>
  );
};
