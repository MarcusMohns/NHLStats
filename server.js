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
app.use("/api/nhl/", async (req, res, next) => {
  try {
    // Ensure CORS headers are always present for proxied responses
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Requested-With",
    );

    // Handle preflight
    if (req.method === "OPTIONS") {
      return res.sendStatus(204);
    }
    // Get the full path from the original URL
    const apiPath = req.originalUrl.replace("/api/nhl", "");

    // Make sure we have the path
    if (!apiPath || apiPath === "" || apiPath === "/") {
      return res.status(400).json({ error: "No API path provided" });
    }

    const url = `https://api-web.nhle.com/v1${apiPath}`;

    console.log(`[PROXY] Request path: ${req.originalUrl}`);
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

    // Forward content-type and status from NHL API where possible
    const contentType =
      response.headers.get("content-type") || "application/json";
    const bodyText = await response.text();
    res.status(response.status).set("Content-Type", contentType).send(bodyText);
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
