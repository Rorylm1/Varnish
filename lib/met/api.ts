import type { MetObject, MetSearchResponse } from "@/types/met";

const MET_API_BASE = "https://collectionapi.metmuseum.org/public/collection/v1";

export async function searchMetObjects(params: {
  q: string;
  isHighlight?: boolean;
  hasImages?: boolean;
  title?: boolean;
  departmentId?: number;
}) {
  const url = new URL(`${MET_API_BASE}/search`);
  url.searchParams.set("q", params.q);

  if (typeof params.isHighlight === "boolean") {
    url.searchParams.set("isHighlight", String(params.isHighlight));
  }

  if (typeof params.hasImages === "boolean") {
    url.searchParams.set("hasImages", String(params.hasImages));
  }

  if (typeof params.title === "boolean") {
    url.searchParams.set("title", String(params.title));
  }

  if (typeof params.departmentId === "number") {
    url.searchParams.set("departmentId", String(params.departmentId));
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Met search failed with status ${response.status}`);
  }

  return (await response.json()) as MetSearchResponse;
}

export async function getMetObject(objectId: number) {
  const response = await fetch(`${MET_API_BASE}/objects/${objectId}`);

  if (!response.ok) {
    throw new Error(
      `Met object fetch failed for ${objectId} with status ${response.status}`
    );
  }

  return (await response.json()) as MetObject;
}
