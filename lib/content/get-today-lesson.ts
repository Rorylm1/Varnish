import lesson from "@/content/lessons/mona-lisa.json";
import { getManifest } from "@/lib/content/get-manifest";
import type { Lesson } from "@/types/lesson";

export function getTodayLesson() {
  const manifest = getManifest();

  return {
    manifest,
    lesson: lesson as Lesson,
  };
}
