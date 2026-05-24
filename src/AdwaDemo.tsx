import { AbsoluteFill, useVideoConfig, useCurrentFrame, spring, interpolate } from "remotion";

export const AdwaDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = spring({ frame, fps, config: { damping: 20 } });
  const scale = spring({ frame, fps, config: { damping: 15 } });
  const textSlide = interpolate(frame, [0, 30], [-50, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000000",
        fontFamily: '"JetBrains Mono", monospace',
      }}
    >
      {/* OLED black background with subtle gradient */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, #0a0a0f 0%, #000000 70%)",
        }}
      />

      {/* Glass panel */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${scale})`,
          background: "rgba(10, 10, 15, 0.85)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(0, 255, 136, 0.3)",
          borderRadius: 24,
          padding: "60px 80px",
          textAlign: "center",
          boxShadow: "0 0 60px rgba(0, 255, 136, 0.1)",
        }}
      >
        <h1
          style={{
            color: "#00ff88",
            fontSize: 64,
            fontWeight: 700,
            margin: 0,
            opacity,
            letterSpacing: "-0.02em",
            textShadow: "0 0 40px rgba(0, 255, 136, 0.5)",
          }}
        >
          ADWA
        </h1>
        <p
          style={{
            color: "#8888cc",
            fontSize: 24,
            marginTop: 16,
            transform: `translateY(${textSlide}px)`,
          }}
        >
          Rendered on GitHub Actions · 16GB · Zero OOM
        </p>
      </div>

      {/* Cinematic bars */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "10%",
          background: "#000000",
          opacity: 0.9,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "10%",
          background: "#000000",
          opacity: 0.9,
        }}
      />
    </AbsoluteFill>
  );
};
