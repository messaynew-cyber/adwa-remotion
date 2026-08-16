import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";

// ─── SHEGER SPORTS ─────────────────────────────────────────
// Ethiopian Football + Athletics — stadium energy promo.
// VERSION 2.0 — COMPLETELY DIFFERENT from prior work.
// Applied: video-shotcraft canon — brand-frame-snap packaging,
// digit-roll scores, counter-confetti, scan brackets, camera moves,
// SFX pinned-frame table. Ethiopian flag palette (green/gold/red)
// as a color code throughout. No OLED-black particle generic.
// R1: SHEGER wordmark holds full 1s at open and end.

const FPS = 30;
const TOTAL = 1080; // 36 seconds @ 30fps

// ── Palette: Ethiopian flag + stadium energy ──
const GREEN = "#078930";
const GOLD = "#FCBB05";
const RED = "#DA121A";
const FIELD = "#0B4D1E"; // deep stadium grass
const PITCH = "#0E5e26"; // lit grass
const NIGHT = "#070B16"; // stadium night
const CROWD = "#0F1524"; // crowd dark
const TEXT = "#F2F5F0";
const MUTED = "#9FB2A0"; // muted green-grey

// ── SFX pinned-frame table (S1/S2/S3 canon) ──
const SFX: { from: number; src: string; volume: number; note: string }[] = [
  // brand open
  { from: 8, src: "transition-soft.mp3", volume: 0.4, note: "brand lockup lands" },
  { from: 50, src: "whoosh-big.mp3", volume: 0.5, note: "camera dives into field" },
  // feature 1: scores
  { from: 120, src: "impact-cine.mp3", volume: 0.5, note: "scoreboard slams in" },
  { from: 170, src: "sparkle.mp3", volume: 0.3, note: "digit roll finishes" },
  { from: 200, src: "whoosh-fast.mp3", volume: 0.35, note: "score row transition" },
  // feature 2: teams
  { from: 320, src: "whoosh-big.mp3", volume: 0.45, note: "team grid assembly" },
  { from: 350, src: "pop.mp3", volume: 0.25, note: "first team cell" },
  { from: 362, src: "pop.mp3", volume: 0.22, note: "second team cell" },
  { from: 374, src: "pop.mp3", volume: 0.20, note: "third" },
  { from: 386, src: "pop.mp3", volume: 0.18, note: "fourth" },
  { from: 398, src: "pop.mp3", volume: 0.16, note: "fifth" },
  { from: 410, src: "pop.mp3", volume: 0.14, note: "sixth" },
  // athlete section
  { from: 480, src: "whoosh-big.mp3", volume: 0.5, note: "athlete card slides" },
  { from: 510, src: "impact-cine.mp3", volume: 0.45, note: "athlete name stamps" },
  { from: 540, src: "sparkle.mp3", volume: 0.3, note: "stats pop" },
  // counter confetti section
  { from: 640, src: "riser-cine.mp3", volume: 0.45, note: "countdown build" },
  { from: 690, src: "impact-cine.mp3", volume: 0.55, note: "counter hits" },
  { from: 700, src: "sparkle.mp3", volume: 0.35, note: "confetti burst" },
  // outro
  { from: 800, src: "whoosh-big.mp3", volume: 0.5, note: "camera pulls back" },
  { from: 850, src: "riser-cine.mp3", volume: 0.5, note: "finale build" },
  { from: 900, src: "impact-cine.mp3", volume: 0.55, note: "wordmark stamps" },
  { from: 930, src: "sparkle.mp3", volume: 0.35, note: "rule + tagline glint" },
];

