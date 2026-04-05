export type ManifestLessonEntry = {
  id: string;
  slug: string;
  publishDate: string;
  path: string;
};

export type LessonManifest = {
  currentLessonId: string;
  lessons: ManifestLessonEntry[];
};
