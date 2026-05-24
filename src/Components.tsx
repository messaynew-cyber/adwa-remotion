import { useCurrentFrame, useVideoConfig, spring, interpolate, AbsoluteFill } from "remotion";

// ─── Particle Field ───────────────────────────────────
const PARTICLE_COUNT = 80;

interface Particle {
  x: number; y: number; size: number; speed: number;
  opacity: number; hue: number; drift: number;
}

const generateParticles = (seed: number): Particle[] => {
  const p: Particle[] = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const s = seed + i * 137.5;
    p.push({
      x: ((s * 7) % 100) / 100,
      y: ((s * 13) % 100) / 100,
      size: 1 + ((s * 3) % 4),
      speed: 0.3 + ((s * 5) % 7) / 10,
      opacity: 0.3 + ((s * 3) % 5) / 10,
      hue: (s * 40) % 360,
      drift: ((s * 2) % 3) - 1,
    });
  }
  return p;
};

export const ParticleField: React.FC<{ seed: number; color?: string }> = ({ seed, color }) => {
  const frame = useCurrentFrame();
  const particles = generateParticles(seed);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {particles.map((p, i) => {
        const y = ((p.y * 100 + frame * p.speed * 3) % 100);
        const x = p.x * 100 + Math.sin(frame * 0.02 + i) * p.drift * 5;
        const opacity = p.opacity * (0.4 + 0.6 * Math.sin(frame * 0.03 + p.x * 10));
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: color || `hsl(${p.hue}, 80%, 60%)`,
              opacity,
              boxShadow: `0 0 ${p.size * 3}px ${color || "currentColor"}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// ─── Neon Text ────────────────────────────────────────
export const NeonText: React.FC<{
  text: string; size?: number; color?: string;
  delay?: number; y?: number;
}> = ({ text, size = 48, color = "#00ff88", delay = 0, y = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = spring({ frame, fps, config: { damping: 15, mass: 0.5 }, delay });
  const slide = spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 12 }, from: 40, to: 0 });

  return (
    <h1
      style={{
        color,
        fontSize: size,
        fontWeight: 700,
        margin: 0,
        opacity,
        letterSpacing: "-0.02em",
        textShadow: `0 0 40px ${color}80, 0 0 80px ${color}40, 0 0 120px ${color}20`,
        transform: `translateY(${slide}px)`,
        fontFamily: '"JetBrains Mono", monospace',
        textAlign: "center",
      }}
    >
      {text}
    </h1>
  );
};

// ─── Glass Card ───────────────────────────────────────
export const GlassCard: React.FC<{
  children: React.ReactNode; delay?: number; width?: string;
}> = ({ children, delay = 0, width = "60%" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ frame, fps, config: { damping: 12, mass: 0.8 }, delay, from: 0.8 });
  const opacity = spring({ frame, fps, config: { damping: 20 }, delay });

  return (
    <div
      style={{
        width,
        opacity,
        transform: `scale(${scale})`,
        background: "rgba(10, 10, 15, 0.85)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(0, 255, 136, 0.2)",
        borderRadius: 20,
        padding: "40px 50px",
        textAlign: "center",
        boxShadow: "0 0 60px rgba(0, 255, 136, 0.08)",
      }}
    >
      {children}
    </div>
  );
};

// ─── Scramble Text ────────────────────────────────────
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export const ScrambleText: React.FC<{
  text: string; delay?: number; color?: string; size?: number;
}> = ({ text, delay = 0, color = "#8888cc", size = 20 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 8, mass: 0.3 },
    from: 0,
    to: 1,
  });

  const display = text
    .split("")
    .map((c, i) => {
      if (c === " ") return " ";
      const charProgress = Math.min(1, Math.max(0, progress * text.length - i));
      if (charProgress >= 1) return c;
      return chars[Math.floor(Math.random() * chars.length)];
    })
    .join("");

  return (
    <span style={{ color, fontSize: size, fontFamily: '"JetBrains Mono", monospace' }}>
      {display}
    </span>
  );
};

// ─── CTA Button ───────────────────────────────────────
export const CTAButton: React.FC<{ text: string; delay?: number }> = ({
  text,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ frame, fps, config: { damping: 8, mass: 0.3 }, delay });
  const glow = spring({ frame, fps, config: { damping: 6, mass: 0.2 }, delay: delay + 5 });

  return (
    <div
      style={{
        display: "inline-block",
        transform: `scale(${scale})`,
        padding: "16px 40px",
        borderRadius: 50,
        background: "linear-gradient(135deg, #00ff88, #00ccff)",
        color: "#000",
        fontSize: 22,
        fontWeight: 700,
        fontFamily: "system-ui, sans-serif",
        boxShadow: `0 0 ${30 + glow * 30}px rgba(0, 255, 136, ${0.3 + glow * 0.4})`,
        cursor: "pointer",
        letterSpacing: "0.02em",
      }}
    >
      {text}
    </div>
  );
};

// ─── Cinematic Bars ───────────────────────────────────
export const CinematicBars: React.FC = () => (
  <>
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0,
      height: "10%", background: "#000", zIndex: 10,
    }} />
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0,
      height: "10%", background: "#000", zIndex: 10,
    }} />
  </>
);

// ─── Scene Transitions ────────────────────────────────
export const FadeTransition: React.FC<{
  children: React.ReactNode; inFrame: number; outFrame: number;
}> = ({ children, inFrame, outFrame }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [inFrame - 10, inFrame, outFrame, outFrame + 10],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  return <div style={{ opacity, position: "absolute", inset: 0 }}>{children}</div>;
};
