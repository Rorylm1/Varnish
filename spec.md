# Guided-Looking Art App V1 Spec

## Product

### Goal

Ship a polished MVP for a daily guided-looking art lesson.

The product should deliver one painting per day in a format that keeps the artwork central while teaching the user a new way of seeing it. The app should feel beautiful, calm, and lightweight, with dependable offline access after an initial sync.

### Target Session

About 5 minutes.

### Success Criteria

- the user can open the daily lesson quickly on mobile web
- the painting stays visually central while the lesson progresses
- the lesson teaches the user a new way of seeing a familiar work
- the current lesson and near-future content remain available offline after one sync

## MVP Scope

### Included

- daily painting screen
- guided-looking lesson flow
- offline caching for the current lesson plus a short forward window
- lightweight content refresh when the device is online
- beautiful responsive web experience from an Expo universal codebase

### Excluded

- accounts or sign-in
- favorites or collections
- comments or community features
- complex search or full archive browsing
- subscriptions or payments
- personalized recommendations

V1 should stay deliberately narrow so the team can get the lesson experience right before adding platform features.

## Core User Flow

1. The user opens the app.
2. The app loads the current daily lesson immediately from local cache if available.
3. If online, the app checks for updated lesson metadata and any forward-cached lessons.
4. The user sees the painting first, then moves through the guided lesson as they scroll.
5. Each lesson beat directs attention to a specific visual area without removing the artwork from view.
6. The lesson ends with a short reflection or question that encourages the user to form an opinion.

## Lesson Format

V1 should use a fixed lesson schema so the editorial and UI experience remain consistent.

### Required Lesson Fields

- `id`
- `slug`
- `publishDate`
- `title`
- `artistName`
- `artistYears`
- `yearLabel`
- `medium`
- `dimensions`
- `museumName`
- `museumLocation`
- `image`
- `imageAlt`
- `thumbnail`
- `summary`
- `reflectionPrompt`
- `beats`

### Image Object

- `src`
- `width`
- `height`
- `credit`
- `license`
- `dominantColor`
- `responsiveSources[]`

### Beat Object

- `id`
- `title`
- `body`
- `focusRegion`
- `overlayStyle`

### Focus Region

The UI should support optional visual guidance for each beat using normalized coordinates so highlights remain responsive across screen sizes.

```ts
type FocusRegion = {
  x: number; // 0 to 1
  y: number; // 0 to 1
  width: number; // 0 to 1
  height: number; // 0 to 1
  shape?: "rect" | "circle";
};
```

### Lesson Shape

Each lesson should follow this rhythm:
- short setup copy that explains who made the work, when, and why it matters
- 3 to 5 guided-looking beats
- one short closing reflection or question

Every beat must refer to something visible in the artwork. If the copy cannot be tied to a region or visual feature, it does not belong in the lesson.

## UX / Interaction

### Primary Interaction

The experience is scroll-led.

As the user advances through the lesson:
- the painting remains visible
- the active region is highlighted or gently focused
- the text references exactly what the user is being shown

The interaction should feel calm and premium, not busy or game-like. Highlights should guide attention, not turn the painting into a novelty overlay.

### Layout Principles

- mobile-first layout with careful desktop support
- strong editorial typography
- generous whitespace
- image-first hierarchy
- elegant, restrained motion

### Screen Behavior

On mobile:
- the painting stays pinned or persistently visible near the top while lesson text progresses below
- highlight transitions should be smooth and subtle
- text blocks should stay short enough to read quickly without losing the visual connection

On larger screens:
- use a split layout where the painting remains fixed on one side and the lesson progresses on the other
- keep the image large enough that focus regions still feel meaningful

### Accessibility

- all text must meet readable contrast standards
- the lesson must remain usable without relying only on color-based highlights
- images need descriptive alt text
- motion should be reduced when the system requests reduced motion

## Technical Approach

### Frontend

- Expo
- React Native
- Expo Router
- web as the first deployment target
- iOS later from the same codebase

This gives the team a fast route to a polished web prototype while preserving a cleaner path to App Store delivery later.

### Content / Data Model

Lesson content should be stored separately from UI code, with Convex as the intended application database and backend.

Initial options:
- Convex for lesson metadata, publish scheduling, and future user data
- local JSON fixtures checked into the repo during bootstrap and testing
- later migration to a richer editorial workflow if non-technical publishing becomes frequent

The UI should consume a stable lesson schema so the current local fixtures can later be swapped for Convex queries without rewriting presentation components.

### Offline Strategy

V1 should be offline-friendly, not infinitely offline.

Requirements:
- persist the current lesson metadata locally
- cache the current lesson image assets locally
- prefetch a short forward window of upcoming lessons
- fall back to cached content immediately when offline

Working policy for V1:
- cache today plus the next 6 lessons
- target compressed image sizes that preserve a premium feel without bloating storage
- aim for a total cache budget of roughly 80 MB to 120 MB
- evict older lessons outside the active cache window

The implementation should favor predictable availability over complex personalization.

### Backend / Delivery

Start simple.

- Convex for application data and lesson records
- CDN-backed image delivery
- no user authentication
- no personalized backend logic in v1

This should keep the first release fast to build and cheap to run.

## Content Pipeline

### Editorial Workflow

1. Choose a famous public-domain work.
2. Gather a high-quality source image and basic metadata.
3. Generate a first-pass lesson draft with AI.
4. Review the draft for specificity, readability, and novelty.
5. Add or refine focus regions and overlay behavior.
6. Publish the structured lesson payload.

### Editorial Rules

- start with recognisable paintings
- every lesson must contain at least one insight that feels surprising but defensible
- beats must reference concrete visual details
- avoid generic praise, vague symbolism, and summary-only art history
- keep the copy human-readable and short enough for a commute

### Quality Rejection Criteria

Reject a lesson if it:
- reads like a textbook or museum placard
- could apply to many paintings with only minor edits
- makes claims that are not visibly supported by the work
- includes too much context and not enough guided looking

## Deployment

### Web

- ship the Expo web build first
- deploy to a simple static or edge-friendly host
- keep source in GitHub from the beginning

Good early hosting options include Vercel, Netlify, or Cloudflare Pages. The final choice can be made during project setup.

### iOS Later

- continue with Expo and EAS for native builds
- use TestFlight as the first mobile distribution step
- move to App Store submission once the core lesson experience feels strong enough on web

## Test Plan

### Functional

- daily lesson loads correctly on mobile web
- daily lesson falls back to cached content when offline
- refresh while online updates the current and forward-cached lesson set correctly

### UX

- the image remains visible while progressing through lesson beats
- highlight regions match the referenced copy
- the lesson remains readable and visually calm on narrow phone screens
- the layout still feels intentional on larger desktop widths

### Content Quality

- each lesson includes at least one genuinely specific observation
- no beat feels generic or detached from the visible image
- AI-generated drafts are caught and revised if they feel shallow, repetitive, or unsupported

## Assumptions

- V1 is intentionally narrow and focused on the daily lesson only
- no accounts are required initially
- the initial catalog prioritizes famous works over broad representational goals
- broader global representation is a later expansion path, not the launch promise
- monetization is deferred until the core experience proves itself
- `vision.md` acts as the north star, while this file is the working implementation source of truth
