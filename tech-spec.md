# Technical Spec

## Overview

This document translates the product spec into a lean technical implementation plan for the first MVP.

The chosen approach is the **Lean Static MVP**:
- Expo universal app
- web first
- Convex-backed application data
- local lesson fixtures during bootstrap
- high-quality image delivery through a managed image CDN
- lightweight offline support rather than a fully engineered offline platform

The goal of this approach is to validate the guided-looking experience quickly without committing early to a heavy content or infrastructure stack.

## Architecture Summary

### Frontend

- Expo
- React Native
- Expo Router
- Expo web as the first shipping target
- iOS later from the same codebase

### Content Delivery

- Convex is the intended database and backend for lesson records
- local JSON fixtures are allowed during early bootstrap before the Convex deployment is connected
- no authenticated API or user account model in v1

### Image Delivery

- store original high-resolution artwork files in Sanity
- use Sanity's asset CDN and image transformations for responsive delivery
- deliver multiple image sizes for different device and layout contexts

### Offline Support

- native-friendly local caching for metadata and images
- limited web offline support added later via service worker only if needed
- v1 should be described as offline-friendly, not guaranteed fully offline on web

## Why This Option

This architecture is optimized for speed and product learning.

It gives us:
- the fastest path to a polished guided-looking prototype
- a shared codebase for web now and iOS later
- a clean path to move from local fixtures to Convex queries
- high-quality image handling without building our own media pipeline
- simple static hosting and low operational overhead

It does not give us:
- a sophisticated CMS workflow
- advanced pack-based offline delivery
- strong personalized syncing or account features

That tradeoff is acceptable for MVP because the main thing we need to prove is whether users love the lesson format.

## Core Technical Decisions

### 1. App Framework

Use Expo with Expo Router as the single app foundation.

Reasoning:
- keeps the codebase aligned with the later iOS launch
- supports fast web iteration
- avoids rewriting the product after validation

### 2. Convex-Backed Lesson Data

Use Convex as the intended application database, while keeping local JSON fixtures available until the deployment is connected.

Recommended structure:

```text
/convex
  schema.ts
  lessons.ts
  /_generated
/content
  /lessons
    /mona-lisa.json
```

Convex should eventually hold:
- current lesson scheduling
- ordered lessons by publish date
- lesson records and image metadata references
- lightweight metadata for prefetch decisions

Each lesson record should contain:
- artwork metadata
- summary
- reflection prompt
- guided-looking beats
- focus region coordinates
- image asset references

Reasoning:
- Convex gives us a real backend without forcing a heavy infrastructure stack
- local fixtures keep development unblocked
- the schema can evolve into archive, publishing, and account features later

### 3. High-Resolution Image Strategy

This is one of the most important MVP implementation areas.

#### Source of Truth

- keep an original master image in Sanity for each artwork
- prefer public-domain works with clean licensing and stable source material
- keep source attribution, license, and museum credit with the asset metadata

#### Delivery Strategy

We should not serve the original master image directly to the client in normal app usage.

Instead, generate delivery variants:
- thumbnail
- mobile hero
- desktop hero
- optional zoom/detail variant

Each lesson should reference these derived assets through Sanity image URLs.

Recommended delivery targets:
- thumbnail: low-weight preview
- mobile hero: around 1400 to 1800 px on the longest edge
- desktop hero: around 2200 to 2800 px on the longest edge
- optional detail view: around 3000 px if a specific painting benefits from closer inspection

The exact image sizes can be tuned after testing, but the rule is:
- preserve perceived quality
- never download more than the layout can realistically use

#### Why Sanity for Images

Sanity gives us:
- managed asset storage
- CDN delivery
- on-the-fly resizing
- no custom image processing service to build in v1

That keeps the image problem operationally simple while still supporting a premium visual result.

### 4. Guided-Looking Overlay Model

The overlay system should be data-driven.

Each lesson beat references a normalized focus region:

```ts
type FocusRegion = {
  x: number;
  y: number;
  width: number;
  height: number;
  shape?: "rect" | "circle";
};
```

The UI should render highlights relative to the displayed image bounds, not fixed pixels.

Recommended v1 behavior:
- dim the rest of the image slightly
- outline or softly emphasize the active region
- avoid aggressive zoom animations in the first implementation

Reasoning:
- stable and easier to implement
- less visually noisy
- keeps the painting legible while still guiding attention

### 5. Local Persistence

Use lightweight local persistence for v1.

Recommended storage split:
- lesson metadata: `expo-sqlite/kv-store` or equivalent simple key-value persistence
- image files: rely on `expo-image` caching first
- backend client: a single `ConvexReactClient` configured from `EXPO_PUBLIC_CONVEX_URL`

For the first pass, do not build a custom asset management layer unless image caching proves unreliable.

Reasoning:
- avoids overengineering before we know the product loop works
- lets us keep implementation effort focused on lesson rendering and polish

## Offline Strategy

### Native / Shared App Behavior

