import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AppProviders } from "@/providers/AppProviders";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppProviders>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#f4efe6" },
            animation: "fade",
          }}
        />
      </AppProviders>
    </SafeAreaProvider>
  );
}
