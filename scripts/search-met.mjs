const query = process.argv.slice(2).join(" ").trim();

if (!query) {
  console.error("Usage: npm run met:search -- \"search term\"");
  process.exit(1);
}

const url = new URL("https://collectionapi.metmuseum.org/public/collection/v1/search");
url.searchParams.set("q", query);
url.searchParams.set("hasImages", "true");
url.searchParams.set("isHighlight", "true");

const response = await fetch(url);

if (!response.ok) {
  console.error(`Met search failed with status ${response.status}`);
  process.exit(1);
}

const data = await response.json();

console.log(JSON.stringify(data, null, 2));
