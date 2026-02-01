import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static("dist"));

// Proxy API calls to NHL API
app.get("/api/nhl/*", async (req, res) => {
  try {
    const path = req.path.replace("/api/nhl", "");
    const url = `https://api-web.nhle.com/v1${path}`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "NHLStats/1.0",
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "NHL API error" });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Fallback to index.html for SPA routing
app.get("*", (req, res) => {
  res.sendFile(new URL("../dist/index.html", import.meta.url).pathname);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
