import { createClient } from "@sanity/client";
import fs from "node:fs";

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: "2026-06-16",
    token: process.env.SANITY_API_WRITE_TOKEN,
    useCdn: false,
});

const asset = await client.assets.upload(
    "image",
    fs.createReadStream("public/static/img/icon/Google_favicon.webp"),
    { filename: "Google_favicon.webp" }
);

console.log("\nAsset URL:\n" + asset.url + "\n");

// node --env-file=.env.local scripts/upload-images.mjs