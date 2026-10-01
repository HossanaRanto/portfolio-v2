import { serveSeoFile } from "@/lib/seo-files";

// Read at build time in production; re-read on every request in dev
export const dynamic = "force-static";

export function GET() {
    return serveSeoFile("robots.txt", "text/plain; charset=utf-8");
}
