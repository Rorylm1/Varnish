import { Pressable, StyleSheet, Text, View } from "react-native";

import type { LessonBeat } from "@/types/lesson";

type BeatCardProps = {
  beat: LessonBeat;
  index: number;
  isActive: boolean;
  onPress: () => void;
};

export function BeatCard({ beat, index, isActive, onPress }: BeatCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.card, isActive && styles.cardActive]}
    >
      <View style={styles.headerRow}>
        <Text style={[styles.kicker, isActive && styles.kickerActive]}>
          Stop {index + 1}
        </Text>
        {isActive ? <Text style={styles.activeLabel}>Active</Text> : null}
      </View>
      <Text style={[styles.title, isActive && styles.titleActive]}>{beat.title}</Text>
      <Text style={styles.body}>{beat.body}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fbf8f2",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#d8cbb8",
    padding: 20,
    gap: 10,
  },
  cardActive: {
    borderColor: "#7d4b31",
    shadowColor: "#7d4b31",
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  kicker: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1.8,
    color: "#9a8a79",
  },
  kickerActive: {
    color: "#7d4b31",
  },
  activeLabel: {
    fontSize: 12,
    color: "#7d4b31",
    fontWeight: "700",
  },
  title: {
    fontSize: 22,
    lineHeight: 28,
    color: "#1f1a16",
    fontWeight: "700",
  },
  titleActive: {
    color: "#5d321e",
  },
  body: {
    fontSize: 16,
    lineHeight: 25,
    color: "#3d342d",
  },
});
