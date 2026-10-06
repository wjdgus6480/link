"use server";

export type LinkMetadata = { title: string; description: string };

// Runs on the server because the browser can't read other origins' HTML. Stores nothing.
export async function getLinkMetadata(rawUrl: string): Promise<LinkMetadata> {
  const url = new URL(rawUrl);
  if (url.protocol !== "http:" && url.protocol !== "https:") throw new Error("Unsupported protocol");
  return fetchMetadata(url);
}

// Best-effort: falls back to the hostname if the page can't be fetched.
async function fetchMetadata(url: URL): Promise<LinkMetadata> {
  const fallback = { title: url.hostname, description: "" };
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(5000),
      headers: { "user-agent": "Mozilla/5.0 (compatible; LinkBot/1.0)" },
    });
    if (!res.ok || !res.headers.get("content-type")?.includes("text/html")) return fallback;

    const html = (await res.text()).slice(0, 200_000);
    const title = matchMeta(html, "og:title") ?? html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1];
    const description = matchMeta(html, "description") ?? matchMeta(html, "og:description");

    return {
      title: decodeEntities(title?.trim() || fallback.title),
      description: decodeEntities(description?.trim() ?? ""),
    };
  } catch {
    return fallback;
  }
}

function matchMeta(html: string, name: string): string | undefined {
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    const key = tag.match(/\b(?:name|property)\s*=\s*["']([^"']+)["']/i)?.[1];
    if (key?.toLowerCase() === name) return tag.match(/\bcontent\s*=\s*["']([^"']*)["']/i)?.[1];
  }
}

function decodeEntities(s: string): string {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}
