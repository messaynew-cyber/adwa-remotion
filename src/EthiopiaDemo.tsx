import { AbsoluteFill, useVideoConfig, useCurrentFrame, spring, interpolate, random } from "remotion";
import { useMemo } from "react";

// Ethiopian flag colors
const GREEN = "#00994C";
const YELLOW = "#FEDD00";
const RED = "#EF2B2D";

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  speed: number;
}

const generateParticles = (count: number, width: number, height: number): Particle[] => {
  return Array.from({ length: count }, (_, i) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 3 + 1,
    color: [GREEN, YELLOW, RED, "#FFD700", "#ffffff"][Math.floor(Math.random() * 5)],
    delay: Math.random() * 60,
    speed: Math.random() * 1.5 + 0.3,
  }));
};

export const EthiopiaDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const durationInFrames = 900;

  const particles = useMemo(() => generateParticles(120, width, height), [width, height]);

  // Animations
  const opacity = spring({ frame, fps, config: { damping: 20 } });
  const scale = spring({ frame, fps, config: { damping: 15 } });
  const titleSlide = interpolate(frame, [0, 25], [-80, 0], { extrapolateRight: "clamp" });
  const subtitleOpacity = interpolate(frame, [20, 45], [0, 1], { extrapolateRight: "clamp" });
  const flagBarOpacity = interpolate(frame, [10, 35], [0, 1], { extrapolateRight: "clamp" });
  const particleOpacity = interpolate(frame, [5, 40], [0, 0.7], { extrapolateRight: "clamp" });
  
  // Second scene text
  const scene2Text = interpolate(frame, [120, 150], [-60, 0], { extrapolateRight: "clamp" });
  const scene2Opacity = interpolate(frame, [100, 130], [0, 1], { extrapolateRight: "clamp" });
  
  // Third scene
  const scene3Opacity = interpolate(frame, [250, 280], [0, 1], { extrapolateRight: "clamp" });
  const scene3Scale = interpolate(frame, [250, 290], [0.8, 1], { extrapolateRight: "clamp" });
  
  // Final scene
  const finalOpacity = interpolate(frame, [420, 450], [0, 1], { extrapolateRight: "clamp" });

  // Cinematic bar animation
  const barHeight = interpolate(frame, [0, 15], [0, 80], { extrapolateRight: "clamp" });
  const endBarClose = interpolate(frame, [durationInFrames - 40, durationInFrames], [80, 0], { extrapolateRight: "clamp" });
  const actualBarHeight = frame > durationInFrames - 40 ? endBarClose : barHeight;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* OLED black background with radial gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, rgba(254, 221, 0, 0.08) 0%, rgba(0, 153, 76, 0.05) 40%, transparent 70%)`,
        }}
      />

      {/* Flag stripe gradient background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: flagBarOpacity * 0.15,
          background: `linear-gradient(180deg, ${GREEN} 0%, ${YELLOW} 50%, ${RED} 100%)`,
        }}
      />

      {/* Particles */}
      <div style={{ position: "absolute", inset: 0, opacity: particleOpacity }}>
        {particles.map((p, i) => {
          const floatY = p.y - ((frame - p.delay) * p.speed) % height;
          const particleOpacity = Math.sin((frame + i * 7) * 0.03) * 0.5 + 0.5;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: p.x,
                top: floatY < 0 ? floatY + height : floatY,
                width: p.size,
                height: p.size,
                borderRadius: "50%",
                backgroundColor: p.color,
                opacity: particleOpacity,
                boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
              }}
            />
          );
        })}
      </div>

      {/* Cinematic bars - top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: actualBarHeight,
          background: `linear-gradient(180deg, ${GREEN} 0%, ${YELLOW} 50%, ${RED} 100%)`,
          opacity: 0.3,
        }}
      />

      {/* Cinematic bars - bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: actualBarHeight,
          background: `linear-gradient(0deg, ${RED} 0%, ${YELLOW} 50%, ${GREEN} 100%)`,
          opacity: 0.3,
        }}
      />

      {/* ===== SCENE 1: Title ===== */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: opacity,
          transform: `scale(${scale})`,
        }}
      >
        {/* Glass panel */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.04)",
            backdropFilter: "blur(20px)",
            borderRadius: 24,
            border: "1px solid rgba(254, 221, 0, 0.2)",
            padding: "60px 100px",
            textAlign: "center",
            boxShadow: "0 25px 80px rgba(0, 153, 76, 0.15), 0 0 120px rgba(254, 221, 0, 0.08)",
          }}
        >
          <h1
            style={{
              fontSize: 96,
              fontWeight: 900,
              margin: 0,
              background: `linear-gradient(135deg, ${GREEN} 0%, ${YELLOW} 50%, ${RED} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "none",
              filter: "drop-shadow(0 0 30px rgba(254, 221, 0, 0.4))",
              transform: `translateY(${titleSlide}px)`,
              letterSpacing: "-2px",
            }}
          >
            Ethiopia
          </h1>
          <p
            style={{
              fontSize: 28,
              color: "rgba(255,255,255,0.7)",
              marginTop: 16,
              fontWeight: 300,
              letterSpacing: "4px",
              opacity: subtitleOpacity,
            }}
          >
            LAND OF ORIGINS
          </p>
        </div>
      </div>

      {/* ===== SCENE 2: Culture ===== */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: scene2Opacity,
        }}
      >
        <div
          style={{
            background: "rgba(0, 153, 76, 0.08)",
            backdropFilter: "blur(15px)",
            borderRadius: 20,
            border: "1px solid rgba(0, 153, 76, 0.3)",
            padding: "50px 80px",
            textAlign: "center",
            transform: `translateY(${scene2Text}px)`,
            boxShadow: "0 20px 60px rgba(0, 153, 76, 0.12)",
          }}
        >
          <p style={{
            fontSize: 48,
            fontWeight: 800,
            color: YELLOW,
            margin: 0,
            letterSpacing: "-1px",
            textShadow: "0 0 40px rgba(254, 221, 0, 0.5)",
          }}>
            80+ Ethnic Groups
          </p>
          <p style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.6)",
            marginTop: 10,
            fontWeight: 300,
          }}>
            3,000 Years of History
          </p>
        </div>
      </div>

      {/* ===== SCENE 3: Landmarks ===== */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: scene3Opacity,
          transform: `scale(${scene3Scale})`,
        }}
      >
        <div
          style={{
            background: "rgba(239, 43, 45, 0.06)",
            backdropFilter: "blur(15px)",
            borderRadius: 20,
            border: "1px solid rgba(239, 43, 45, 0.3)",
            padding: "50px 80px",
            textAlign: "center",
            boxShadow: "0 20px 60px rgba(239, 43, 45, 0.1)",
          }}
        >
          <p style={{
            fontSize: 56,
            fontWeight: 900,
            color: "#ffffff",
            margin: 0,
            textShadow: "0 0 50px rgba(255,255,255,0.3)",
            letterSpacing: "-1px",
          }}>
            Simien Mountains
          </p>
          <p style={{
            fontSize: 22,
            color: YELLOW,
            marginTop: 8,
            fontWeight: 400,
          }}>
            Ras Dashen · 4,550m
          </p>
        </div>
      </div>

      {/* ===== SCENE 4: Finale ===== */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: finalOpacity,
        }}
      >
        <div
          style={{
            background: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(25px)",
            borderRadius: 24,
            border: "1px solid rgba(254, 221, 0, 0.25)",
            padding: "60px 100px",
            textAlign: "center",
            boxShadow: `0 30px 100px rgba(254, 221, 0, 0.1), inset 0 0 80px rgba(0, 153, 76, 0.05)`,
          }}
        >
          <h1
            style={{
              fontSize: 72,
              fontWeight: 900,
              margin: 0,
              background: `linear-gradient(135deg, ${GREEN} 20%, ${YELLOW} 50%, ${RED} 80%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 40px rgba(254, 221, 0, 0.5))",
              letterSpacing: "-2px",
            }}
          >
            Ethiopia
          </h1>
          <p style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.5)",
            marginTop: 12,
            fontWeight: 300,
            letterSpacing: "6px",
          }}>
            THE CRADLE OF HUMANITY
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