// ── Emphasize text with scan-bracket pull ──
const ScanBrackets: React.FC<{ color?: string; active?: boolean }> = ({
  color = GOLD,
  active = true,
}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame % 90, [0, 15, 70, 90], [0, 1, 0.8, 0], {
    extrapolateRight: "clamp",
  }) * (active ? 1 : 0);

  return (
    <>
      <div style={{
        position: "absolute", left: -40, top: -54, width: 34, height: 64,
        borderLeft: `4px solid ${color}`, borderTop: `4px solid ${color}`,
        opacity: o,
      }} />
      <div style={{
        position: "absolute", right: -40, top: -54, width: 34, height: 64,
        borderRight: `4px solid ${color}`, borderTop: `4px solid ${color}`,
        opacity: o,
      }} />
      <div style={{
        position: "absolute", left: -40, bottom: -54, width: 34, height: 64,
        borderLeft: `4px solid ${color}`, borderBottom: `4px solid ${color}`,
        opacity: o,
      }} />
      <div style={{
        position: "absolute", right: -40, bottom: -54, width: 34, height: 64,
        borderRight: `4px solid ${color}`, borderBottom: `4px solid ${color}`,
        opacity: o,
      }} />
    </>
  );
};

// ── Odometer digit roll (from shotcraft DigitRoll) ──
const DigitRoll: React.FC<{ value: string; delay?: number; fontSize?: number; color?: string }> = ({
  value,
  delay = 0,
  fontSize = 72,
  color = TEXT,
}) => {
  const frame = useCurrentFrame();
  const lineH = fontSize * 1.15;
  const DIGITS = "0123456789";
  return (
    <span style={{ display: "inline-flex", overflow: "hidden", height: lineH, verticalAlign: "bottom" }}>
      {value.split("").map((ch, i) => {
        const target = DIGITS.indexOf(ch);
        if (target < 0) {
          return <span key={i} style={{ fontSize, lineHeight: `${lineH}px`, color, fontFamily: "monospace", fontWeight: 800 }}>{ch}</span>;
        }
        const t = interpolate(frame, [delay + i * 4, delay + i * 4 + 22], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.25, 0.8, 0.25, 1),
        });
        const offset = (10 + target) * t * lineH;
        return (
          <span key={i} style={{ display: "inline-block", overflow: "hidden", height: lineH }}>
            <span style={{ display: "block", transform: `translateY(-${offset}px)` }}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d, j) => (
                <span key={j} style={{ display: "block", fontSize, lineHeight: `${lineH}px`, color, fontFamily: "monospace", fontWeight: 800 }}>
                  {d}
                </span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
};

// ── Counter-confetti burst on scores ──
const ConfettiBurst: React.FC<{ count?: number; frameStart?: number; color?: string }> = ({
  count = 16,
  frameStart = 0,
  color = GOLD,
}) => {
  const frame = useCurrentFrame();
  const local = frame - frameStart;
  if (local < 0 || local > 60) return null;

  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const seed = (i * 137.51) % 360;
        const dist = 60 + seed * 1.5;
        const angle = (i * 22.5 + seed) * (Math.PI / 180);
        const x = Math.cos(angle) * dist * Easing.out(Easing.cubic)(Math.min(local / 60, 1));
        const y = Math.sin(angle) * dist * 0.8 * Easing.out(Easing.cubic)(Math.min(local / 60, 1)) + local * 0.8;
        const rot = local * (4 + seed * 0.1);
        const cls = i % 3 === 0 ? GOLD : i % 3 === 1 ? GREEN : RED;
        return (
          <div key={i} style={{
            position: "absolute",
            width: 6 + seed * 0.05,
            height: 6 + seed * 0.05,
            background: cls,
            borderRadius: "1px",
            transform: `translate(${x}px, ${y}px) rotate(${rot}deg)`,
            opacity: Math.max(0, 1 - local / 50),
          }} />
        );
      })}
    </>
  );
};

