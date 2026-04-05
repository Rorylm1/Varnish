import type { PropsWithChildren, ReactNode } from "react";
import { ConvexProvider } from "convex/react";

import { getConvexClient } from "@/lib/convex";

export function AppProviders({ children }: PropsWithChildren) {
  const convex = getConvexClient();

  if (!convex) {
    return children as ReactNode;
  }

  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
