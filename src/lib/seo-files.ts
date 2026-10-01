import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Serves a file written by `npm run seo:generate` at the project root
 * (sitemap.xml, robots.txt). Responds 404 until the file is generated.
 */
export async function serveSeoFile(fileName: string, contentType: string): Promise<Response> {
    try {
        const body = await readFile(join(process.cwd(), fileName), "utf8");
        return new Response(body, { headers: { "Content-Type": contentType } });
    } catch {
        return new Response(`${fileName} not generated yet: run \`npm run seo:generate\`.\n`, {
            status: 404,
            headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
    }
}
