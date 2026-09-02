import { copyFile, mkdir, rename } from "node:fs/promises";

await mkdir("dist/client", { recursive: true });
await mkdir("dist/server", { recursive: true });
await mkdir("dist/.openai", { recursive: true });
await rename("dist/index.html", "dist/client/index.html");
await rename("dist/assets", "dist/client/assets");
await copyFile("worker/index.js", "dist/server/index.js");
await copyFile(".openai/hosting.json", "dist/.openai/hosting.json");
