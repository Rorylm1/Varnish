import { ConvexReactClient } from "convex/react";

let client: ConvexReactClient | null = null;

export function getConvexUrl() {
  return process.env.EXPO_PUBLIC_CONVEX_URL;
}

export function getConvexClient() {
  const url = getConvexUrl();

  if (!url) {
    return null;
  }

  if (!client) {
    client = new ConvexReactClient(url);
  }

  return client;
}