When the app opens:
1. load the cached manifest if present
2. resolve today's lesson from cache first
3. fetch updated manifest in the background if online
4. prefetch the current lesson image and a small forward window of lessons

Recommended forward cache window for this option:
- today plus the next 2 lessons

This is intentionally smaller than the broader product ambition because Option 1 optimizes for simplicity, not maximum offline depth.

### Web Behavior

For the first shipping version:
- support browser-level caching naturally via static assets and HTTP cache headers
- do not promise full offline reliability on web

Possible later enhancement:
- add a simple service worker to cache manifest, current lesson JSON, and key image variants

This should be treated as a follow-up enhancement, not a day-one dependency.

## Content Publishing Workflow

### Editorial Flow

1. Choose a public-domain painting.
2. Source the highest-quality available image.
3. Upload the master file to Sanity.
4. Create the lesson payload from the shared schema.
5. Add focus regions for each guided-looking beat.
6. Validate the lesson payload locally.
7. Save the lesson into Convex once the backend is connected.

### Authoring Approach

For MVP, author lessons in files first, then move them into Convex.

This means:
- text is written and reviewed in Markdown or JSON-friendly form
- focus regions are entered manually
- publishing starts via GitHub and can later move to Convex-backed admin tooling

Reasoning:
- fewer moving parts
- easier review history
- lower setup overhead

## Proposed File Structure

```text
/app
/components
/lib
  /content
    getManifest.ts
    getLesson.ts
    validateLesson.ts
  convex.ts
  /image
    buildImageUrl.ts
  /storage
    lessonCache.ts
/content
  manifest.json
  /lessons
/convex
  schema.ts
/types
  lesson.ts
```

Key responsibilities:
- `getManifest.ts`: loads manifest from local fixture or Convex-backed source
- `getLesson.ts`: resolves and parses lesson payloads
- `validateLesson.ts`: runtime validation for lesson structure
- `convex.ts`: initializes the shared Convex client from Expo env vars
- `buildImageUrl.ts`: creates Sanity image URLs for required sizes
- `lessonCache.ts`: caches manifest metadata and lesson lookups

## MVP Implementation Steps

### Phase 1. Foundation

- initialize Expo app with Expo Router
- add Convex client and env plumbing
- configure web target
- create lesson TypeScript types
- add one or two sample lesson JSON files
- build a daily lesson route

### Phase 2. Guided-Looking UI

- render the painting prominently
- build the scroll-led lesson layout
- implement beat state tracking
- implement focus region overlays
- add subtle transitions between beats

### Phase 3. Content Loading

- load `manifest.json`
- resolve today's lesson by date
- load lesson JSON dynamically
- prepare the swap from local fixtures to Convex queries
- handle missing lesson fallback gracefully

### Phase 4. Image Delivery

- upload master images to Sanity
- wire Sanity image URLs into lesson payloads
- implement responsive image selection
- test visual quality versus asset weight on mobile connections

### Phase 5. Lightweight Caching

- cache manifest metadata locally
- cache recently viewed lesson JSON
- prefetch image assets for today and near-future lessons
- confirm the app still behaves acceptably after a signal drop

### Phase 6. Web Deployment

- configure static deployment
- deploy to Vercel, Netlify, or Cloudflare Pages
- verify lesson loading, image performance, and responsive layouts in production

## Performance Constraints

### Lesson JSON

- keep lesson payloads small and text-focused
- avoid embedding large repeated metadata blocks

### Images

- default to compressed responsive variants
- avoid full-resolution masters in normal runtime paths
- test largest paintings on mid-range mobile devices

### UI

- keep overlays simple
- avoid expensive scroll-driven re-renders
- prefer lightweight animated state transitions over heavy canvas work in v1

## Risks

### 1. Web Offline Is Weaker Than Native

This is the biggest tradeoff in Option 1.

Mitigation:
- describe the product as offline-friendly
- rely on native later for the strongest commuter experience
- only invest in service worker complexity after validating demand

### 2. Image Weight Could Undermine the Experience

Large paintings can become too heavy if we chase quality without limits.

Mitigation:
- define responsive delivery sizes early
- measure actual page weight on mobile networks
- reserve very high detail variants for specific cases

### 3. Local Fixtures May Become Editorially Painful

If content velocity increases, file-based authoring may slow the team down.

Mitigation:
- keep lesson schema stable
- move lesson storage into Convex early
- use this MVP to learn the right editorial workflow before adding a CMS

## Exit Criteria for This Architecture

We should move beyond this lean setup when one or more of these become true:
- we want non-technical editors publishing frequently
- we need stronger guaranteed offline delivery
- we want archive browsing and richer content discovery
- we want personalization or accounts
- we need a more formal media pipeline

At that point, the next likely move is a CMS-backed content system and a more deliberate offline asset strategy.

## Recommendation

Proceed with this architecture only if the immediate goal is to validate:
- the beauty of the product
- the guided-looking interaction
- the quality of the lesson format

This is the right MVP if we want to learn quickly and keep technical complexity low while still delivering a polished experience.
