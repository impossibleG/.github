import { access, copyFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const workspaceFlag = process.argv.indexOf("--workspace");
const workspace = workspaceFlag >= 0 ? path.resolve(process.argv[workspaceFlag + 1]) : path.dirname(root);
const manifest = JSON.parse(await readFile(path.join(root, "brand", "manifest.json"), "utf8"));

for (const service of manifest.services) {
  const source = path.join(root, "brand", "services", service.slug);
  const checkout = path.join(workspace, service.localDirectory);
  try {
    await access(checkout);
  } catch {
    console.error(`missing ${checkout}; clone ${service.repository} there or pass --workspace`);
    process.exitCode = 1;
    continue;
  }
  const destination = path.join(checkout, "docs", "assets");
  const extension = service.slug === "embedding" || service.slug === "voice" ? "gif" : "png";
  await mkdir(destination, { recursive: true });
  await copyFile(
    path.join(source, `impossible-${service.slug}-scene.${extension}`),
    path.join(destination, `impossible-${service.slug}-scene.${extension}`)
  );
  await copyFile(path.join(source, "social-preview.png"), path.join(destination, "social-preview.png"));
  console.log(`updated ${service.localDirectory}`);
}
