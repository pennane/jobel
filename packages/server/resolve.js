import { stat } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { resolve as pathResolve, dirname } from "node:path";

export async function resolve(specifier, context, nextResolve) {
  if (!specifier.startsWith(".") || !context.parentURL) {
    return nextResolve(specifier, context);
  }

  const parentPath = fileURLToPath(context.parentURL);
  const parentDir = dirname(parentPath);
  const target = pathResolve(parentDir, specifier);

  try {
    const s = await stat(target);
    if (s.isDirectory()) {
      const indexPath = pathResolve(target, "index.js");
      await stat(indexPath);
      return nextResolve(pathToFileURL(indexPath).href, context);
    }
  } catch {}

  try {
    await stat(target + ".js");
    return nextResolve(pathToFileURL(target + ".js").href, context);
  } catch {}

  return nextResolve(specifier, context);
}
