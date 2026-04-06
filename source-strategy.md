# Source Strategy

## Purpose

This document captures the most useful parts of the institutional source research for Varnish.

The goal is to identify a practical, production-safe source stack for:
- artwork metadata
- high-quality public-domain images
- artist and movement normalization
- contextual and interpretive material for guided-looking lessons

This is not a raw research dump. It is a decision-oriented summary for product and implementation work.

## What We Need From Sources

For this product, a useful source is not just one that has an image. We need sources that help us answer:
- what the artwork is
- who made it
- when and where it was made
- why it matters
- what details are worth noticing

The strongest sources for us are:
- official institutional sources
- public-domain or open-access sources
- API-accessible or structurally stable sources
- rich enough to support both factual grounding and interpretive lesson writing

## Recommended V1 Source Stack

### Primary Repositories

#### 1. The Metropolitan Museum of Art

Use The Met as a primary V1 source for:
- high-resolution public-domain images
- broad coverage of globally recognized works
- stable factual metadata
- initial lesson candidates for the app

Why it matters:
- large, production-usable catalog
- CC0-friendly public-domain access
- no API key required
- excellent for iconic paintings and broad coverage

Limitations:
- interpretive context is not always easy to extract directly from the API
- factual metadata is stronger than ready-made narrative guidance

#### 2. Art Institute of Chicago

Use AIC as the other primary V1 source, especially when we want richer guided-looking support.

Why it matters:
- strong open-access policy
- highly structured and developer-friendly API
- useful interpretive fields such as `alt_text`
- IIIF support for closer image work

Why it is especially valuable:
- the `alt_text` field is one of the best institutional fields for our lesson format
- helps bridge the gap between raw metadata and human-readable visual guidance

Limitations:
- smaller overall volume than The Met
- should be used selectively where it holds especially strong works

### Secondary Repositories

#### Rijksmuseum

Best for:
- Dutch Golden Age and major European painting depth
- high-quality data and image delivery
- future expansion after V1

Strengths:
- strong data quality
- good linked/open data posture
- useful for deeper European canon coverage

Watch-outs:
- some assets may require attribution even when broadly open

#### National Gallery of Art

Best for:
- factual grounding
- artist and artwork data accuracy
- additional open-access image coverage

Strengths:
- strong institutional credibility
- daily-updated collection data
- good supplemental source for major works

#### Smithsonian

Best for:
- American art and portraiture
- educational framing
- broader institutional context

Strengths:
- massive open-access footprint
- good freetext and educational material in some units

Watch-outs:
- metadata consistency varies by unit
- should be used selectively rather than as a single uniform source

## Authority And Normalization Layer

### Wikidata

Use Wikidata as the main cross-linking and knowledge graph layer.

Best use:
- unify artist and artwork identities across museums
- connect museum records to broader knowledge
- support future related-work and movement-based features

Why it matters:
- CC0
- flexible
- strong linking hub between museums, Wikipedia, and authority files

Watch-outs:
- community-edited, so it should support validation rather than replace institutional facts

### Getty ULAN

Use Getty ULAN as a biographical and naming authority.

Best use:
- normalize artist identities
- confirm birth/death dates, name variants, and nationalities

Why it matters:
- highly credible scholarly standard
- useful as a consistency layer when museums disagree in formatting

### Getty AAT

Use Getty AAT for:
- medium normalization
- movement/style categorization
- tagging and taxonomy

Why it matters:
- gives us a professional vocabulary for grouping content later

## Interpretive And Educational Context

### Art Institute of Chicago Narrative Fields

The AIC API is especially useful because some fields are already shaped for public interpretation, not just cataloging.

Best use:
- extract guided-looking clues
- support visible-detail commentary
- build better lesson drafts

### Smithsonian Learning Lab

Useful as a tertiary context layer for:
- educational framing
- accessible cultural and historical interpretation

This may be especially useful when we want language that is more approachable than museum catalog essays.

### Google Arts & Culture

Do not treat Google Arts & Culture as a production source.

Use it only as:
- a discovery benchmark
- a storytelling reference
- an editorial inspiration tool for what kinds of details are visually interesting

Why:
- strong zoom/story experience
- useful editorial benchmark

Why not as a source of record:
- not appropriate as a primary commercial production source for our app content

## Practical Source Hierarchy

### Tier 1: Primary Source of Truth

Use museum APIs and open-access collections for:
- official metadata
- official object URLs
- official image references
- legal/reuse grounding

Current V1 priority:
- The Met
- Art Institute of Chicago

### Tier 2: Enrichment And Normalization

Use authority and knowledge graph layers for:
- artist identity normalization
- movement/style tagging
- related entity linking

Current V1 priority:
- Wikidata
- Getty ULAN
- Getty AAT

### Tier 3: Interpretive And Educational Support

Use public educational and narrative sources for:
- lesson drafting
- identifying themes
- improving context and readability

Current V1 priority:
- AIC narrative fields
- Smithsonian Learning Lab
- museum object essays where publicly available

## Strong V1 Recommendation

The minimum viable source strategy for launch should be:

1. The Met for breadth, iconic works, and public-domain image coverage
2. Art Institute of Chicago for richer guided-looking support and interpretive detail
3. Wikidata as the main linking layer
4. Getty ULAN and AAT as normalization layers where needed

This gives us:
- legal safety
- institutional credibility
- a large enough candidate pool
- enough metadata and narrative structure to build high-quality lessons

## Why This Fits Varnish

This product is not trying to be a universal art encyclopedia.

It needs:
- a reliable image source
- trustworthy facts
- enough contextual richness to create short, specific lessons
- a path to scale without collapsing into messy manual research every time

The Met + AIC combination is the best current balance of:
- operational simplicity
- credibility
- public-domain safety
- educational usefulness

## Key Risks And Gaps

### The Interpretive Gap

Many museums provide excellent object metadata but weak direct lesson material.

What this means for us:
- we cannot rely on museum APIs alone to produce strong lessons
- we still need editorial shaping and quality control

### Metadata Fragmentation

Different institutions describe similar things differently.

What this means for us:
- normalization will matter
- Wikidata and Getty should support consistency

### Rights And Attribution Complexity

Even when data is broadly open, attribution expectations may differ by institution.

What this means for us:
- every lesson record should preserve source URL, institution, credit line, and rights status

### Runtime Image Dependence

Direct hotlinking to museum images is acceptable for research and early development, but may become fragile for production scale.

What this means for us:
- v1 can start with official source URLs
- later versions may need a more controlled image delivery layer or cached mirror strategy

## Implementation Notes

The current repository direction should be:
- keep The Met as the first integrated source
- add AIC as the next institutional source
- preserve source provenance in every lesson schema
- avoid building a huge ingestion system too early
- build a small, high-quality candidate list of paintings first

## Near-Term Actions

1. Add AIC as a second ingestion source after The Met.
2. Create a shortlist of V1 candidate works from The Met and AIC.
3. Define the source fields every lesson must preserve:
   - institution
   - object ID
   - object URL
   - image URL(s)
   - rights status
   - credit line
4. Define an editorial checklist for turning source material into a guided-looking lesson.
5. Test real image delivery performance with a handful of production-like artworks.
