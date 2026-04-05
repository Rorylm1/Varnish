import type { Lesson } from "@/types/lesson";

export function validateLesson(lesson: Lesson) {
  if (!lesson.id || !lesson.slug || !lesson.title) {
    throw new Error("Lesson metadata is incomplete.");
  }

  if (!lesson.image?.src) {
    throw new Error(`Lesson ${lesson.id} is missing a primary image.`);
  }

  if (!lesson.beats?.length) {
    throw new Error(`Lesson ${lesson.id} must contain at least one beat.`);
  }

  return lesson;
}
