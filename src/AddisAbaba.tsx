import { AbsoluteFill, useVideoConfig, useCurrentFrame, spring, interpolate, Sequence } from "remotion";
import {
  ParticleField,
  NeonText,
  GlassCard,
  ScrambleText,
  CTAButton,
  CinematicBars,
  FadeTransition,
} from "./Components";

// Pan-African + Addis color palette
const GOLD = "#fedd00";
const GREEN = "#00ff88";
const AMBER = "#ffaa00";
const WARM_WHITE = "#fff5e6";
const DEEP_RED = "#cc2211";

// ─── SCENE 1: Title — አዲስ አበበ ─────────────────────
const SceneTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const amharicOpacity = spring({ frame, fps, config: { damping: 12, mass: 0.5 }, delay: 15 });
  const amharicY = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 10 }, from: -30, to: 0 });
  const subtitleOpacity = spring({ frame, fps, config: { damping: 15 }, delay: 35 });
  const meaningOpacity = spring({ frame, fps, config: { damping: 20 }, delay: 50, from: 0, to: 1 });
  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
      <ParticleField seed={42} color={AMBER} />
      <div style={{ opacity: amharicOpacity, transform: `translateY(${amharicY}px)` }}>
        <NeonText text="አዲስ አበበ" size={72} color={GOLD} delay={10} />
      </div>
      <div style={{ opacity: subtitleOpacity }}>
        <NeonText text="ADDIS ABABA" size={36} color={WARM_WHITE} delay={30} />
      </div>
      <div style={{ opacity: meaningOpacity, marginTop: 10 }}>
        <ScrambleText text="The New Flower" delay={45} color={GREEN} size={22} />
      </div>
    </AbsoluteFill>
  );
};

// ─── SCENE 2: Altitude ───────────────────────────────
const SceneAltitude: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const numberScale = spring({ frame, fps, config: { damping: 8, mass: 0.4 }, delay: 10, from: 0.5, to: 1 });
  const statelineOpacity = spring({ frame, fps, config: { damping: 15 }, delay: 30 });
  const factOpacity = spring({ frame, fps, config: { damping: 20 }, delay: 55 });
  const mountainGlow = Math.sin(frame * 0.03) * 0.3 + 0.7;
  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 15 }}>
      <ParticleField seed={84} color={GREEN} />
      <div style={{ transform: `scale(${numberScale})`, textShadow: `0 0 ${40 * mountainGlow}px ${GREEN}` }}>
        <NeonText text="2,355 m" size={80} color={GREEN} delay={5} />
      </div>
      <div style={{ opacity: statelineOpacity }}>
        <NeonText text="Above the Sea" size={28} color={WARM_WHITE} delay={25} />
      </div>
      <div style={{ opacity: factOpacity }}>
        <GlassCard delay={50} width="65%">
          <div style={{ padding: 24, textAlign: "center" }}>
            <p style={{ color: GREEN, fontFamily: "monospace", fontSize: 14, margin: 0 }}>
              Third highest capital city on Earth
            </p>
            <p style={{ color: "#888", fontFamily: "monospace", fontSize: 11, marginTop: 8 }}>
              Higher than Denver · Higher than Sana'a · Higher than Mexico City
            </p>
          </div>
        </GlassCard>
      </div>
    </AbsoluteFill>
  );
};

// ─── SCENE 3: Pan-African Heart ──────────────────────
const ScenePanAfrican: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleOpacity = spring({ frame, fps, config: { damping: 15 }, delay: 10 });
  const cardOpacity = spring({ frame, fps, config: { damping: 12 }, delay: 35 });
  const badgeOpacity = spring({ frame, fps, config: { damping: 10 }, delay: 55 });
  const flagPulse = Math.sin(frame * 0.04) * 0.15 + 0.85;
  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
      <ParticleField seed={196} color={GOLD} />
      {/* Pan-African color strips */}
      <div style={{ display: "flex", gap: 8, opacity: flagPulse, marginBottom: 10 }}>
        {["#009a44", "#fedd00", "#ef3340"].map((c, i) => (
          <div
            key={i}
            style={{
              width: 80,
              height: 6,
              background: c,
              borderRadius: 3,
              boxShadow: `0 0 20px ${c}`,
            }}
          />
        ))}
      </div>
      <div style={{ opacity: titleOpacity }}>
        <NeonText text="The Political Capital" size={40} color={GOLD} delay={5} />
      </div>
      <div style={{ opacity: titleOpacity }}>
        <NeonText text="of Africa" size={40} color={GOLD} delay={12} />
      </div>
      <div style={{ opacity: cardOpacity }}>
        <GlassCard delay={30} width="70%">
          <div style={{ padding: 20, textAlign: "center" }}>
            <p style={{ color: GOLD, fontFamily: "monospace", fontSize: 13, margin: 0 }}>🇪🇹 African Union Headquarters</p>
            <p style={{ color: "#888", fontFamily: "monospace", fontSize: 11, marginTop: 8 }}>
              UNECA · Diplomatic Hub · 100+ Embassies
            </p>
          </div>
        </GlassCard>
      </div>
      <div style={{ opacity: badgeOpacity }}>
        <ScrambleText text="One City · One Continent · One Voice" delay={50} color={AMBER} size={16} />
      </div>
    </AbsoluteFill>
  );
};

