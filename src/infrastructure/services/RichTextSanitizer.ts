import sanitizeHtml from "sanitize-html";
import { toRichHtml } from "@/lib/rich-text";

const COLOR = [/^#[0-9a-f]{3,8}$/i, /^rgba?\([\d\s.,%]+\)$/i];

/** Keeps only the formatting the admin editor can produce. */
export function sanitizeRichText(value: string): string {
    return sanitizeHtml(toRichHtml(value), {
        allowedTags: [
            "p", "br", "strong", "b", "em", "i", "u", "s", "del",
            "h2", "h3", "h4", "ul", "ol", "li", "blockquote",
            "a", "span", "mark", "code", "pre", "hr",
        ],
        allowedAttributes: {
            a: ["href", "target", "rel"],
            span: ["style"],
            mark: ["style", "data-color"],
            p: ["style"],
            h2: ["style"],
            h3: ["style"],
            h4: ["style"],
            ol: ["start"],
        },
        allowedStyles: {
            "*": {
                "color": COLOR,
                "background-color": COLOR,
                "text-align": [/^(left|right|center|justify)$/],
            },
        },
        allowedSchemes: ["http", "https", "mailto", "tel"],
        transformTags: {
            a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer nofollow" }),
        },
    });
}
