import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Sequence } from 'remotion';
import { GlassCard, NeonText, ParticleField, CinematicBars, FadeTransition, TypewriterText } from './Components';

// Pan-African palette
const GREEN = '#009A44';
const GOLD = '#FFD700';
const RED = '#CE1126';
const BLACK = '#000000';

const Scene1_Continent: React.FC<{ frame: number }> = ({ frame }) => {
  const fadeIn = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const scale = spring({ frame, fps: 30, config: { damping: 12, stiffness: 80 } });
  
  return (
    <AbsoluteFill style={{ background: BLACK, justifyContent: 'center', alignItems: 'center' }}>
      <ParticleField color={GOLD} count={80} />
      <div style={{ opacity: fadeIn, transform: `scale(${scale})`, textAlign: 'center' }}>
        <NeonText color={GOLD} fontSize={72} glowIntensity={1.5}>
          AFRICA
        </NeonText>
        <div style={{ height: 20 }} />
        <NeonText color={GREEN} fontSize={28} glowIntensity={0.8}>
          The Motherland
        </NeonText>
      </div>
    </AbsoluteFill>
  );
};

const Scene2_Nations: React.FC<{ frame: number }> = ({ frame }) => {
  const names = ['Ethiopia', 'Nigeria', 'Kenya', 'Ghana', 'South Africa', 'Egypt', 'Tanzania', 'Morocco'];
  const nameIdx = Math.floor(frame / 12) % names.length;
  const fadeIn = interpolate(frame % 12, [0, 4, 8, 11], [0, 1, 1, 0], { extrapolateRight: 'clamp' });
  
  return (
    <AbsoluteFill style={{ background: BLACK, justifyContent: 'center', alignItems: 'center' }}>
      <ParticleField color={GREEN} count={60} />
      <GlassCard>
        <div style={{ opacity: fadeIn, textAlign: 'center' }}>
          <NeonText color={GOLD} fontSize={64} glowIntensity={1.2}>
            {names[nameIdx]}
          </NeonText>
        </div>
      </GlassCard>
      <div style={{ position: 'absolute', bottom: 100 }}>
        <NeonText color={GREEN} fontSize={20} glowIntensity={0.5}>
          54 Nations. One Spirit.
        </NeonText>
      </div>
    </AbsoluteFill>
  );
};

const Scene3_Future: React.FC<{ frame: number }> = ({ frame }) => {
  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const lines = [
    'Fastest growing economies',
    'Youngest continent on Earth',
    'Home of innovation',
  ];
  const lineIdx = Math.floor(frame / 25) % lines.length;
  
  return (
    <AbsoluteFill style={{ background: BLACK, justifyContent: 'center', alignItems: 'center' }}>
      <ParticleField color={GOLD} count={100} />
      <div style={{ opacity: fadeIn, textAlign: 'center' }}>
        <NeonText color={RED} fontSize={48} glowIntensity={1.0}>
          The Future Is Here
        </NeonText>
        <div style={{ height: 40 }} />
        <TypewriterText text={lines[lineIdx]} color={GOLD} fontSize={28} />
      </div>
    </AbsoluteFill>
  );
};

const Scene4_Unity: React.FC<{ frame: number }> = ({ frame }) => {
  const progress = interpolate(frame, [0, 60], [0, 1], { extrapolateRight: 'clamp' });
  const barWidth = progress * 300;
  
  return (
    <AbsoluteFill style={{ background: BLACK, justifyContent: 'center', alignItems: 'center' }}>
      <ParticleField color={RED} count={60} />
      <GlassCard>
        <NeonText color={GOLD} fontSize={52} glowIntensity={1.3}>
          United We Rise
        </NeonText>
        <div style={{ height: 30 }} />
        <div style={{ width: 300, height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{
            width: barWidth,
            height: '100%',
            background: `linear-gradient(90deg, ${GREEN}, ${GOLD}, ${RED})`,
            borderRadius: 2,
            transition: 'width 0.1s',
          }} />
        </div>
        <div style={{ height: 10 }} />
        <NeonText color={GREEN} fontSize={16} glowIntensity={0.4}>
          African Continental Free Trade Area
        </NeonText>
      </GlassCard>
    </AbsoluteFill>
  );
};

const Scene5_Tech: React.FC<{ frame: number }> = ({ frame }) => {
  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const techWords = ['Fintech', 'Agritech', 'Healthtech', 'Edtech', 'Cleantech'];
  const wordIdx = Math.floor(frame / 15) % techWords.length;
  
  return (
    <AbsoluteFill style={{ background: BLACK, justifyContent: 'center', alignItems: 'center' }}>
      <ParticleField color={GREEN} count={120} />
      <div style={{ opacity: fadeIn, textAlign: 'center' }}>
        <NeonText color={GOLD} fontSize={44} glowIntensity={1.0}>
          Africa Builds
        </NeonText>
        <div style={{ height: 30 }} />
        <GlassCard>
          <NeonText color={GREEN} fontSize={56} glowIntensity={1.4}>
            {techWords[wordIdx]}
          </NeonText>
        </GlassCard>
      </div>
    </AbsoluteFill>
  );
};

const Scene6_Finale: React.FC<{ frame: number }> = ({ frame }) => {
  const fadeIn = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const scale = spring({ frame, fps: 30, config: { damping: 10, stiffness: 60 } });
  
  return (
    <AbsoluteFill style={{ background: BLACK, justifyContent: 'center', alignItems: 'center' }}>
      <ParticleField color={GOLD} count={150} />
      <div style={{ opacity: fadeIn, transform: `scale(${scale})`, textAlign: 'center' }}>
        <NeonText color={GOLD} fontSize={80} glowIntensity={2.0}>
          AFRICA
        </NeonText>
        <div style={{ height: 15 }} />
        <NeonText color={RED} fontSize={32} glowIntensity={1.0}>
          Rising. Building. Leading.
        </NeonText>
        <div style={{ height: 40 }} />
        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{ width: 40, height: 6, background: GREEN, borderRadius: 3 }} />
          <div style={{ width: 40, height: 6, background: GOLD, borderRadius: 3 }} />
          <div style={{ width: 40, height: 6, background: RED, borderRadius: 3 }} />
        </div>
      </div>
      <CinematicBars />
    </AbsoluteFill>
  );
};

export const AfricaPromo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: BLACK }}>
      <Sequence from={0} durationInFrames={120}>
        <Scene1_Continent frame={frame} />
      </Sequence>
      <Sequence from={100} durationInFrames={150}>
        <FadeTransition><Scene2_Nations frame={frame - 100} /></FadeTransition>
      </Sequence>
      <Sequence from={230} durationInFrames={120}>
        <FadeTransition><Scene3_Future frame={frame - 230} /></FadeTransition>
      </Sequence>
      <Sequence from={330} durationInFrames={130}>
        <FadeTransition><Scene4_Unity frame={frame - 330} /></FadeTransition>
      </Sequence>
      <Sequence from={440} durationInFrames={120}>
        <FadeTransition><Scene5_Tech frame={frame - 440} /></FadeTransition>
      </Sequence>
      <Sequence from={540} durationInFrames={360}>
        <FadeTransition><Scene6_Finale frame={frame - 540} /></FadeTransition>
      </Sequence>
      <CinematicBars />
    </AbsoluteFill>
  );
};