// ─── SCENE 4: Culture & Spirit ────────────────────────
const COFFEE_FACTS = [
  { icon: "☕", text: "Birthplace of Arabica Coffee" },
  { icon: "🏟️", text: "Meskel Square — The Gathering Place" },
  { icon: "🛫", text: "Bole International — Gateway to Africa" },
  { icon: "🎶", text: "Ethio-Jazz — The Sound of Addis" },
];

const SceneCulture: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
      <ParticleField seed={777} color={AMBER} />
      <NeonText text="የኢትዮጵያ ልብ" size={48} color={GOLD} delay={5} />
      <div style={{ marginBottom: 8 }}>
        <ScrambleText text="Heart of Ethiopia" delay={20} color={WARM_WHITE} size={18} />
      </div>
      {COFFEE_FACTS.map((f, i) => {
        const delay = 30 + i * 12;
        const opacity = spring({ frame, fps, config: { damping: 15 }, delay });
        const slideX = spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 10 }, from: -30 - i * 10, to: 0 });
        return (
          <div key={i} style={{ opacity, transform: `translateX(${slideX}px)`, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 24 }}>{f.icon}</span>
            <span style={{ color: "#ccc", fontFamily: "monospace", fontSize: 14 }}>{f.text}</span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ─── SCENE 5: Outro — The New Flower Blooms ───────────
const SceneOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleOpacity = spring({ frame, fps, config: { damping: 10, mass: 0.3 }, delay: 10 });
  const ctaScale = spring({ frame, fps, config: { damping: 8, mass: 0.3 }, delay: 40 });
  const amharicOpacity = spring({ frame, fps, config: { damping: 15 }, delay: 55 });
  const dawnGlow = Math.sin(frame * 0.02) * 0.2 + 0.8;
  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
      <ParticleField seed={999} color={GOLD} />
      <div style={{ opacity: titleOpacity }}>
        <NeonText text="አዲስ አበበ" size={64} color={GOLD} delay={5} y={0} />
      </div>
      <div style={{ opacity: titleOpacity }}>
        <NeonText text="The New Flower Blooms" size={32} color={GREEN} delay={20} />
      </div>
      <div style={{ opacity: amharicOpacity, marginTop: 10 }}>
        <GlassCard delay={50} width="50%">
          <div style={{ padding: 18, textAlign: "center" }}>
            <p style={{ color: WARM_WHITE, fontFamily: "monospace", fontSize: 13, margin: 0 }}>
              2,355m above · 5 million strong · 1 heartbeat
            </p>
          </div>
        </GlassCard>
      </div>
      <div style={{ transform: `scale(${ctaScale})`, marginTop: 20 }}>
        <CTAButton text="🇪🇹   ኢትዮጵያ ትበልጠን   🇪🇹" delay={70} />
      </div>
    </AbsoluteFill>
  );
};

// ─── Main Composition ─────────────────────────────────
export const AddisAbaba: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000000" }}>
      <CinematicBars />
      <Sequence name="Title" from={0} durationInFrames={120}>
        <FadeTransition inFrame={0} outFrame={120}>
          <SceneTitle />
        </FadeTransition>
      </Sequence>
      <Sequence name="Altitude" from={110} durationInFrames={130}>
        <FadeTransition inFrame={110} outFrame={240}>
          <SceneAltitude />
        </FadeTransition>
      </Sequence>
      <Sequence name="PanAfrican" from={230} durationInFrames={180}>
        <FadeTransition inFrame={230} outFrame={410}>
          <ScenePanAfrican />
        </FadeTransition>
      </Sequence>
      <Sequence name="Culture" from={400} durationInFrames={180}>
        <FadeTransition inFrame={400} outFrame={580}>
          <SceneCulture />
        </FadeTransition>
      </Sequence>
      <Sequence name="Outro" from={570} durationInFrames={300}>
        <FadeTransition inFrame={570} outFrame={870}>
          <SceneOutro />
        </FadeTransition>
      </Sequence>
    </AbsoluteFill>
  );
};
