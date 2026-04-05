import { StyleSheet, Text, View } from "react-native";

import type { FocusRegionShape, NormalizedFocusRegion } from "@/types/lesson";

type ArtworkFocusOverlayProps = {
  title: string;
  region: NormalizedFocusRegion;
  shape?: FocusRegionShape;
};

export function ArtworkFocusOverlay({
  title,
  region,
  shape = "rect",
}: ArtworkFocusOverlayProps) {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <View style={styles.scrim} />
      <View
        style={[
          styles.focusBox,
          {
            left: `${region.x * 100}%`,
            top: `${region.y * 100}%`,
            width: `${region.width * 100}%`,
            height: `${region.height * 100}%`,
            borderRadius: shape === "circle" ? 999 : 20,
          },
        ]}
      />
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(34, 28, 24, 0.14)",
  },
  focusBox: {
    position: "absolute",
    borderWidth: 2,
    borderColor: "#f5e2b8",
    backgroundColor: "rgba(245, 226, 184, 0.12)",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  badge: {
    position: "absolute",
    left: 18,
    bottom: 18,
    backgroundColor: "rgba(28, 25, 22, 0.8)",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  badgeText: {
    color: "#f7f1e8",
    fontSize: 12,
    fontWeight: "600",
  },
});
