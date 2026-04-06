import { useMemo, useState } from "react";
import {
  ImageStyle,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Image } from "expo-image";

import { ArtworkFocusOverlay } from "@/components/ArtworkFocusOverlay";
import { BeatCard } from "@/components/BeatCard";
import { ConvexStatusBanner } from "@/components/ConvexStatusBanner";
import { getTodayLesson } from "@/lib/content/get-today-lesson";
import { validateLesson } from "@/lib/content/validate-lesson";
import { getConvexUrl } from "@/lib/convex";
import { getFocusRegionStyle } from "@/lib/focus-region";
const { manifest, lesson } = getTodayLesson();
const dailyLesson = validateLesson(lesson);
const convexConnected = Boolean(getConvexUrl());
const artworkAspectRatio =
  dailyLesson.image.width > 0 && dailyLesson.image.height > 0
    ? dailyLesson.image.width / dailyLesson.image.height
    : 1;
const artworkStyle: ImageStyle = {
  width: "100%",
  aspectRatio: artworkAspectRatio,
  borderRadius: 20,
  backgroundColor: "#d8c9b4",
};

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const [activeBeatIndex, setActiveBeatIndex] = useState(0);
  const [showOverlay, setShowOverlay] = useState(true);

  const isWide = width >= 960;
  const stickyWideStyle =
    Platform.OS === "web"
      ? ({
          position: "sticky",
          top: 24,
          alignSelf: "flex-start",
        } as unknown as object)
      : undefined;
  const activeBeat = dailyLesson.beats[activeBeatIndex];
  const activeRegion = useMemo(
    () => getFocusRegionStyle(activeBeat.focusRegion),
    [activeBeat.focusRegion]
  );

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;
    const thresholds = dailyLesson.beats.map((_, index) => 220 + index * 220);

    const nextIndex = thresholds.reduce((current, threshold, index) => {
      return y >= threshold ? index : current;
    }, 0);

    if (nextIndex !== activeBeatIndex) {
      setActiveBeatIndex(nextIndex);
    }
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          isWide && styles.scrollContentWide,
        ]}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        stickyHeaderIndices={isWide ? undefined : [0]}
      >
        <View
          style={[
            styles.heroShell,
            isWide && styles.heroShellWide,
            isWide && stickyWideStyle,
          ]}
        >
          <View style={styles.heroMeta}>
            <Text style={styles.eyebrow}>Daily Lesson</Text>
            <Text style={styles.title}>{dailyLesson.title}</Text>
            <Text style={styles.subtitle}>
              {dailyLesson.artistName} • {dailyLesson.yearLabel}
            </Text>
            <Text style={styles.summary}>{dailyLesson.summary}</Text>

            <View style={styles.metaPills}>
              <View style={styles.metaPill}>
                <Text style={styles.metaPillLabel}>Today</Text>
                <Text style={styles.metaPillValue}>{manifest.currentLessonId}</Text>
              </View>
              <View style={styles.metaPill}>
                <Text style={styles.metaPillLabel}>Medium</Text>
                <Text style={styles.metaPillValue}>{dailyLesson.medium}</Text>
              </View>
            </View>
          </View>

          <View style={styles.artFrame}>
            <Image
              source={dailyLesson.image.src}
              style={artworkStyle}
              contentFit="contain"
              transition={250}
              cachePolicy="memory-disk"
            />
            {showOverlay ? (
              <ArtworkFocusOverlay
                title={activeBeat.title}
                region={activeRegion}
                shape={activeBeat.focusRegion.shape}
              />
            ) : null}
          </View>

          <View style={styles.activeFocusCard}>
            <Text style={styles.activeFocusEyebrow}>
              Guided Looking • Stop {activeBeatIndex + 1}
            </Text>
            <Text style={styles.activeFocusTitle}>{activeBeat.title}</Text>
            <Text style={styles.activeFocusBody}>{activeBeat.body}</Text>
          </View>
        </View>

        <View style={[styles.lessonColumn, isWide && styles.lessonColumnWide]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionEyebrow}>Why this work</Text>
            <Text style={styles.sectionBody}>{dailyLesson.context}</Text>
          </View>

          <ConvexStatusBanner connected={convexConnected} />

          <View style={styles.progressRow}>
            {dailyLesson.beats.map((beat, index) => (
              <Pressable
                key={beat.id}
                onPress={() => setActiveBeatIndex(index)}
                style={[
                  styles.progressPill,
                  index === activeBeatIndex && styles.progressPillActive,
                ]}
              >
                <Text
                  style={[
                    styles.progressPillText,
                    index === activeBeatIndex && styles.progressPillTextActive,
                  ]}
                >
                  {index + 1}
                </Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Focus overlay</Text>
            <Pressable onPress={() => setShowOverlay((value) => !value)}>
              <Text style={styles.toggleAction}>
                {showOverlay ? "Hide" : "Show"}
              </Text>
            </Pressable>
          </View>

          {dailyLesson.beats.map((beat, index) => (
            <BeatCard
              key={beat.id}
              beat={beat}
              index={index}
              isActive={index === activeBeatIndex}
              onPress={() => setActiveBeatIndex(index)}
            />
          ))}

          <View style={styles.reflectionCard}>
            <Text style={styles.reflectionEyebrow}>Look again</Text>
            <Text style={styles.reflectionPrompt}>
              {dailyLesson.reflectionPrompt}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f4efe6",
  },
  scrollContent: {
    paddingBottom: 72,
  },
  scrollContentWide: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 32,
    paddingHorizontal: 36,
    paddingTop: 36,
  },
  heroShell: {
    backgroundColor: "#f4efe6",
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 24,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#c8b9a4",
  },
  heroShellWide: {
    width: "48%",
    borderBottomWidth: 0,
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  heroMeta: {
    gap: 8,
    marginBottom: 18,
  },
  eyebrow: {
    fontSize: 13,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#7d4b31",
  },
  title: {
    fontSize: 34,
    lineHeight: 40,
    color: "#1f1b18",
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 16,
    color: "#6b5f52",
  },
  summary: {
    fontSize: 17,
    lineHeight: 26,
    color: "#332c26",
  },
  metaPills: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
    marginTop: 8,
    flexWrap: "wrap",
  },
  metaPill: {
    backgroundColor: "#efe6d9",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#d6c8b4",
    gap: 3,
  },
  metaPillLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    color: "#8f806f",
  },
  metaPillValue: {
    fontSize: 13,
    color: "#5a4f45",
    maxWidth: 200,
  },
  artFrame: {
    backgroundColor: "#e7ddce",
    borderRadius: 28,
    padding: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#cabaa5",
  },
  activeFocusCard: {
    marginTop: 16,
    backgroundColor: "#fbf7f0",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#d8cbb8",
    padding: 18,
    gap: 8,
  },
  activeFocusEyebrow: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1.7,
    color: "#916f56",
  },
  activeFocusTitle: {
    fontSize: 22,
    lineHeight: 28,
    color: "#241d18",
    fontWeight: "700",
  },
  activeFocusBody: {
    fontSize: 15,
    lineHeight: 24,
    color: "#3b322b",
  },
  lessonColumn: {
    paddingHorizontal: 20,
    paddingTop: 28,
    gap: 18,
  },
  lessonColumnWide: {
    width: "46%",
    paddingHorizontal: 0,
    paddingTop: 18,
    maxWidth: 620,
  },
  sectionHeader: {
    gap: 8,
    marginBottom: 8,
  },
  sectionEyebrow: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1.7,
    color: "#916f56",
  },
  sectionBody: {
    fontSize: 16,
    lineHeight: 26,
    color: "#342c26",
  },
  progressRow: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    marginBottom: 4,
  },
  progressPill: {
    width: 36,
    height: 36,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#d6c8b4",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fbf8f2",
  },
  progressPillActive: {
    backgroundColor: "#7d4b31",
    borderColor: "#7d4b31",
  },
  progressPillText: {
    color: "#7a6b5e",
    fontSize: 14,
    fontWeight: "700",
  },
  progressPillTextActive: {
    color: "#fff9f1",
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  toggleLabel: {
    fontSize: 14,
    color: "#6b5f52",
  },
  toggleAction: {
    fontSize: 14,
    color: "#7d4b31",
    fontWeight: "600",
  },
  reflectionCard: {
    backgroundColor: "#2f4f4a",
    borderRadius: 24,
    padding: 22,
    gap: 8,
    marginTop: 8,
  },
  reflectionEyebrow: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1.7,
    color: "#c8ddd7",
  },
  reflectionPrompt: {
    fontSize: 17,
    lineHeight: 26,
    color: "#f4f2ee",
  },
});
