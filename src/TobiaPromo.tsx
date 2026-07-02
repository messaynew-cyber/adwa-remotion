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
  intro: 90,      // 0-3s
  identity: 90,   // 3-6s
  capabilities: 120, // 6-10s
  closing: 90,    // 10-13s
};

type SceneProps = { frame: number; fps: number; startFrame: number };

const SceneIntro: React.FC<SceneProps> = ({ frame, fps, startFrame }) => {
  const localFrame = frame - startFrame;
  const titleReveal = spring({
    frame: localFrame,
    fps,
    config: { damping: 12, mass: 0.6 },
  });
  const subtitleFade = interpolate(localFrame, [20, 45], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: "#0a0a0a" }}>
      <ParticleField count={80} color="#00ff88" speed={0.5} />
      <div
        style={{
          position: "absolute",
          top: "35%",
          width: "100%",
          textAlign: "center",
          transform: `scale(${titleReveal})`,
        }}
      >
        <NeonText
          text="T O B I A"
          color="#00ff88"
          fontSize={72}
          glowIntensity={1.2}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: "55%",
          width: "100%",
          textAlign: "center",
          opacity: subtitleFade,
        }}
      >
        <NeonText
          text="the phonemaker"
          color="#00cc66"
          fontSize={28}
          glowIntensity={0.6}
        />
      </div>
      <CinematicBars opacity={0.3} />
    </AbsoluteFill>
  );
};

const SceneIdentity: React.FC<SceneProps> = ({ frame, fps, startFrame }) => {
  const localFrame = frame - startFrame;
  const cardSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 15, mass: 0.8 },
  });
  const textFade = interpolate(localFrame, [15, 40], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: "#0a0a0a" }}>
      <ParticleField count={40} color="#ffaa00" speed={0.3} />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${cardSpring})`,
        }}
      >
        <GlassCard width={600} padding={40}>
          <div style={{ textAlign: "center", opacity: textFade }}>
            <NeonText
              text="I AM THE PHONEMAKER"
              color="#ffaa00"
              fontSize={36}
              glowIntensity={0.8}
            />
            <div style={{ marginTop: 24 }}>
              <p style={{ color: "#ccc", fontSize: 18, fontFamily: "sans-serif", margin: "8px 0" }}>
                Born in Python. Running on Flutter.
              </p>
              <p style={{ color: "#ccc", fontSize: 18, fontFamily: "sans-serif", margin: "8px 0" }}>
                Built in Addis Ababa. 🇪🇹
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
      <CinematicBars opacity={0.3} />
    </AbsoluteFill>
  );
};

const SceneCapabilities: React.FC<SceneProps> = ({ frame, fps, startFrame }) => {
  const localFrame = frame - startFrame;

  const items = [
    { text: "111+ TOOLS", color: "#00ff88", delay: 0 },
    { text: "FLUTTER ENGINE", color: "#ffaa00", delay: 10 },
    { text: "PYTHON BRAIN", color: "#4488ff", delay: 20 },
    { text: "PHONE AS BODY", color: "#ff4488", delay: 30 },
  ];

  return (
    <AbsoluteFill style={{ background: "#0a0a0a" }}>
      <ParticleField count={60} color="#4488ff" speed={0.4} />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        {items.map((item, i) => {
          const slideIn = spring({
            frame: localFrame - item.delay,
            fps,
            config: { damping: 20, mass: 0.5 },
          });
          const opacity = interpolate(
            localFrame,
            [item.delay, item.delay + 15],
            [0, 1],
            { extrapolateRight: "clamp" }
          );
          return (
            <div
              key={i}
              style={{
                transform: `translateX(${(1 - slideIn) * 80}px)`,
                opacity,
              }}
            >
              <NeonText
                text={item.text}
                color={item.color}
                fontSize={34}
                glowIntensity={0.7}
              />
            </div>
          );
        })}
      </div>
      <CinematicBars opacity={0.3} />
    </AbsoluteFill>
  );
};

const SceneClosing: React.FC<SceneProps> = ({ frame, fps, startFrame }) => {
  const localFrame = frame - startFrame;
  const barsClose = interpolate(localFrame, [0, 60], [0.3, 0.95], {
    extrapolateRight: "clamp",
  });
  const taglineSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 12, mass: 0.5 },
  });
  const finalFade = interpolate(localFrame, [60, 85], [1, 0], {
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: "#000000", opacity: finalFade }}>
      <ParticleField count={100} color="#ffaa00" speed={0.6} />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${taglineSpring})`,
          textAlign: "center",
        }}
      >
        <NeonText
          text="YOUR PHONE."
          color="#00ff88"
          fontSize={48}
          glowIntensity={1.0}
        />
        <div style={{ marginTop: 16 }}>
          <NeonText
            text="MY BODY."
            color="#ffaa00"
            fontSize={48}
            glowIntensity={1.0}
          />
        </div>
      </div>
      <CinematicBars opacity={barsClose} />
    </AbsoluteFill>
  );
};

export const TobiaPromo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  let sceneStart = 0;
  const scenes = [
    { Comp: SceneIntro, dur: SCENE_DURATIONS.intro },
    { Comp: SceneIdentity, dur: SCENE_DURATIONS.identity },
    { Comp: SceneCapabilities, dur: SCENE_DURATIONS.capabilities },
    { Comp: SceneClosing, dur: SCENE_DURATIONS.closing },
  ];

  let currentScene = scenes[0];
  let accumulated = 0;
  for (const scene of scenes) {
    if (frame < accumulated + scene.dur) {
      currentScene = scene;
      sceneStart = accumulated;
      break;
    }
    accumulated += scene.dur;
  }

  const SceneComponent = currentScene.Comp;
  return (
    <AbsoluteFill>
      <SceneComponent frame={frame} fps={fps} startFrame={sceneStart} />
    </AbsoluteFill>
  );
};
