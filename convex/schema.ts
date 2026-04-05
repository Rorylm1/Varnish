import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  lessons: defineTable({
    metObjectId: v.optional(v.number()),
    source: v.optional(
      v.object({
        provider: v.literal("met"),
        objectURL: v.string(),
        primaryImage: v.string(),
        isPublicDomain: v.boolean(),
        license: v.string(),
      })
    ),
    slug: v.string(),
    publishDate: v.string(),
    title: v.string(),
    artistName: v.string(),
    artistYears: v.string(),
    yearLabel: v.string(),
    medium: v.string(),
    dimensions: v.string(),
    museumName: v.string(),
    museumLocation: v.string(),
    imageAlt: v.string(),
    summary: v.string(),
    context: v.string(),
    reflectionPrompt: v.string(),
    image: v.object({
      src: v.string(),
      width: v.number(),
      height: v.number(),
      credit: v.string(),
      license: v.string(),
      dominantColor: v.string(),
      responsiveSources: v.array(
        v.object({
          src: v.string(),
          width: v.number(),
          height: v.number(),
        })
      ),
    }),
    thumbnail: v.object({
      src: v.string(),
      width: v.number(),
      height: v.number(),
    }),
    beats: v.array(
      v.object({
        id: v.string(),
        title: v.string(),
        body: v.string(),
        focusRegion: v.object({
          x: v.number(),
          y: v.number(),
          width: v.number(),
          height: v.number(),
          shape: v.optional(v.union(v.literal("rect"), v.literal("circle"))),
        }),
        overlayStyle: v.string(),
      })
    ),
    status: v.union(
      v.literal("draft"),
      v.literal("scheduled"),
      v.literal("published")
    ),
  })
    .index("by_slug", ["slug"])
    .index("by_publish_date", ["publishDate"]),
});
