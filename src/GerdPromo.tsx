import { AbsoluteFill, useVideoConfig, useCurrentFrame, spring, interpolate, Sequence } from "remotion";
import {
 ParticleField, NeonText, GlassCard, ScrambleText,
 CTAButton, CinematicBars, FadeTransition,
} from "./Components";

// ─── Colors ──────────────────────────────────────────
const WATER_BLUE = "#00A8FF";
const DEEP_BLUE = "#0B4F6C";
const ETH_GREEN = "#009A44";
const ETH_YELLOW = "#FEDD00";
const ETH_RED = "#EF3340";
const GOLD = "#D4A843";

// ─── SCENE 1: The Awakening ──────────────────────────
const SceneIntro: React.FC = () => {
 const frame = useCurrentFrame();
 const { fps } = useVideoConfig();

 const subtitleY = spring({ frame, fps, config: { damping: 15 }, delay: 25, from: 30, to: 0 });
 const subtitleOpacity = spring({ frame, fps, config: { damping: 20 }, delay: 30 });

 return (
 <AbsoluteFill style={{ background: "linear-gradient(180deg, #000B14 0%, #0B1E33 40%, #0B4F6C 100%)" }}>
 <ParticleField count={80} color={WATER_BLUE} speed={0.3} spread={600} />
 <CinematicBars />
 <div style={{
 position: "absolute", inset: 0,
 display: "flex", flexDirection: "column",
 alignItems: "center", justifyContent: "center",
 }}>
 <NeonText
 text="THE GRAND ETHIOPIAN"
 size={72}
 color={ETH_YELLOW}
 glowColor={GOLD}
 startFrame={10}
 />
 <NeonText
 text="RENAISSANCE DAM"
 size={96}
 color={WATER_BLUE}
 glowColor="#00D4FF"
 startFrame={20}
 />
 <div style={{
 transform: `translateY(${subtitleY}px)`,
 opacity: subtitleOpacity,
 marginTop: 30,
 }}>
 <ScrambleText
 text="GERD · ታላቁ የኢትዮጵያ ህዳሴ ግድብ"
 size={28}
 color={GOLD}
 delay={35}
 />
 </div>
 </div>
 </AbsoluteFill>
 );
};

// ─── SCENE 2: The Scale ──────────────────────────────
const SceneScale: React.FC = () => {
 const frame = useCurrentFrame();
 const { fps } = useVideoConfig();

 const stats = [
 { value: "145m", label: "TALL", delay: 5 },
 { value: "1.8km", label: "LONG", delay: 15 },
 { value: "74B m³", label: "RESERVOIR", delay: 25 },
 { value: "6,000 MW", label: "CAPACITY", delay: 35 },
 ];

 return (
 <AbsoluteFill style={{ background: "linear-gradient(180deg, #0B1E33 0%, #0B4F6C 50%, #001A33 100%)" }}>
 <ParticleField count={40} color={WATER_BLUE} speed={0.5} spread={400} />
 <CinematicBars />
 <div style={{
 position: "absolute", inset: 0,
 display: "flex", flexDirection: "column",
 alignItems: "center", justifyContent: "center",
 gap: 10,
 }}>
 <NeonText text="AFRICA'S LARGEST" size={64} color={ETH_GREEN} glowColor="#00FF66" startFrame={0} />
 <div style={{ display: "flex", gap: 40, marginTop: 40, flexWrap: "wrap", justifyContent: "center" }}>
 {stats.map((stat, i) => {
 const scale = spring({ frame, fps, config: { damping: 12 }, delay: stat.delay, from: 0, to: 1 });
 const opacity = spring({ frame, fps, config: { damping: 15 }, delay: stat.delay + 5 });
 return (
 <GlassCard key={i} scale={scale} opacity={opacity}>
 <div style={{ fontSize: 48, fontWeight: 900, color: WATER_BLUE, textShadow: "0 0 20px rgba(0,168,255,0.6)" }}>
 {stat.value}
 </div>
 <div style={{ fontSize: 16, color: GOLD, letterSpacing: 6, marginTop: 8 }}>{stat.label}</div>
 </GlassCard>
 );
 })}
 </div>
 </div>
 </AbsoluteFill>
 );
};

