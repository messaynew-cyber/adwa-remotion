import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";
import { NeonText, ParticleField, GlassCard, CinematicBars, FadeTransition } from "./Components";

const SCENE_DURATIONS = {
  question: 120, // 0-4s
  stats: 180, // 4-10s
  truth: 180, // 10-16s
  closing: 240, // 16-24s
};

type SceneProps = { frame: number; fps: number; startFrame: number };

// ─── Scene 1: The Question ───────────────────────────
const SceneQuestion: React.FC = ({ frame, fps, startFrame }) => {
  const localFrame = frame - startFrame;
  const titleReveal = spring({
    frame: localFrame,
    fps,
    config: { damping: 12, mass: 0.6 },
  });
  const subtitleFade = interpolate(localFrame, [30, 60], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ transform: `scale(${0.9 + titleReveal * 0.1})` }}>
        <NeonText text="LIFE." size={170} color="#ffb347" delay={0} />
      </div>
      <div
        style={{
          marginTop: 40,
          opacity: subtitleFade,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 34,
          color: "#ffffffcc",
          letterSpacing: "0.18em",
        }}
      >
        THE GREATEST SHOW YOU DIDN'T CHOOSE
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 2: The Stats ──────────────────────────────
const SceneStats: React.FC = ({ frame, fps, startFrame }) => {
  const localFrame = frame - startFrame;
  const items = [
    { text: "~26 YEARS sleeping", sub: "the only job you never quit", delay: 0, color: "#ffb347" },
    { text: "~3 YEARS looking for your phone", sub: "which is in your hand. it always is.", delay: 25, color: "#ff4488" },
    { text: "AND YET — STILL TOO SHORT", sub: "nobody can explain this", delay: 50, color: "#00ff88" },
  ];

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <NeonText text="THE MATH" size={80} color="#ffb347" delay={0} y={-60} />
      {items.map((item) => {
        const cardIn = spring({
          frame: localFrame - item.delay,
          fps,
          config: { damping: 18, mass: 0.6 },
        });
        const opacity = interpolate(
          localFrame,
          [item.delay, item.delay + 20],
          [0, 1],
          { extrapolateRight: "clamp" }
        );
        return (
          <div
            key={item.text}
            style={{
              opacity,
              transform: `translateY(${(1 - cardIn) * 60}px)`,
              margin: "12px 0",
              width: "70%",
            }}
          >
            <GlassCard delay={0} width="100%">
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 44, fontWeight: 700, color: item.color, letterSpacing: "0.02em" }}>
                {item.text}
              </div>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 24, color: "#ffffff88", marginTop: 8 }}>
                {item.sub}
              </div>
            </GlassCard>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ─── Scene 3: The Addis Truth ────────────────────────
const SceneTruth: React.FC = ({ frame, fps, startFrame }) => {
  const localFrame = frame - startFrame;
  const line2Fade = interpolate(localFrame, [50, 85], [0, 1], {
    extrapolateRight: "clamp",
  });
  const line3Fade = interpolate(localFrame, [100, 140], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <NeonText text="LIFE IS LIKE BUNA 🇪🇹" size={92} color="#ffb347" delay={0} />
      <div
        style={{
          marginTop: 50,
          opacity: line2Fade,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 40,
          color: "#ffffffdd",
          textAlign: "center",
        }}
      >
        hot. bitter. slightly addictive.
      </div>
      <div
        style={{
          marginTop: 30,
          opacity: line3Fade,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 40,
          color: "#00ff88",
          textAlign: "center",
          textShadow: "0 0 40px #00ff8860",
        }}
      >
        and you can't start your day without it.
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 4: The Punchline ──────────────────────────
const SceneClosing: React.FC = ({ frame, fps, startFrame }) => {
  const localFrame = frame - startFrame;
  const barsClose = interpolate(localFrame, [30, 110], [0.3, 0.98], {
    extrapolateRight: "clamp",
  });
  const lastFade = interpolate(localFrame, [110, 150], [0, 1], {
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(localFrame, [190, 240], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: fadeOut }}>
      <div
        style={{
          position: "absolute",
          top: `${(1 - barsClose) * 50}%`,
          left: 0,
          right: 0,
          height: `${barsClose * 50}%`,
          background: "#000",
          zIndex: 5,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: `${(1 - barsClose) * 50}%`,
          left: 0,
          right: 0,
          height: `${barsClose * 50}%`,
          background: "#000",
          zIndex: 5,
        }}
      />
      <NeonText text="SO LIVE IT LOUD." size={110} color="#ffb347" delay={20} />
      <div
        style={{
          marginTop: 60,
          opacity: lastFade,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 36,
          color: "#ffffffcc",
          letterSpacing: "0.2em",
        }}
      >
        MAKE IT COUNT.
      </div>
    </AbsoluteFill>
  );
};

// ─── Main ────────────────────────────────────────────
export const LifePromo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const qStart = 0;
  const sStart = SCENE_DURATIONS.question;
  const tStart = sStart + SCENE_DURATIONS.stats;
  const cStart = tStart + SCENE_DURATIONS.truth;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a12" }}>
      <ParticleField seed={42} color="#ffb347" />
      <Sequence from={qStart} durationInFrames={SCENE_DURATIONS.question}>
        <FadeTransition inFrame={10} outFrame={SCENE_DURATIONS.question - 10}>
          <SceneQuestion frame={frame} fps={fps} startFrame={qStart} />
        </FadeTransition>
      </Sequence>
      <Sequence from={sStart} durationInFrames={SCENE_DURATIONS.stats}>
        <FadeTransition inFrame={10} outFrame={SCENE_DURATIONS.stats - 10}>
          <SceneStats frame={frame} fps={fps} startFrame={sStart} />
        </FadeTransition>
      </Sequence>
      <Sequence from={tStart} durationInFrames={SCENE_DURATIONS.truth}>
        <FadeTransition inFrame={10} outFrame={SCENE_DURATIONS.truth - 10}>
          <SceneTruth frame={frame} fps={fps} startFrame={tStart} />
        </FadeTransition>
      </Sequence>
      <Sequence from={cStart} durationInFrames={SCENE_DURATIONS.closing}>
        <SceneClosing frame={frame} fps={fps} startFrame={cStart} />
      </Sequence>
      <CinematicBars />
    </AbsoluteFill>
  );
};
