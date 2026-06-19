import { AbsoluteFill, useVideoConfig, useCurrentFrame, spring, interpolate } from "remotion";

// Ethiopian flag colors
const GREEN = "#009444";
const GOLD = "#FCDD09";
const RED = "#DA291C";
const OLED = "#000000";
const GLASS = "rgba(10, 10, 15, 0.85)";
const WHITE = "#f0f0f0";

export const BattleOfAdwa: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Scene timing (450 frames = 15s @ 30fps)
  const titleIn = spring({ frame, fps, config: { damping: 12, mass: 0.8 } });
  const titleScale = interpolate(titleIn, [0, 1], [2.5, 1]);
  const titleOpacity = interpolate(frame, [5, 25], [0, 1], { extrapolateRight: "clamp" });

  const dateSlide = interpolate(frame, [30, 60], [60, 0], { extrapolateRight: "clamp" });
  const dateOpacity = interpolate(frame, [30, 45], [0, 1], { extrapolateRight: "clamp" });

  const emperorOpacity = interpolate(frame, [75, 100], [0, 1], { extrapolateRight: "clamp" });
  const emperorSlide = interpolate(frame, [75, 105], [-40, 0], { extrapolateRight: "clamp" });

  const menelikOpacity = interpolate(frame, [100, 130], [0, 1], { extrapolateRight: "clamp" });
  const menelikSlide = interpolate(frame, [100, 130], [50, 0], { extrapolateRight: "clamp" });

  const statsOpacity = interpolate(frame, [160, 190], [0, 1], { extrapolateRight: "clamp" });

  const ethiopiaBarWidth = interpolate(frame, [170, 220], [0, 580], { extrapolateRight: "clamp" });
  const italyBarWidth = interpolate(frame, [180, 230], [0, 200], { extrapolateRight: "clamp" });

  const killedEthOpacity = interpolate(frame, [230, 260], [0, 1], { extrapolateRight: "clamp" });
  const killedItOpacity = interpolate(frame, [250, 280], [0, 1], { extrapolateRight: "clamp" });

  const victoryScale = spring({ frame: frame - 280, fps, config: { damping: 10, mass: 0.6 } });
  const victoryClamped = frame < 280 ? 0 : Math.min(victoryScale, 1.6);
  const victoryOpacity = interpolate(frame, [280, 310], [0, 1], { extrapolateRight: "clamp" });

  const legacyOpacity = interpolate(frame, [330, 360], [0, 1], { extrapolateRight: "clamp" });
  const legacySlide = interpolate(frame, [330, 365], [40, 0], { extrapolateRight: "clamp" });

  const finalOpacity = interpolate(frame, [380, 410], [0, 1], { extrapolateRight: "clamp" });
  const finalFadeOut = interpolate(frame, [430, 450], [1, 0], { extrapolateLeft: "clamp" });

  const stripeHeight = height / 3;
  const flagAlpha = 0.06;

  return (
    <AbsoluteFill style={{ background: OLED, fontFamily: "'JetBrains Mono', 'Courier New', monospace" }}>
      {/* Ethiopian flag stripes */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: stripeHeight, background: GREEN, opacity: flagAlpha }} />
      <div style={{ position: "absolute", top: stripeHeight, left: 0, width: "100%", height: stripeHeight, background: GOLD, opacity: flagAlpha }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: stripeHeight, background: RED, opacity: flagAlpha }} />

      {/* Glass panel */}
      <div style={{ position: "absolute", top: "12%", left: "10%", width: "80%", height: "76%", background: GLASS, border: "1px solid rgba(252, 221, 9, 0.15)", borderRadius: 20, boxShadow: "0 0 80px rgba(252, 221, 9, 0.05), inset 0 0 80px rgba(0, 0, 0, 0.4)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden", opacity: finalFadeOut }}>
        <h1 style={{ fontSize: 120, fontWeight: 900, color: GOLD, textShadow: "0 0 60px rgba(252, 221, 9, 0.4), 0 0 120px rgba(218, 41, 28, 0.2)", letterSpacing: 24, margin: 0, transform: `scale(${titleScale})`, opacity: titleOpacity }}>ADWA</h1>
        <p style={{ fontSize: 28, color: WHITE, opacity: dateOpacity, transform: `translateY(${dateSlide}px)`, marginTop: 12, letterSpacing: 6 }}>MARCH 1, 1896</p>
        <div style={{ marginTop: 40, opacity: emperorOpacity, transform: `translateY(${emperorSlide}px)`, textAlign: "center" }}>
          <p style={{ fontSize: 20, color: "rgba(255,255,255,0.5)", margin: 0, letterSpacing: 4 }}>EMPEROR MENELIK II</p>
          <p style={{ fontSize: 40, fontWeight: 700, color: GREEN, margin: "8px 0 0 0", textShadow: "0 0 40px rgba(0, 148, 68, 0.3)", opacity: menelikOpacity, transform: `translateX(${menelikSlide}px)` }}>LED ETHIOPIA TO VICTORY</p>
        </div>
        {/* Battle stats bars */}
        <div style={{ marginTop: 50, width: "70%", opacity: statsOpacity, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ color: GREEN, fontSize: 18, fontWeight: 700, width: 140, textAlign: "right" }}>ETHIOPIA</span>
            <div style={{ flex: 1, height: 14, background: "rgba(255,255,255,0.05)", borderRadius: 7, overflow: "hidden" }}>
              <div style={{ width: ethiopiaBarWidth, height: "100%", background: `linear-gradient(90deg, ${GREEN}, ${GOLD})`, borderRadius: 7, boxShadow: "0 0 20px rgba(0, 148, 68, 0.4)" }} />
            </div>
            <span style={{ color: WHITE, fontSize: 22, fontWeight: 700, width: 80 }}>~100K</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 18, fontWeight: 700, width: 140, textAlign: "right" }}>ITALY</span>
            <div style={{ flex: 1, height: 14, background: "rgba(255,255,255,0.05)", borderRadius: 7, overflow: "hidden" }}>
              <div style={{ width: italyBarWidth, height: "100%", background: "rgba(255,255,255,0.3)", borderRadius: 7 }} />
            </div>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 20, fontWeight: 700, width: 80 }}>~17K</span>
          </div>
        </div>
        {/* Casualties */}
        <div style={{ marginTop: 30, display: "flex", gap: 60, textAlign: "center" }}>
          <div style={{ opacity: killedItOpacity }}>
            <p style={{ color: RED, fontSize: 36, fontWeight: 900, margin: 0, textShadow: "0 0 30px rgba(218,41,28,0.5)" }}>7,000</p>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, margin: "4px 0 0 0", letterSpacing: 2 }}>ITALIAN LOSSES</p>
          </div>
          <div style={{ opacity: killedEthOpacity }}>
            <p style={{ color: GOLD, fontSize: 36, fontWeight: 900, margin: 0, textShadow: "0 0 30px rgba(252,221,9,0.4)" }}>4,000</p>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, margin: "4px 0 0 0", letterSpacing: 2 }}>ETHIOPIAN LOSSES</p>
          </div>
        </div>
        {/* Victory banner */}
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", background: `linear-gradient(transparent, ${GOLD}20)`, padding: "24px 0", textAlign: "center", opacity: victoryOpacity, borderTop: "1px solid rgba(252, 221, 9, 0.2)" }}>
          <p style={{ fontSize: 44, fontWeight: 900, color: GOLD, margin: 0, letterSpacing: 10, textShadow: "0 0 60px rgba(252, 221, 9, 0.6)", transform: `scale(${victoryClamped})` }}>DECISIVE VICTORY</p>
        </div>
      </div>

      {/* Legacy text */}
      <div style={{ position: "absolute", bottom: "8%", left: "10%", width: "80%", textAlign: "center", opacity: legacyOpacity, transform: `translateY(${legacySlide}px)` }}>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 16, margin: 0, letterSpacing: 3 }}>FIRST AFRICAN NATION TO DEFEAT A EUROPEAN COLONIAL POWER</p>
      </div>

      {/* Final message */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: finalOpacity, background: OLED }}>
        <p style={{ fontSize: 60, fontWeight: 900, color: GREEN, margin: 0, textShadow: "0 0 80px rgba(0,148,68,0.5)", letterSpacing: 8 }}>RESILIENCE</p>
        <p style={{ fontSize: 60, fontWeight: 900, color: GOLD, margin: "12px 0", textShadow: "0 0 80px rgba(252,221,9,0.5)", letterSpacing: 8 }}>DEFIANCE</p>
        <p style={{ fontSize: 60, fontWeight: 900, color: RED, margin: "12px 0 0 0", textShadow: "0 0 80px rgba(218,41,28,0.5)", letterSpacing: 8 }}>SOVEREIGNTY</p>
        <p style={{ marginTop: 40, color: "rgba(255,255,255,0.3)", fontSize: 18, letterSpacing: 4 }}>ADWA · 1896</p>
      </div>

      {/* Cinematic bars */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 72, background: OLED, opacity: 0.7 }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 72, background: OLED, opacity: 0.7 }} />
    </AbsoluteFill>
  );
};