import React from "react";
import {
  AbsoluteFill, Img, staticFile, Sequence, useCurrentFrame, useVideoConfig,
  spring, interpolate, Easing,
} from "remotion";

// ─── FROM THE FORGE ──────────────────────────────────
// A cinematic manifesto. The story of AI forged from a phone,
// in a world that swore it couldn't be done.
// Palette: OLED void, molten gold #ffc94d, ember particles.
// Motion: Emil canon — transform+opacity, ease-out springs, exit faster.

const FPS = 30;
const TOTAL = 30 * FPS; // 30 seconds

// ── Ember particle field (rises like forge sparks) ──
const Embers: React.FC<{ count?: number; color?: string }> = ({
  count = 60, color = "#ffc94d",
}) => {
  const frame = useCurrentFrame();
  const sparks = Array.from({ length: count }, (_, i) => {
    const seed = (i * 78.233) % 1;
    return {
      x: seed * 100,
      y: (i * 13.7) % 100,
      size: 1 + seed * 3.5,
      speed: 0.4 + seed * 1.2,
      drift: 0.3 + seed * 0.7,
      osc: i * 0.31,
    };
  });
  return (
    <AbsoluteFill style={{ overflow: "hidden", pointerEvents: "none" }}>
      {sparks.map((s, i) => {
        const rise = 100 - ((frame * s.speed * 1.4 + s.y * 10) % 110);
        const x = s.x + Math.sin(frame * 0.02 + s.osc) * s.drift * 2.2;
        const twinkle = 0.35 + 0.6 * Math.abs(Math.sin(frame * 0.05 + s.osc * 3));
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${rise}%`,
              width: s.size,
              height: s.size,
              borderRadius: "50%",
              background: color,
              opacity: twinkle,
              boxShadow: `0 0 ${6 + s.size * 2}px ${color}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// ── Kinetic Type line ──
const KineticLine: React.FC<{ text: string; from: number; dur: number; size?: number; color?: string; letterSpacing?: number }> = ({
  text, from, dur, size = 64, color = "#fff", letterSpacing = 0.04,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - from;
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: "0 6%",
        opacity: interpolate(local, [0, 10, dur - 8, dur], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        transform: `translateY(${spring({
          frame: local, fps, config: { damping: 18, mass: 0.7 },
          from: 46, to: 0,
        })}px) scale(${interpolate(local, [0, 12], [0.96, 1], { extrapolateRight: "clamp" })})`,
      }}
    >
      <h1
        style={{
          fontSize: size,
          fontWeight: 800,
          textAlign: "center",
          color,
          letterSpacing: `${letterSpacing}em`,
          textShadow: `0 0 30px rgba(255, 201, 77, 0.35)`,
          lineHeight: 1.15,
          margin: 0,
          fontFamily: "'system-ui', sans-serif",
        }}
      >
        {text}
      </h1>
    </div>
  );
};

// ── Tagline (smaller caption) ──
const Tagline: React.FC<{ text: string; from: number; color?: string }> = ({ text, from, color = "#9aa5b1" }) => {
  const frame = useCurrentFrame();
  const local = frame - from;
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        textAlign: "center",
        padding: "0 12%",
        top: "66%",
        opacity: interpolate(local, [0, 14, 60, 68], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
      }}
    >
      <p style={{ fontSize: 30, color, letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 300, margin: 0 }}>
        {text}
      </p>
    </div>
  );
};

// ── Ken Burns plate under a dark gloss ──
const ForgePlate: React.FC<{ src: string; zoomFrom?: number; zoomTo?: number; drift?: number }> = ({
  src, zoomFrom = 1.05, zoomTo = 1.18, drift = -40,
}) => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame % 300, [0, 300], [zoomFrom, zoomTo], {
    extrapolateRight: "clamp", easing: Easing.inOut(Easing.ease),
  });
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Img
        src={staticFile(src)}
        style={{
          width: "108%",
          height: "108%",
          objectFit: "cover",
          transform: `scale(${zoom}) translateX(${drift * 0.001}px)`,
          filter: "saturate(0.85) contrast(1.05) brightness(0.7)",
          marginLeft: "-4%",
        }}
      />
      <AbsoluteFill style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92), rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.7))" }} />
    </AbsoluteFill>
  );
};

export const FromTheForge: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#030303", overflow: "hidden" }}>
      {/* Scene 1: The void + challenge */}
      <Sequence from={0} durationInFrames={7 * FPS}>
        <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, #140b02 0%, #030303 60%)" }} />
        <Embers count={70} />
        <KineticLine
          from={4}
          dur={195}
          text="THEY SAID"
          size={92}
          color="#fff"
        />
        <KineticLine
          from={2 * FPS + 2}
          dur={150}
          text="IT COULDN'T BE DONE ON A PHONE"
          size={58}
          color="#ffc94d"
        />
      </Sequence>

      {/* Scene 2: The forge */}
      <Sequence from={7 * FPS} durationInFrames={6 * FPS}>
        <ForgePlate src="scene6_forge.jpg" zoomFrom={1.02} zoomTo={1.16} />
        <Embers count={80} />
        <KineticLine from={3} dur={150} text="NO STUDIO." size={72} color="#fff" />
        <KineticLine from={2 * FPS} dur={110} text="NO SERVER FARM." size={72} color="#ffc94d" />
      </Sequence>

      {/* Scene 3: Just a phone + will */}
      <Sequence from={13 * FPS} durationInFrames={6 * FPS}>
        <ForgePlate src="scene2_chat.jpg" zoomFrom={1.08} zoomTo={1.2} drift={50} />
        <Embers count={60} color="#7a5cff" />
        <KineticLine from={3} dur={120} text="JUST A PHONE." size={70} color="#fff" />
        <KineticLine from={2 * FPS} dur={100} text="A KEYBOARD." size={70} color="#c9b8ff" />
        <Tagline from={3 * FPS + 4} text="and the will to build" color="#9aa5b1" />
      </Sequence>

      {/* Scene 4: The fleet */}
      <Sequence from={19 * FPS} durationInFrames={6 * FPS}>
        <ForgePlate src="scene3_fleet.jpg" zoomFrom={1.05} zoomTo={1.2} />
        <Embers count={90} color="#00ffa3" />
        <KineticLine from={3} dur={120} text="APK AFTER APK." size={64} color="#fff" />
        <KineticLine from={2 * FPS} dur={100} text="FORGED COLD." size={80} color="#00ffa3" />
      </Sequence>

      {/* Scene 5: The finale */}
      <Sequence from={25 * FPS} durationInFrames={5 * FPS}>
        <ForgePlate src="scene7_finale.jpg" zoomFrom={1.0} zoomTo={1.12} />
        <Embers count={70} color="#ffc94d" />
        <KineticLine from={3} dur={135} text="THE PHONEMAKER" size={84} color="#fff" />
        <KineticLine from={2 * FPS} dur={75} text="LIVES HERE." size={84} color="#ffc94d" />
        <Tagline from={3 * FPS + 4} text="adwa" color="#ffc94d" />
      </Sequence>

      {/* Global cinematic letterbox */}
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 90, background: "#000" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 90, background: "#000" }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
