/** Renders schema.org structured data. */
export function JsonLd({ data }: { data: object }) {
    return (
        <script
            type="application/ld+json"
            // "<" is escaped so content can't close the script tag
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
        />
    );
}
