// Resolve public asset paths against the configured basePath (GH Pages subdir vs CF Pages root).
// next/image does NOT auto-prefix /public assets with basePath in static export — we do it ourselves.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(path: string): string {
  if (!path || path.startsWith("http") || path.startsWith("data:")) return path;
  if (!BASE_PATH) return path;
  if (path.startsWith(BASE_PATH + "/")) return path;
  if (path.startsWith("/")) return `${BASE_PATH}${path}`;
  return `${BASE_PATH}/${path}`;
}
