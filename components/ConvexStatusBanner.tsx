import { StyleSheet, Text, View } from "react-native";

type ConvexStatusBannerProps = {
  connected: boolean;
};

export function ConvexStatusBanner({ connected }: ConvexStatusBannerProps) {
  return (
    <View
      style={[
        styles.banner,
        connected ? styles.bannerConnected : styles.bannerPending,
      ]}
    >
      <Text style={styles.title}>
        {connected ? "Convex connected" : "Convex not configured yet"}
      </Text>
      <Text style={styles.body}>
        {connected
          ? "The app is ready to move lesson data from local fixtures into Convex-backed queries."
          : "Add EXPO_PUBLIC_CONVEX_URL and run npx convex dev to connect a deployment and generate the typed Convex API."}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    borderRadius: 18,
    padding: 16,
    gap: 6,
    borderWidth: 1,
  },
  bannerConnected: {
    backgroundColor: "#e4efe9",
    borderColor: "#9db7aa",
  },
  bannerPending: {
    backgroundColor: "#fff8ec",
    borderColor: "#d9c4a4",
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2d2924",
  },
  body: {
    fontSize: 14,
    lineHeight: 21,
    color: "#4f473f",
  },
});
