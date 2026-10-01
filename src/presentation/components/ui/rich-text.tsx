import { RICH_TEXT_CLASSES, toRichHtml } from "@/lib/rich-text";

/** Renders rich-text HTML that was sanitized when it was saved. */
export function RichText({ html, className = "" }: { html?: string | null; className?: string }) {
    return (
        <div
            className={`${RICH_TEXT_CLASSES} ${className}`}
            dangerouslySetInnerHTML={{ __html: toRichHtml(html) }}
        />
    );
}
