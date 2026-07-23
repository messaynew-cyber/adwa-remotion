import { useCurrentFrame, useVideoConfig, spring, interpolate, AbsoluteFill } from "remotion";

// ── Cinematic Gold Line ──
const GoldLine = ({ width, delay = 0 }: { width: number; delay?: number }) => {
  const frame = useCurrentFrame();
  const w = spring({ frame: frame - delay, fps: 30, config: { damping: 12, stiffness: 60 }, durationInFrames: 60 });
  return (
    <div style={{
      height: 1,
      background: "linear-gradient(90deg, transparent, #C9A96E, transparent)",
      width: width * w,
      margin: "0 auto",
    }} />
  );
};

// ── Cinematic Bars ──
const CinematicBars = () => (
  <>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 108, background: "#0a0a0a", zIndex: 10 }} />
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 108, background: "#0a0a0a", zIndex: 10 }} />
  </>
);

// ── Gold Border Frame ──
const GoldBorderFrame = ({ children, show }: { children: React.ReactNode; show: number }) => {
  return (
    <div style={{ position: "relative", display: "inline-block", padding: "40px 60px" }}>
      <div style={{
        position: "absolute", top: 0, left: 0, width: show * 80, height: 1,
        background: "#C9A96E", transition: "width 0.1s",
      }} />
      <div style={{
        position: "absolute", top: 0, right: 0, width: 1, height: Math.max(0, (show - 0.5) * 160),
        background: "#C9A96E",
      }} />
      <div style={{
        position: "absolute", bottom: 0, right: 0, width: Math.max(0, (show - 1) * 160), height: 1,
        background: "#C9A96E",
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0, width: 1, height: Math.max(0, (show - 1.5) * 160),
        background: "#C9A96E",
      }} />
      {children}
    </div>
  );
};

// ── Stat Card ──
const StatCard = ({ label, delay, index }: { label: string; delay: number; index: number }) => {
  const frame = useCurrentFrame();
  const appear = spring({ frame: frame - delay, fps: 30, config: { damping: 10, stiffness: 50 } });
  const y = interpolate(appear, [0, 1], [60, 0]);
  const opacity = interpolate(appear, [0, 0.3, 1], [0, 0, 1]);
  const barW = spring({ frame: frame - delay - 30, fps: 30, config: { damping: 8, stiffness: 40 } });

  return (
    <div style={{
      opacity,
      transform: `translateY(${y}px)`,
      background: "rgba(201,169,110,0.04)",
      border: "1px solid rgba(201,169,110,0.2)",
      borderRadius: 2,
      padding: "30px 40px",
      width: 320,
      backdropFilter: "blur(20px)",
    }}>
      <div style={{
        fontFamily: "serif",
        fontSize: 22,
        color: "#C9A96E",
        marginBottom: 16,
        letterSpacing: 2,
        fontWeight: 600,
      }}>{label}</div>
      <div style={{
        height: 2,
        background: "rgba(201,169,110,0.1)",
        borderRadius: 1,
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          width: `${barW * 100}%`,
          background: "linear-gradient(90deg, #C9A96E, #D4AF37)",
          borderRadius: 1,
        }} />
      </div>
    </div>
  );
};

