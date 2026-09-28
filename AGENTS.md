# AGENTS.md — GGMIC Official (Mobile)

Permanent project instructions. Read before modifying anything in this repository.

## Project description

**GGMIC Official** is the official mobile application for **THE GRACE OF GOD MIRACLE INTERNATIONAL (GGMIC)**, a Christian ministry.

- Founder: Pastor S.S. Bolarinwa
- Current General Overseer: Pastor Dr. O.S. Bolarinwa
- Main location: Behind Mechanic Village, Akure, Ondo State, Nigeria
- Official logo: `assets/images/ggmic-logo.png` (never modify or replace)

## Confirmed church facts (use ONLY these)

- Organisation name: THE GRACE OF GOD MIRACLE INTERNATIONAL
- Sunday Service: every Sunday at 8:00 AM
- Bible Study: every Tuesday at 5:00 PM
- Miracle Hour: every Wednesday at 9:00 AM

Do **not** invent telephone numbers, emails, social media handles, mission/vision/motto text, biographies, extra service schedules, or extra branch information. Mission and Vision supplied by the organisation are stored verbatim in `src/constants/churchInfo.ts` (do not reword them).

## Technology decisions

- React Native + Expo (SDK 52) + TypeScript (strict mode)
- Expo Router (file-based routing, `src/app`)
- `@expo/vector-icons` (MaterialIcons / Ionicons)
- `react-native-safe-area-context` for insets
- `expo-splash-screen` for splash control
- Path alias `@/*` → `./src/*`
- No unnecessary dependencies; add packages only when required

## Project structure

```
src/
  app/            routes (expo-router). (tabs) = bottom nav; (more) = stack screens
  components/     reusable UI components (no data logic)
  constants/      static data + app identity (demo data clearly marked)
  hooks/          custom hooks (useResponsive)
  services/       API/service boundary (no backend in Phase 1)
  theme/          centralized design tokens (colors, typography, spacing, radius, shadows, breakpoints)
  types/          shared TypeScript types
  utils/          pure helpers (responsive grid math, etc.)
```

Rules:

- UI components must not contain data/API logic or database code.
- Keep demo/mock data separate from components (see `src/constants/mockData.ts`).
- The `src/services/` layer is the only place future API calls belong.

## Responsive design requirements (MANDATORY)

The app must work correctly on small/large Android phones, iPhones, Android tablets and iPads, portrait and landscape.

- Use Flexbox, `useWindowDimensions`, safe-area handling, adaptive grids, max-width constraints.
- Never hard-code screen width/height. Never fix `.px` dimensions for layout.
- Content must never overflow horizontally, clip, overlap, sit under system UI, or break when system font size increases.
- Use `useResponsive()` for breakpoint detection, spacing scaling (`sp()`) and adaptive grid columns.
- Keep accessible touch targets (≥ 44–48 pt) and support system font scaling (`allowFontScaling` default on).
- Prevent excessive stretching on tablets (see `contentMaxWidth`).

## Branding rules

- Colours are derived from the official logo (see `src/theme/colors.ts`).
  - Primary teal-green `#036B57`, accent red `#DB3E49` (use `#B3313C` for text on white), background `#F1F5FB`, text `#161B20`.
- All colours, spacing, radius, shadows, icon sizes and typography MUST come from `src/theme/` tokens — never scatter ad-hoc values.
- Keep sufficient contrast (WCAG AA for text). Red accent is used sparingly.
- Visual style: professional, clean, modern, welcoming, Christian, trustworthy, accessible. Minimal animation.
- The interface is an original GGMIC design. Do not copy GOFAMINT code, assets, text, or exact design.

## Coding conventions

- TypeScript strict. Prefer named exports. No any (except deliberate, documented cases).
- No comments unless they explain a non-obvious decision.
- No dead code, no unused imports, no duplicated components.
- Clear naming; use existing reusable components instead of inlining markup.
- Prefer small, focused files; barrel exports via `src/components/index.ts`, `src/theme/index.ts`.
- Component props: use explicit interfaces, optional flags `placeholder` for empty/demo states.

## Security rules

- Never commit or hard-code secrets, API keys, tokens, or database credentials.
- No insecure authentication. Nothing secret may be exposed client-side.
- Keep `src/services/` free of endpoint URLs/secrets in future phases (use environment variables behind a server or secure config).

## Architecture rules

- Separate routes, components, theme, constants, hooks, types, utils, services, assets.
- Keep UI decoupled from data/API logic so a backend + PostgreSQL can be connected later without reshaping screens.
- Demo data in Phase 1 lives ONLY in `src/constants/` and is explicitly commented.

## Development phases

- **Phase 1 (completed):** application foundation — project structure, navigation, design system, responsive system, reusable components, splash, Home screen, Bible/Sermons/Events placeholders, Menu screen, placeholder routes, AGENTS.md. No backend.
- **Phase 2 (current):** church information & identity screens — About, History, Mission, Vision, Motto, Leadership, Founder, General Overseer, Services & Programs, Branches. Static confirmed data only (no backend).
- **Phase 3+ (future, NOT started):** backend API + PostgreSQL, authentication, prayer/testimony submission, events detail, sermons playback, video/gallery, announcements, livestream, giving, notifications, admin.

## Do not jump ahead

Implement only the approved phase. Do NOT build in advance:

- backend / PostgreSQL, authentication / member accounts
- prayer or testimony submission, online giving, notifications
- livestream functionality, admin dashboard, real map/branch data
- real Bible API, real sermon/event backend data

Never start a later phase without explicit approval.

## Verification

Before finishing work run:

- `npm run typecheck` (tsc --noEmit)
- Verify navigation routes exist for every constant route string
- Verify responsive behavior on phone and tablet widths