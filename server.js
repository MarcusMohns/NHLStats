import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Debug middleware - log all requests
app.use((req, res, next) => {
  console.log(`[REQUEST] ${req.method} ${req.path}`);
  next();
});

// Proxy API calls to NHL API - MUST be before static middleware
app.get("/api/nhl/*", async (req, res) => {
  try {
    // Extract the path after /api/nhl/
    let apiPath = req.path.slice("/api/nhl".length);

    // Make sure we have the path
    if (!apiPath || apiPath === "") {
      return res.status(400).json({ error: "No API path provided" });
    }

    const url = `https://api-web.nhle.com/v1${apiPath}`;

    console.log(`[PROXY] Request path: ${req.path}`);
    console.log(`[PROXY] API path: ${apiPath}`);
    console.log(`[PROXY] Full URL: ${url}`);

    const response = await fetch(url, {
      headers: {
        "User-Agent": "NHLStats/1.0",
      },
    });

    console.log(`[PROXY] Response status: ${response.status}`);

    if (!response.ok) {
      console.error(`[PROXY] Error: ${response.status} ${response.statusText}`);
      return res
        .status(response.status)
        .json({ error: `NHL API error: ${response.statusText}` });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("[PROXY] Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Serve static files AFTER API routes
app.use(express.static("dist"));

// Fallback to index.html for SPA routing
app.get("*", (req, res) => {
  const indexPath = path.join(__dirname, "dist", "index.html");
  res.sendFile(indexPath);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
