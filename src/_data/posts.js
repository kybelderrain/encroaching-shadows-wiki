import { Agent } from "undici";

const DEFAULT_WP_POSTS =
  "https://bumblefucks-unite.local/wp-json/wp/v2/posts";

export default async function () {
  const url = process.env.WP_REST_URL || DEFAULT_WP_POSTS;
  const insecure =
    process.env.WP_INSECURE_TLS === "1" && url.startsWith("https:");
  const fetchOpts = insecure
    ? {
        dispatcher: new Agent({ connect: { rejectUnauthorized: false } }),
      }
    : {};

  if (insecure) {
    console.warn("[posts.js] WP_INSECURE_TLS=1 (dev only — TLS not verified)");
  }

  try {
    const res = await fetch(url, fetchOpts);
    if (!res.ok) {
      console.warn(`[posts.js] ${res.status} ${res.statusText} — ${url}`);
      return [];
    }
    const data = await res.json();
    const posts = Array.isArray(data) ? data : [];
    console.log(`[posts.js] ${posts.length} post(s) ← ${url}`);
    return posts;
  } catch (e) {
    console.warn(
      `[posts.js] ${e.cause?.message || e.message} — ${url} (use npm run dev:with-wp or WP_REST_URL)`
    );
    return [];
  }
}
