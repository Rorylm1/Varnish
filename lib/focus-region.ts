import type { NormalizedFocusRegion } from "@/types/lesson";

export function getFocusRegionStyle(
  focusRegion: NormalizedFocusRegion
): NormalizedFocusRegion {
  return {
    x: clamp(focusRegion.x),
    y: clamp(focusRegion.y),
    width: clamp(focusRegion.width),
    height: clamp(focusRegion.height),
    shape: focusRegion.shape,
  };
}

function clamp(value: number) {
  return Math.max(0, Math.min(1, value));
}
