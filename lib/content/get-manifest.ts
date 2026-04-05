import manifest from "@/content/manifest.json";
import type { LessonManifest } from "@/types/manifest";

export function getManifest(): LessonManifest {
  return manifest as LessonManifest;
}
