import { createClient } from "@sanity/client";

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: "2026-06-16",
    token: process.env.SANITY_API_WRITE_TOKEN,
    useCdn: false,
});

const ASSET_ID = "image-325bdf94f15a2409a7cbc8c6f4cdbf0ac22e87d1-1400x500-png";

await client.delete(ASSET_ID);
console.log("Deleted", ASSET_ID);


