import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(express.static("public"));

/**
 * YouTube Search API (server-side)
 * Body: { q: string, max?: number }
 * Return: { items: [{ id, title, channelTitle, thumbnail }] }
 */
app.post("/api/youtube/search", async (req, res) => {
  try {
    const { q, max = 9 } = req.body || {};
    if (!q) return res.status(400).json({ error: "q required" });

    const key = process.env.YOUTUBE_API_KEY;
    if (!key) return res.status(500).json({ error: "Missing YOUTUBE_API_KEY" });

    const params = new URLSearchParams({
      key,
      part: "snippet",
      type: "video",
      q,
      maxResults: String(Math.min(15, Math.max(1, +max || 9))),
      relevanceLanguage: "en",
      regionCode: "VN",
      videoEmbeddable: "true",
      safeSearch: "moderate"
    });

    const url = `https://www.googleapis.com/youtube/v3/search?${params.toString()}`;
    const r = await fetch(url);
    if (!r.ok) throw new Error(`YouTube responded ${r.status}`);
    const j = await r.json();

    const items =
      (j.items || [])
        .map(x => ({
          id: x?.id?.videoId,
          title: x?.snippet?.title,
          channelTitle: x?.snippet?.channelTitle,
          thumbnail: x?.snippet?.thumbnails?.medium?.url
                   || x?.snippet?.thumbnails?.default?.url
        }))
        .filter(x => x.id);

    res.json({ items });
  } catch (e) {
    console.error("[/api/youtube/search]", e);
    res.status(500).json({ error: "YouTube search failed" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Learning Library server: http://localhost:${port}`);
});
