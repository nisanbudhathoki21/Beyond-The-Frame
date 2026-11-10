export const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
/** Prefix a file under /public with the site's base path (needed on github.io/<repo>). */
export const asset = (p: string) => `${BASE}/${p.replace(/^\/+/, "")}`;
