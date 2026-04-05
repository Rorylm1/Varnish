const objectId = process.argv[2];

if (!objectId) {
  console.error("Usage: npm run met:object -- <objectID>");
  process.exit(1);
}

const response = await fetch(
  `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`
);

if (!response.ok) {
  console.error(`Met object fetch failed with status ${response.status}`);
  process.exit(1);
}

const object = await response.json();

const normalized = {
  metObjectId: object.objectID,
  title: object.title,
  artistName: object.artistDisplayName || object.culture || "Unknown",
  yearLabel: object.objectDate || "",
  medium: object.medium || "",
  dimensions: object.dimensions || "",
  museumName: "The Metropolitan Museum of Art",
  museumLocation: "New York, NY",
  imageAlt: [object.artistDisplayName, object.title, object.objectDate]
    .filter(Boolean)
    .join(", "),
  source: {
    provider: "met",
    objectURL: object.objectURL,
    primaryImage: object.primaryImage || object.primaryImageSmall,
    primaryImageSmall: object.primaryImageSmall,
    isPublicDomain: object.isPublicDomain,
    creditLine: object.creditLine || "",
    repository: object.repository || "",
  },
  tags: object.tags?.map((tag) => tag.term) ?? [],
};

console.log(JSON.stringify(normalized, null, 2));
