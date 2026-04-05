import type { Lesson, ResponsiveImageSource } from "@/types/lesson";
import type { MetObject } from "@/types/met";

export function normalizeMetObjectToLessonSeed(
  metObject: MetObject
): Partial<Lesson> & {
  metObjectId: number;
  source: {
    provider: "met";
    objectURL: string;
    primaryImage: string;
    isPublicDomain: boolean;
    license: string;
  };
} {
  const primaryImage = metObject.primaryImage || metObject.primaryImageSmall;
  const responsiveSources = buildResponsiveSources(metObject);

  return {
    metObjectId: metObject.objectID,
    source: {
      provider: "met",
      objectURL: metObject.objectURL,
      primaryImage,
      isPublicDomain: metObject.isPublicDomain,
      license: metObject.isPublicDomain ? "CC0 / Public Domain" : "Restricted",
    },
    id: String(metObject.objectID),
    slug: slugify(metObject.title || `met-${metObject.objectID}`),
    publishDate: "",
    title: metObject.title,
    artistName: metObject.artistDisplayName || metObject.culture || "Unknown",
    artistYears:
      metObject.artistBeginDate || metObject.artistEndDate
        ? `${metObject.artistBeginDate || "?"}-${metObject.artistEndDate || "?"}`
        : "",
    yearLabel: metObject.objectDate || "",
    medium: metObject.medium || "",
    dimensions: metObject.dimensions || "",
    museumName: "The Metropolitan Museum of Art",
    museumLocation: "New York, NY",
    imageAlt: buildImageAlt(metObject),
    summary: "",
    context: buildContext(metObject),
    reflectionPrompt: "",
    image: {
      src: primaryImage,
      width: 0,
      height: 0,
      credit:
        metObject.creditLine ||
        "The Metropolitan Museum of Art Open Access collection",
      license: metObject.isPublicDomain ? "CC0 / Public Domain" : "Restricted",
      dominantColor: "#8b7767",
      responsiveSources,
    },
    thumbnail: responsiveSources[0] ?? {
      src: metObject.primaryImageSmall || primaryImage,
      width: 0,
      height: 0,
    },
    beats: [],
  };
}

function buildResponsiveSources(metObject: MetObject): ResponsiveImageSource[] {
  const sources: ResponsiveImageSource[] = [];

  if (metObject.primaryImageSmall) {
    sources.push({
      src: metObject.primaryImageSmall,
      width: 0,
      height: 0,
    });
  }

  if (metObject.primaryImage) {
    sources.push({
      src: metObject.primaryImage,
      width: 0,
      height: 0,
    });
  }

  return sources;
}

function buildImageAlt(metObject: MetObject) {
  const parts = [
    metObject.artistDisplayName,
    metObject.title,
    metObject.objectDate,
  ].filter(Boolean);

  return parts.join(", ");
}

function buildContext(metObject: MetObject) {
  const parts = [
    metObject.title,
    metObject.artistDisplayName,
    metObject.objectDate,
    metObject.medium,
  ].filter(Boolean);

  return parts.join(" • ");
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