// ── MAIN COMPONENT ──
export default function OsacPromo() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Breathing background scale
  const bgScale = 1 + Math.sin(frame * 0.01) * 0.02;

  // Section 1: Logo reveal (0-120)
  const logoFade = spring({ frame, fps: 30, config: { damping: 15, stiffness: 50 } });
  const logoY = interpolate(logoFade, [0, 1], [30, 0]);
  const subtitleFade = spring({ frame: frame - 30, fps: 30, config: { damping: 15, stiffness: 50 } });

  // Section 2: Dubai text (120-350)
  const sec2Frame = frame - 130;
  const dubaiFade = spring({ frame: sec2Frame, fps: 30, config: { damping: 12, stiffness: 45 } });
  const borderProgress = spring({ frame: sec2Frame - 20, fps: 30, config: { damping: 10, stiffness: 40 } });

  // Section 3: Aman (350-550)
  const sec3Frame = frame - 370;
  const amanFade = spring({ frame: sec3Frame, fps: 30, config: { damping: 12, stiffness: 45 } });

  // Section 4: Stats (550-770)
  const sec4Frame = frame - 570;

  // Section 5: CTA (750-900)
  const sec5Frame = frame - 770;
  const ctaFade = spring({ frame: sec5Frame, fps: 30, config: { damping: 14, stiffness: 50 } });
  const ctaScale = interpolate(ctaFade, [0, 1], [0.95, 1]);
  const phoneGlow = interpolate(Math.sin(frame * 0.05), [-1, 1], [0.3, 1]);

  return (
    <AbsoluteFill style={{ background: "#0a0a0a" }}>
      {/* Subtle radial glow */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse at center, rgba(201,169,110,0.04) 0%, transparent 70%)",
        transform: `scale(${bgScale})`,
      }} />

      {/* Subtle gradient overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(180deg, #0a0a0a 0%, #111108 50%, #0a0a0a 100%)",
      }} />

      <CinematicBars />

      {/* ── SECTION 1: LOGO ── */}
      <div style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: frame > 350 ? interpolate(frame, [350, 380], [1, 0]) : 1,
      }}>
        <div style={{
          fontFamily: "serif",
          fontSize: 120,
          fontWeight: 700,
          color: "#C9A96E",
          letterSpacing: 24,
          opacity: logoFade,
          transform: `translateY(${logoY}px)`,
          textShadow: "0 0 80px rgba(201,169,110,0.3)",
          lineHeight: 1,
        }}>OSAC</div>
        <div style={{
          fontFamily: "serif",
          fontSize: 20,
          color: "#C9A96E",
          letterSpacing: 14,
          marginTop: 8,
          opacity: subtitleFade,
          fontWeight: 300,
        }}>REAL ESTATE</div>
        <div style={{ marginTop: 30, opacity: subtitleFade }}>
          <GoldLine width={200} delay={40} />
        </div>
      </div>

      {/* ── SECTION 2: DUBAI ── */}
      <div style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: frame >= 130 && frame < 350 ? 1 : 0,
      }}>
        <GoldBorderFrame show={borderProgress}>
          <div style={{
            fontFamily: "serif",
            fontSize: 52,
            color: "#F5F0E8",
            fontWeight: 300,
            letterSpacing: 6,
            textAlign: "center",
            opacity: dubaiFade,
            lineHeight: 1.3,
          }}>
            Dubai's<br />Finest Properties
          </div>
        </GoldBorderFrame>
      </div>

      {/* ── SECTION 3: AMAN ── */}
      <div style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: frame >= 350 && frame < 550 ? 1 : 0,
      }}>
        <div style={{
          width: 1,
          height: 80 * amanFade,
          background: "linear-gradient(180deg, transparent, #C9A96E, transparent)",
          marginBottom: 30,
        }} />
        <div style={{
          fontFamily: "serif",
          fontSize: 46,
          color: "#F5F0E8",
          fontWeight: 400,
          letterSpacing: 4,
          opacity: amanFade,
          transform: `translateY(${interpolate(amanFade, [0,1], [20,0])}px)`,
        }}>Curated by Aman Ahmed</div>
        <div style={{
          fontFamily: "serif",
          fontSize: 20,
          color: "#C9A96E",
          letterSpacing: 8,
          marginTop: 14,
          opacity: interpolate(amanFade, [0.3, 1], [0, 1]),
          fontWeight: 300,
        }}>Property Advisor · Osac Real Estate</div>
      </div>

      {/* ── SECTION 4: STATS ── */}
      <div style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
        opacity: frame >= 550 && frame < 750 ? 1 : 0,
      }}>
        <StatCard label="Luxury Villas" delay={0} index={0} />
        <StatCard label="Premium Locations" delay={40} index={1} />
        <StatCard label="Exclusive Clientele" delay={80} index={2} />
      </div>

      {/* ── SECTION 5: CTA ── */}
      <div style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: frame >= 750 ? 1 : 0,
      }}>
        {/* Phone */}
        <div style={{
          fontFamily: "serif",
          fontSize: 56,
          fontWeight: 600,
          color: "#C9A96E",
          letterSpacing: 6,
          opacity: ctaFade,
          transform: `scale(${ctaScale})`,
          textShadow: `0 0 ${40 * phoneGlow}px rgba(201,169,110,0.5)`,
          marginBottom: 8,
        }}>+971 50 635 7179</div>

        {/* Tagline */}
        <div style={{
          fontFamily: "serif",
          fontSize: 28,
          color: "#F5F0E8",
          fontWeight: 300,
          letterSpacing: 4,
          opacity: interpolate(ctaFade, [0.3, 1], [0, 1]),
          marginTop: 12,
          fontStyle: "italic",
        }}>Your Dream Home Awaits</div>

        {/* Gold line */}
        <div style={{ marginTop: 36, opacity: interpolate(ctaFade, [0.5, 1], [0, 1]) }}>
          <GoldLine width={180} delay={0} />
        </div>

        {/* OSAC final */}
        <div style={{
          fontFamily: "serif",
          fontSize: 32,
          fontWeight: 700,
          color: "#C9A96E",
          letterSpacing: 16,
          marginTop: 40,
          opacity: interpolate(ctaFade, [0.7, 1], [0, 1]),
        }}>OSAC</div>

        <div style={{
          fontFamily: "serif",
          fontSize: 12,
          color: "rgba(201,169,110,0.6)",
          letterSpacing: 8,
          marginTop: 6,
          opacity: interpolate(ctaFade, [0.8, 1], [0, 1]),
        }}>REAL ESTATE</div>
      </div>
    </AbsoluteFill>
  );
}
