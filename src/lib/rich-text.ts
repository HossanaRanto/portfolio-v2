// Helpers for rich-text (HTML) fields. Older records hold plain text, so every
// helper accepts both formats.

// Only tags the editor produces, so legacy text like "use <Component>" stays plain text
const HTML_PATTERN = /<\/?(p|br|h[1-6]|ul|ol|li|strong|em|b|i|u|s|del|span|a|mark|blockquote|code|pre|hr)(\s[^>]*)?\/?>/i;

export function isHtml(value: string): boolean {
    return HTML_PATTERN.test(value);
}

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

/** Returns HTML, converting legacy plain text into paragraphs. */
export function toRichHtml(value?: string | null): string {
    if (!value) return "";
    if (isHtml(value)) return value;
    return value
        .split(/\n+/)
        .map(line => line.trim())
        .filter(Boolean)
        .map(line => `<p>${escapeHtml(line)}</p>`)
        .join("");
}

/** Returns a single-line plain-text version, for previews and SEO metadata. */
export function toPlainText(value?: string | null): string {
    if (!value) return "";
    if (!isHtml(value)) return value.replace(/\s+/g, " ").trim();
    return value
        .replace(/<(br|\/p|\/li|\/h[1-6]|\/blockquote)\s*\/?>/gi, " ")
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, "&")
        .replace(/\s+/g, " ")
        .trim();
}

/** Typography for rendered rich text (used by the editor and the public pages). */
export const RICH_TEXT_CLASSES = [
    "[&_p]:my-2",
    "[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-5 [&_h2]:mb-2",
    "[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2",
    "[&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-6 [&_ol]:pl-6 [&_li]:my-1 [&_li>p]:my-0",
    "[&_blockquote]:border-l-4 [&_blockquote]:border-zinc-400 [&_blockquote]:pl-4 [&_blockquote]:italic",
    "[&_a]:underline [&_a]:text-indigo-500",
    "[&_mark]:rounded [&_mark]:px-0.5 [&_mark]:text-inherit",
    "[&_hr]:my-4 [&_hr]:border-zinc-400/40",
    "[&_code]:font-mono [&_code]:text-[0.9em]",
].join(" ");