// ── SCENE 1: BRAND OPEN — stadium floodlights + wordmark ──
const SceneBrandOpen: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  // R1: wordmark holds full second once on screen
  const wordmarkSpring = spring({
    frame: frame,
    fps,
    config: { damping: 16, mass: 0.6 },
    delay: 8,
  });
  const wordmarkScale = spring({
    frame: frame,
    fps,
    config: { damping: 20, mass: 0.8 },
    delay: 10,
    from: 0.85,
    to: 1,
  });
  const floodO = Math.min(1, frame / 30);
  const camDive = spring({ frame: frame - 50, fps, config: { damping: 22 }, from: 1.08, to: 1 });

  return (
    <AbsoluteFill style={{
      background: `radial-gradient(ellipse at 50% 0%, ${'#FFFFFF'}22 0%, transparent 45%), ${NIGHT}`,
      transform: `scale(${camDive})`,
      overflow: "hidden",
    }}>
      {/* stadium floodlight beams */}
      <div style={{
        position: "absolute", top: 0, left: "15%", width: 3, height: "100%",
        background: `linear-gradient(to bottom, ${GOLD}66, transparent)`,
        transform: "rotate(12deg) skewX(-8deg)", opacity: floodO * 0.4,
      }} />
      <div style={{
        position: "absolute", top: 0, left: "85%", width: 3, height: "100%",
        background: `linear-gradient(to bottom, ${GOLD}55, transparent)`,
        transform: "rotate(-12deg) skewX(8deg)", opacity: floodO * 0.35,
      }} />

      {/* stadium green bands */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "38%",
        background: `linear-gradient(to top, ${PITCH}, ${FIELD})`,
        clipPath: "polygon(0% 100%, 0% 60%, 15% 45%, 50% 35%, 85% 45%, 100% 60%, 100% 100%)",
      }}>
        {/* mowing stripes */}
        <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(90deg, ${PITCH} 0px, ${PITCH} 80px, ${FIELD} 80px, ${FIELD} 160px)`, opacity: 0.6 }} />
      </div>

      {/* center circle */}
      <div style={{
        position: "absolute", left: "50%", bottom: "18%",
        width: 220, height: 220, marginLeft: -110, marginBottom: -80,
        border: `3px solid ${GOLD}44`, borderRadius: "50%",
      }} />

      {/* brand wordmark */}
      <AbsoluteFill style={{
        justifyContent: "center", alignItems: "center",
        flexDirection: "column",
      }}>
        <div style={{
          opacity: wordmarkSpring,
          transform: `scale(${wordmarkScale})`,
          textAlign: "center",
        }}>
          <div style={{
            fontSize: 34, letterSpacing: "0.5em",
            color: GOLD, fontWeight: 700, fontFamily: "monospace",
            marginBottom: 18,
          }}>
            የስፖርት ልብ
          </div>
          <div style={{
            fontSize: 128, fontWeight: 900, color: TEXT,
            letterSpacing: "-0.03em", fontFamily: "Inter, sans-serif",
            textShadow: `0 0 60px ${GOLD}44, 0 4px 16px #0008`,
            lineHeight: 1,
          }}>
            SHEGER
          </div>
          <div style={{
            width: 240, height: 4, margin: "24px auto",
            background: `linear-gradient(90deg, ${GREEN}, ${GOLD}, ${RED})`,
            borderRadius: 2,
          }} />
          <div style={{
            fontSize: 22, letterSpacing: "0.35em",
            color: MUTED, fontWeight: 500,
          }}>
            SPORTS
          </div>
        </div>
      </AbsoluteFill>

      {/* bottom caption */}
      <div style={{
        position: "absolute", bottom: 48, left: 0, right: 0,
        textAlign: "center",
        opacity: Math.min(1, (frame - 65) / 30),
      }}>
        <div style={{ fontSize: 15, letterSpacing: "0.25em", color: MUTED }}>
          ETHIOPIAN FOOTBALL · ATHLETICS · ONE HEARTBEAT
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── SCENE 2: LIVE SCORES — digit-roll scoreboard ──
const SceneScores: React.FC<{ frame: number; fps: number; startFrame: number }> = ({ frame, fps, startFrame }) => {
  const local = frame - startFrame;
  const cardO = interpolate(local, [0, 25], [0, 1], { extrapolateRight: "clamp" });
  const cardY = interpolate(local, [0, 25], [40, 0], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });
  const flipDelay = 38;

  const scores = [
    { home: "Saint George", away: "Sidama Bunna", hs: "3", as: "1" },
    { home: "Fasil K.", away: "Hadiya", hs: "2", as: "0" },
    { home: "Ethio E.", away: "Mekelle 70", hs: "1", as: "2" },
  ];

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(180deg, ${CROWD} 0%, #0A0F1E 55%, #06080F 100%)`,
      padding: 80,
      flexDirection: "column" as const,
      justifyContent: "center",
    }}>
      {/* section label */}
      <div style={{
        fontSize: 16, letterSpacing: "0.4em", color: GOLD,
        marginBottom: 36, fontWeight: 700,
      }}>
        LIVE SCORES
      </div>

      {scores.map((s, i) => {
        const rowDelay = i * 18;
        const rowO = interpolate(local, [rowDelay, rowDelay + 20], [0, 1], { extrapolateRight: "clamp" });
        const rowX = interpolate(local, [rowDelay, rowDelay + 25], [i % 2 === 0 ? -30 : 30, 0], {
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.22, 1, 0.36, 1),
        });
        return (
          <div key={i} style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "22px 32px",
            marginBottom: 14,
            background: i === 0 ? "linear-gradient(135deg, #101A2EAA, #0A0F1DBB)" : "#0A0F1D88",
            border: `1px solid ${i === 0 ? `${GOLD}44` : "#ffffff14"}`,
            borderRadius: 16,
            opacity: rowO,
            transform: `translateX(${rowX}px)`,
          }}>
            <div style={{ fontSize: 30, fontWeight: 700, color: TEXT, fontFamily: "Inter, sans-serif" }}>
              {s.home}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <DigitRoll value={s.hs} delay={flipDelay} fontSize={52} color={i === 0 ? GOLD : TEXT} />
              <div style={{ fontSize: 28, fontWeight: 300, color: MUTED }}>:</div>
              <DigitRoll value={s.as} delay={flipDelay + 8} fontSize={52} color={TEXT} />
            </div>
            <div style={{ fontSize: 30, fontWeight: 700, color: TEXT, fontFamily: "Inter, sans-serif" }}>
              {s.away}
            </div>
            {i === 0 && <div style={{ position: "absolute", color: RED, fontWeight: 800, fontSize: 16, top: 12, right: 16, letterSpacing: "0.15em" }}>● LIVE</div>}
          </div>
        );
      })}

      {/* hero card bottom annotation */}
      <div style={{
        marginTop: 24, opacity: cardO, transform: `translateY(${cardY}px)`,
        textAlign: "center",
      }}>
        <div style={{ fontSize: 17, color: MUTED, letterSpacing: "0.1em" }}>
          ETHIOPIAN PREMIER LEAGUE — 2025/26 SEASON
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── SCENE 3: TEAM GRID — pop sequence assembly ──
const SceneTeams: React.FC<{ frame: number; fps: number; startFrame: number }> = ({ frame, startFrame }) => {
  const local = frame - startFrame;
  const teams = [
    { name: "SAINT GEORGE", short: "SG", color: "#1B4D8E" },
    { name: "FASIL KENEMA", short: "FK", color: "#7B2CBF" },
    { name: "SIDAMA BUNNA", short: "SB", color: "#06B15E" },
    { name: "ETHIO ELECTRIC", short: "EE", color: "#2196F3" },
    { name: "DIRE DAWA", short: "DD", color: "#CC5500" },
    { name: "MEKELLE 70", short: "M7", color: "#DA121A" },
    { name: "WELAYTA DICHA", short: "WD", color: "#9C27B0" },
    { name: "ADAMA KENEMA", short: "AK", color: "#D4A017" },
  ];

  return (
    <AbsoluteFill style={{
      background: `radial-gradient(ellipse at 50% 30%, #0F1F2F 0%, ${NIGHT} 60%)`,
      padding: 80,
    }}>
      <div style={{ fontSize: 16, letterSpacing: "0.4em", color: GREEN, marginBottom: 32, fontWeight: 700 }}>
        THE CLUBS
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 16,
      }}>
        {teams.map((t, i) => {
          const cellDelay = local * 0 + i * 12;
          const cellScale = spring({
            frame: Math.max(0, local - i * 12),
            fps: 30,
            config: { damping: 14, mass: 0.7 },
          });
          const cellO = interpolate(local, [cellDelay, cellDelay + 15], [0, 1], { extrapolateRight: "clamp" });
          return (
            <div key={i} style={{
              background: "linear-gradient(145deg, #131A2C88, #0A0F1D88)",
              border: `1px solid ${t.color}33`,
              borderRadius: 20,
              padding: "28px 20px",
              textAlign: "center",
              opacity: cellO,
              transform: `scale(${cellScale})`,
            }}>
              <div style={{
                width: 64, height: 64,
                background: `${t.color}22`,
                border: `2px solid ${t.color}66`,
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 16px",
                fontSize: 24, fontWeight: 800, color: t.color,
              }}>
                {t.short}
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: TEXT, letterSpacing: "0.05em" }}>
                {t.name}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ── SCENE 4: ATHLETICS — the running nation ──
const SceneAthletics: React.FC<{ frame: number; fps: number; startFrame: number }> = ({ frame, startFrame }) => {
  const local = frame - startFrame;
  const slideIn = spring({ frame: local, fps: 30, config: { damping: 20 }, from: 120, to: 0 });
  const stampO = interpolate(local, [30, 55], [0, 1], { extrapolateRight: "clamp" });
  
  const nameSpring = spring({ frame: local - 25, fps: 30, config: { damping: 12 } });
  const stats = [
    { label: "OLYMPIC GOLD", value: 17 },
    { label: "WORLD RECORDS", value: 29 },
    { label: "YEARS OF GLORY", value: 55 },
  ];

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(135deg, ${NIGHT} 0%, #0B1A12 50%, ${NIGHT} 100%)`,
      overflow: "hidden",
      padding: 80,
    }}>
      {/* running track lines */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} style={{
          position: "absolute",
          left: 0, right: 0,
          bottom: 40 + i * 28,
          height: 2,
          background: `${GOLD}${i === 0 ? "44" : "18"}`,
          transform: `skewX(-8deg)`,
        }} />
      ))}

      {/* giant athlas name */}
      <div style={{ transform: `translateX(${slideIn}px)` }}>
        <div style={{ fontSize: 15, letterSpacing: "0.4em", color: GREEN, marginBottom: 16, fontWeight: 700 }}>
          THE RUNNING NATION
        </div>
        <div style={{
          fontSize: 92, fontWeight: 900, color: TEXT,
          lineHeight: 0.95, marginBottom: 12,
          fontFamily: "Inter, sans-serif",
        }}>
          {"Abebe Bikila"}
        </div>
        <div style={{ fontSize: 20, color: MUTED, marginBottom: 32, letterSpacing: "0.2em" }}>
          BARE-FOOT INTO HISTORY
        </div>
      </div>

      {/* stats grid */}
      <div style={{ display: "flex", gap: 24, marginTop: "auto" }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            flex: 1,
            background: "linear-gradient(145deg, #131A2C66, #0A0F1D66)",
            border: `1px solid ${GOLD}22`,
            borderRadius: 16,
            padding: "20px 24px",
            opacity: stampO,
            transform: `scale(${nameSpring})`,
          }}>
            <div style={{ fontSize: 40, fontWeight: 900, color: GOLD, fontFamily: "monospace" }}>
              {s.value}
            </div>
            <div style={{ fontSize: 13, color: MUTED, letterSpacing: "0.15em", marginTop: 8 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ── SCENE 5: COUNTER — confetti countdown ──
const SceneCounter: React.FC<{ frame: number; fps: number; startFrame: number }> = ({ frame, startFrame }) => {
  const local = frame - startFrame;
  const counterProgress = Math.min(1, local / 50);
  const count = Math.round(counterProgress * 2000000);
  const displayCount = count.toLocaleString();

  const finalScale = spring({ frame: local - 50, fps: 30, config: { damping: 10 } });
  const burstStart = 55;

  return (
    <AbsoluteFill style={{
      background: `radial-gradient(ellipse at center, #0F1F3511, ${NIGHT} 65%)`,
      justifyContent: "center", alignItems: "center",
      flexDirection: "column" as const,
    }}>
      <div style={{ fontSize: 16, letterSpacing: "0.4em", color: GREEN, marginBottom: 24, fontWeight: 700 }}>
        FANS NATIONWIDE
      </div>
      <div style={{ display: "relative" }}>
        <div style={{
          fontSize: 140, fontWeight: 900, color: GOLD,
          fontFamily: "monospace", lineHeight: 1,
          textShadow: `0 0 40px ${GOLD}66`,
          transform: `scale(${finalScale})`,
        }}>
          {displayCount}
        </div>
        {local > burstStart && <ConfettiBurst frameStart={burstStart} count={24} />}
      </div>
      <div style={{ fontSize: 22, color: MUTED, marginTop: 32, letterSpacing: "0.15em" }}>
        ONE NATION. ONE HEARTBEAT.
      </div>
    </AbsoluteFill>
  );
};

// ── SCENE 6: OUTRO — wordmark reprises with R1 hold ──
const SceneOutro: React.FC<{ frame: number; fps: number; startFrame: number }> = ({ frame, fps, startFrame }) => {
  const local = frame - startFrame;
  const scale = spring({ frame: local, fps, config: { damping: 14 }, from: 1.15, to: 1 });
  const wordmarkSpring = spring({ frame: local - 15, fps, config: { damping: 18, mass: 0.6 } });
  const flagO = interpolate(local, [0, 30], [0, 1], { extrapolateRight: "clamp", easing: Easing.linear });

  return (
    <AbsoluteFill style={{
      background: `radial-gradient(ellipse at 50% 45%, #10241544, ${NIGHT})`,
      justifyContent: "center", alignItems: "center",
      flexDirection: "column" as const,
      transform: `scale(${scale})`,
    }}>
      {/* Ethiopian flag colors as backdrop bands */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", opacity: flagO * 0.12 }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "33.3%", background: GREEN }} />
        <div style={{ position: "absolute", top: "33.3%", left: 0, right: 0, height: "33.3%", background: GOLD }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "33.3%", background: RED }} />
      </div>

      <div style={{
        opacity: wordmarkSpring,
        textAlign: "center",
        transform: `scale(${1 + (wordmarkSpring - 1) * -0.15})`,
      }}>
        <div style={{ fontSize: 32, letterSpacing: "0.5em", color: GOLD, fontWeight: 700, marginBottom: 20, fontFamily: "monospace" }}>
          የስፖርት ልብ
        </div>
        <div style={{
          fontSize: 148, fontWeight: 900, color: TEXT,
          letterSpacing: "-0.04em", lineHeight: 0.9,
          fontFamily: "Inter, sans-serif",
        }}>
          SHEGER
        </div>
        <div style={{ width: 260, height: 5, margin: "28px auto", borderRadius: 2,
          background: `linear-gradient(90deg, ${GREEN}, ${GOLD}, ${RED})` }} />
        <div style={{ fontSize: 24, letterSpacing: "0.4em", color: MUTED, fontWeight: 500 }}>
          SPORTS
        </div>
      </div>

      <div style={{
        position: "absolute", bottom: 60, left: 0, right: 0,
        textAlign: "center", opacity: Math.min(1, (local - 60) / 20),
      }}>
        <div style={{ fontSize: 15, letterSpacing: "0.3em", color: MUTED, marginBottom: 8 }}>
          ONE NATION. PLAYING.
        </div>
        <div style={{ fontSize: 14, letterSpacing: "0.2em", color: "#777" }}>
          SHEGER SPORTS · ADDIS ABABA · 📱 2026
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── MAIN COMPOSITION ──
export const ShegerSports: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <>
      {/* SFX timeline (S2 canon) */}
      <Sequence from={0} durationInFrames={TOTAL}>
        {SFX.map((s, i) => (
          s.from > 0 && (
            <Sequence key={i} from={s.from}>
              <Audio src={staticFile(`audio/${s.src}`)} volume={s.volume} />
            </Sequence>
          )
        ))}
      </Sequence>

      <Sequence from={0} durationInFrames={90}>
        <SceneBrandOpen frame={frame} fps={fps} />
      </Sequence>

      <Sequence from={90} durationInFrames={160}>
        <SceneScores frame={frame} fps={fps} startFrame={90} />
      </Sequence>

      <Sequence from={280} durationInFrames={160}>
        <SceneTeams frame={frame} fps={fps} startFrame={280} />
      </Sequence>

      <Sequence from={440} durationInFrames={160}>
        <SceneAthletics frame={frame} fps={fps} startFrame={440} />
      </Sequence>

      <Sequence from={600} durationInFrames={180}>
        <SceneCounter frame={frame} fps={fps} startFrame={600} />
      </Sequence>

      <Sequence from={820} durationInFrames={220}>
        <SceneOutro frame={frame} fps={fps} startFrame={820} />
      </Sequence>
    </>
  );
};
