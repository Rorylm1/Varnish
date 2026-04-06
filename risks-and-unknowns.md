# Risks And Unknowns

## Core Product Risk

The biggest risk is not technical. It is whether the app can repeatedly make a user feel that they have learned a genuinely new way of seeing a painting they may already know.

If the lesson quality is generic, the product fails even if the interface is polished.

## Experience Risks

- The guided-looking interaction is not fully proven yet.
- Keeping the painting visually central while text progresses is harder on small screens than it sounds.
- Scroll-driven focus changes can feel elegant or gimmicky depending on timing, spacing, and motion.
- Different artwork formats need different treatment. Portraits, landscapes, objects, and abstract works will not all behave equally well in one layout.
- The current UI is a foundation, not yet the final premium editorial expression.

## Content Risks

- AI-generated lesson drafts can become shallow, repetitive, or detached from what is actually visible.
- We do not yet have a final editorial approval workflow.
- Focus-region authoring is manual and may become expensive in time very quickly.
- Famous works are a strong launch hook, but may eventually feel too obvious if variety is not handled well.
- We still need to learn whether users want more context, less context, or a shorter lesson overall.

## Image Risks

- We now have a strong first source in The Met, but not every desired work will be available there.
- Some Met records are rich and clean; others may be sparse or awkward for lesson use.
- We do not yet have a final image budget policy for mobile web.
- We have not decided whether to hotlink Met images long-term or mirror selected assets later.
- We do not yet validate focus regions against delivered image bounds automatically.

## Source Strategy Risks

- Starting with The Met is practical, but relying on one institution could narrow the canon in unintended ways.
- The long-term ambition for broader representation will require more sources than The Met alone.
- We still need a formal candidate-selection workflow, not just search scripts.

## Offline Risks

- Offline use is one of the product's strongest promises, but the current implementation does not meet that promise yet.
- Native offline support will be much stronger than web offline support.
- We still need real metadata caching, image prefetching, eviction rules, and stale-content behavior.
- We have not yet decided whether the right v1 cache window is a few days or a full week.

## Backend Risks

- Convex is scaffolded but not connected.
- No deployment URL is configured yet.
- No generated Convex types are present yet.
- No lesson query or mutation layer exists yet.
- The app still relies on local fixture content instead of live backend data.
- Scheduling logic for daily lessons has not been implemented.

## Operational Risks

- No analytics are in place yet, so we cannot measure completion, retention, or drop-off.
- No crash or runtime monitoring is in place yet.
- No editorial admin tooling exists yet.
- No fallback process exists if a scheduled lesson is broken or incomplete.
- We do not yet have a formal checklist for publishing a lesson safely.

## Launch Risks

- We have not yet proven whether this should remain web-first for longer or move quickly into native distribution.
- Push notifications are likely important for habit formation, but they are not designed yet.
- App Store readiness will require a more complete feeling product than the current MVP shell.
- Privacy, legal, and attribution details will need to be handled cleanly even before monetization.

## Key Unknowns To Resolve Soon

- What exact lesson length produces the best completion rate?
- What mix of context and close-looking feels strongest?
- How many lessons should be cached ahead by default?
- Which image sizes are good enough to feel premium without becoming heavy?
- How much manual editorial review is required before a lesson can be trusted?
- Which 3 to 5 paintings should define the true v1 quality bar?

## Immediate Priorities

1. Prove the guided-looking UX on the current screen.
2. Connect Convex and move the sample lesson off local fixtures.
3. Create a shortlist of real Met artworks suitable for v1.
4. Define a publishing checklist for lesson quality and image validity.
5. Test image quality and performance on realistic mobile conditions.