// ─── SCENE 3: The Power ──────────────────────────────
const ScenePower: React.FC = () => {
 const frame = useCurrentFrame();
 const { fps } = useVideoConfig();

 const glowIntensity = Math.sin(frame / 30) * 0.3 + 0.7;
 const titleSlide = spring({ frame, fps, config: { damping: 14 }, delay: 10, from: -80, to: 0 });

 return (
 <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, #0B4F6C 0%, #001A33 60%, #000B14 100%)" }}>
 <ParticleField count={60} color={ETH_RED} speed={0.4} spread={500} />
 <CinematicBars />
 <div style={{
 position: "absolute", inset: 0,
 display: "flex", flexDirection: "column",
 alignItems: "center", justifyContent: "center",
 }}>
 <div style={{ transform: `translateX(${titleSlide}px)` }}>
 <NeonText text="POWERING" size={60} color={ETH_GREEN} glowColor="#00FF66" startFrame={15} />
 <NeonText text="A NATION" size={88} color={ETH_YELLOW} glowColor={GOLD} startFrame={25} />
 </div>
 <div style={{
 marginTop: 50, display: "flex", gap: 60, textAlign: "center",
 opacity: interpolate(frame, [60, 80], [0, 1], { extrapolateRight: "clamp" }),
 }}>
 <div style={{ color: WATER_BLUE, fontSize: 42, fontWeight: 900, textShadow: `0 0 ${20 * glowIntensity}px rgba(0,168,255,0.8)` }}>
 60%
 <div style={{ fontSize: 14, color: GOLD, letterSpacing: 4 }}>POPULATION</div>
 </div>
 <div style={{ color: ETH_RED, fontSize: 42, fontWeight: 900, textShadow: `0 0 ${20 * glowIntensity}px rgba(239,51,64,0.8)` }}>
 100%
 <div style={{ fontSize: 14, color: GOLD, letterSpacing: 4 }}>RENEWABLE</div>
 </div>
 </div>
 </div>
 </AbsoluteFill>
 );
};

// ─── SCENE 4: Unity & Pride ──────────────────────────
const SceneUnity: React.FC = () => {
 const frame = useCurrentFrame();
 const { fps } = useVideoConfig();

 const flagOpacity = spring({ frame, fps, config: { damping: 18 }, delay: 15 });
 const ctaScale = spring({ frame, fps, config: { damping: 12 }, delay: 60, from: 0.7, to: 1 });

 return (
 <AbsoluteFill style={{ background: "linear-gradient(180deg, #001A33 0%, #0B1E33 50%, #000B14 100%)" }}>
 <ParticleField count={100} color={GOLD} speed={0.2} spread={700} />
 <CinematicBars />
 <FadeTransition flip />
 <div style={{
 position: "absolute", inset: 0,
 display: "flex", flexDirection: "column",
 alignItems: "center", justifyContent: "center",
 }}>
 <div style={{
 display: "flex", gap: 0, opacity: flagOpacity,
 marginBottom: 40, borderRadius: 8, overflow: "hidden",
 }}>
 <div style={{ width: 120, height: 60, backgroundColor: ETH_GREEN }} />
 <div style={{ width: 120, height: 60, backgroundColor: ETH_YELLOW }} />
 <div style={{ width: 120, height: 60, backgroundColor: ETH_RED }} />
 </div>
 <NeonText text="ONE PEOPLE" size={56} color={ETH_GREEN} glowColor="#00FF66" startFrame={30} />
 <NeonText text="ONE DAM" size={72} color={WATER_BLUE} glowColor="#00D4FF" startFrame={40} />
 <NeonText text="ONE ETHIOPIA" size={68} color={ETH_YELLOW} glowColor={GOLD} startFrame={50} />
 <div style={{ marginTop: 40, transform: `scale(${ctaScale})` }}>
 <CTAButton text="🇪🇹 ለኢትዮጵያ ብልጽግና" color={ETH_GREEN} glowColor="#00FF66" />
 </div>
 </div>
 </AbsoluteFill>
 );
};

// ─── MAIN COMPOSITION ────────────────────────────────
export const GerdPromo: React.FC = () => {
 return (
 <AbsoluteFill>
 <Sequence from={0} durationInFrames={210}>
 <SceneIntro />
 </Sequence>
 <Sequence from={200} durationInFrames={210}>
 <SceneScale />
 </Sequence>
 <Sequence from={400} durationInFrames={220}>
 <ScenePower />
 </Sequence>
 <Sequence from={600} durationInFrames={300}>
 <SceneUnity />
 </Sequence>
 </AbsoluteFill>
 );
};