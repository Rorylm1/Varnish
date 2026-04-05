export type FocusRegionShape = "rect" | "circle";

export type NormalizedFocusRegion = {
  x: number;
  y: number;
  width: number;
  height: number;
  shape?: FocusRegionShape;
};

export type ResponsiveImageSource = {
  src: string;
  width: number;
  height: number;
};

export type LessonImage = {
  src: string;
  width: number;
  height: number;
  credit: string;
  license: string;
  dominantColor: string;
  responsiveSources: ResponsiveImageSource[];
};

export type LessonBeat = {
  id: string;
  title: string;
  body: string;
  focusRegion: NormalizedFocusRegion;
  overlayStyle: string;
};

export type Lesson = {
  metObjectId?: number;
  source?: {
    provider: "met";
    objectURL: string;
    primaryImage: string;
    isPublicDomain: boolean;
    license: string;
  };
  id: string;
  slug: string;
  publishDate: string;
  title: string;
  artistName: string;
  artistYears: string;
  yearLabel: string;
  medium: string;
  dimensions: string;
  museumName: string;
  museumLocation: string;
  imageAlt: string;
  summary: string;
  context: string;
  reflectionPrompt: string;
  image: LessonImage;
  thumbnail: ResponsiveImageSource;
  beats: LessonBeat[];
};
