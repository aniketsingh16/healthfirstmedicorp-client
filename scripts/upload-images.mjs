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
    fs.createReadStream("public/static/img/hfmc.png"),
    { filename: "hfmc-logo.png" }
);

console.log("\nAsset URL:\n" + asset.url + "\n");
