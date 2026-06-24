import { useCurrentFrame, useVideoConfig, spring, interpolate, AbsoluteFill, Sequence } from "remotion";
import { ParticleField, NeonText, GlassCard, CinematicBars, FadeTransition } from "./Components";

// ─── Addis Ababa: The Diplomatic Pulse of Africa ───

export const AddisAbaba: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const barHeight = interpolate(frame, [0, 15], [0, 80], { extrapolateRight: "clamp" });
  const endBarClose = interpolate(frame, [durationInFrames - 40, durationInFrames], [80, 0], { extrapolateRight: "clamp" });
  const actualBarHeight = frame > durationInFrames - 40 ? endBarClose : barHeight;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000010", fontFamily: "sans-serif" }}>
      <ParticleField seed={42} color="#8B5CF6" />
      <ParticleField seed={77} color="#D946EF" />
      <AbsoluteFill>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: actualBarHeight, backgroundColor: "#000", zIndex: 100 }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: actualBarHeight, backgroundColor: "#000", zIndex: 100 }} />
      </AbsoluteFill>

      <Sequence from={0} durationInFrames={300}>
        <FadeTransition>
          <AbsoluteFill style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 20 }}>
            <NeonText text="🌍 ELEVATION: 2,355m" size={56} color="#8B5CF6" delay={5} />
            <NeonText text="THE ROOF OF AFRICA" size={36} color="#A78BFA" delay={20} />
            <NeonText text="5th Highest Capital on Earth" size={28} color="#C4B5FD" delay={35} />
          </AbsoluteFill>
        </FadeTransition>
      </Sequence>

      <Sequence from={300} durationInFrames={300}>
        <FadeTransition>
          <AbsoluteFill style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 20 }}>
            <NeonText text="🏛️ THE DIPLOMATIC CAPITAL" size={52} color="#D946EF" delay={10} />
            <GlassCard>
              <NeonText text="100+ Embassies & Missions" size={32} color="#F0ABFC" delay={20} />
              <NeonText text="African Union Headquarters" size={26} color="#F5D0FE" delay={35} />
              <NeonText text="3rd Largest Diplomatic Hub on Earth" size={24} color="#FAE8FF" delay={50} />
            </GlassCard>
          </AbsoluteFill>
        </FadeTransition>
      </Sequence>

      <Sequence from={600} durationInFrames={360}>
        <FadeTransition>
          <AbsoluteFill style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 24 }}>
            <NeonText text="🚇 THE PULSE" size={52} color="#F59E0B" delay={5} />
            <GlassCard>
              <NeonText text="Africa's First Light Rail" size={30} color="#FCD34D" delay={15} />
              <NeonText text="Meskel Square · Bole Skyline" size={26} color="#FDE68A" delay={30} />
              <NeonText text="Fastest Growing African Metropolis" size={24} color="#FEF3C7" delay={45} />
            </GlassCard>
          </AbsoluteFill>
        </FadeTransition>
      </Sequence>

      <Sequence from={960} durationInFrames={390}>
        <FadeTransition>
          <AbsoluteFill style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 24 }}>
            <NeonText text="☕ BIRTHPLACE OF COFFEE" size={52} color="#10B981" delay={5} />
            <GlassCard>
              <NeonText text="Coffee Ceremony Tradition" size={30} color="#6EE7B7" delay={20} />
              <NeonText text="Merkato · Largest Open-Air Market" size={26} color="#A7F3D0" delay={35} />
              <NeonText text="Sheger Riverside Green Legacy" size={24} color="#D1FAE5" delay={50} />
            </GlassCard>
          </AbsoluteFill>
        </FadeTransition>
      </Sequence>

      <Sequence from={1350} durationInFrames={210}>
        <FadeTransition>
          <AbsoluteFill style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 30 }}>
            <NeonText text="አዲስ አበባ" size={60} color="#EC4899" delay={5} />
            <NeonText text="THE NEW FLOWER" size={40} color="#FDA4AF" delay={20} />
          </AbsoluteFill>
        </FadeTransition>
      </Sequence>

      <Sequence from={1560} durationInFrames={240}>
        <FadeTransition>
          <AbsoluteFill style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 30 }}>
            <NeonText text="DISCOVER ADDIS" size={60} color="#F97316" delay={5} />
            <NeonText text="The Diplomatic Heart of Africa Awaits" size={30} color="#FDBA74" delay={20} />
            <GlassCard>
              <NeonText text="✈️ Bole International Airport" size={28} color="#FED7AA" delay={35} />
              <NeonText text="Connected to 125+ Destinations" size={22} color="#FFEDD5" delay={45} />
            </GlassCard>
          </AbsoluteFill>
        </FadeTransition>
      </Sequence>
    </AbsoluteFill>
  );
};
