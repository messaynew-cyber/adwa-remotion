# 🎬 ADWA Remotion — Cinematic Video Pipeline on GitHub Actions

**Render cinematic promo videos for free on GitHub's runners. 16GB RAM. 30fps. Zero OOM.**

No GPU. No laptop. No rendering rig. This pipeline turns your phone + a GitHub token into a **video production studio** — a library of typed React composition scenes that render to MP4 on every push, entirely in the cloud.

## Why this exists

Most video pipelines demand a beefy machine. This one doesn't. Written and orchestrated from a phone, it offloads all rendering to GitHub Actions' free `ubuntu-latest` runner (16GB RAM, multiple vCPUs). Just trigger a workflow, wait 2 minutes, download your MP4 from the artifact.

## Compositions

| ID | Length | Description |
|---|---|---|
| `AdwaDemo` | 30s | Flagman — OLED black, glass panel, spring physics |
| `FromTheForge` | 30s | The Phonemaker manifesto — forge embers, kinetic type, FLUX plates |
| `AdwaApkPromo` | 32s | ADWA APK promo — FLUX cinematic stills + Ken Burns camera |
| `TobiaPromo` | 33s | 6-scene APK promo — particles, neon, glassmorphism |
| `TobiaPhonemaker` | 24s | Single continuous kinetic flow, morphing FLUX parallax — no cuts |
| `LifePromo` | 24s | A cinematic about life 🌱 |
| `EthiopiaDemo` | — | Ethiopia showcase |
| `AfricaPromo` | — | Pan-African cinematic |
| `AddisAbaba` | 22s | አዲስ አበበ — the golden city |
| `BattleOfAdwa` | 15s | The 1896 battle — cinematic |
| `GerdPromo` | — | GERD dam promo — 4 scenes, particles, neon |
| `OsacPromo` | 30s | Osac Real Estate — Arabian Gold cinematic |
| `MessayPromo` | — | Personal promo |

## How it works

```
┌─────────┐   push / workflow_dispatch   ┌──────────────────────┐   render   ┌─────────────┐
│  Phone   │ ───────────────────────────► │  GitHub Actions (.yml) │ ─────────► │  MP4 artifact │
└─────────┘                              └──────────────────────┘            └─────────────┘
```

1. **Trigger** — run the workflow manually from the Actions tab (or via `gh workflow run`)
2. **Render** — Remotion bundles the composition, spins up Chromium headless, renders each frame at 30fps
3. **Download** — grab the MP4 from the job's artifact (retained 7 days)

### Local dev (optional)

```bash
npm install
npm run start      # Remotion Studio live preview
npm run build      # render AdwaDemo to out/adwa-demo.mp4
```

## Trigger a render via CLI

```bash
gh workflow run render.yml \
  -f composition_id=TobiaPhonemaker \
  -f duration_seconds=24 \
  -f output_name=tobia-phonemaker
```

## Design codebase

- **Reusable scene primitives** in `src/Components.tsx` — `ParticleField`, `NeonText`, `ScrambleText`, `CTAButton`, `CinematicBars`, `FadeTransition`. Compose new promos without re-inventing motion.
- **Ken Burns camera work** — glide over static FLUX art (zoom in/out, pan L/R) for cinematic depth without re-renders.
- **Emitter particle systems** — embers, glowing dust, hue-shifted fields.
- **Philosophy:** animate `transform` + `opacity` only, 30-80ms easing staggers, exit-faster-than-enter, `prefers-reduced-motion` respected. Emil Kowalski motion canon.

## Rendered outputs

Grab the newest artifact from the [Actions tab](https://github.com/messaynew-cyber/adwa-remotion/actions/workflows/render.yml) — each successful dispatch drops a fresh MP4.

## Stack

- [Remotion](https://remotion.dev) 4.0.460 — React-based video framework
- GitHub Actions `ubuntu-latest` — free 16GB RAM runner
- TypeScript + React 18

---

_Built and orchestrated entirely on a Redmi Note 11 Pro+ 5G — the Phonemaker way._ 👁️🗨️
