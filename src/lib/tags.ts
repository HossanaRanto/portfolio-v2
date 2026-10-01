/** Splits a comma-separated input into trimmed, non-empty tags. */
export function parseTags(input: string | null | undefined): string[] {
    return (input || "").split(",").map(t => t.trim()).filter(Boolean);
}

/**
 * Effective tags of an item: its stack (technologies) first, then the custom
 * tags, without case-insensitive duplicates.
 */
export function mergeTags(...lists: (string[] | null | undefined)[]): string[] {
    const seen = new Set<string>();
    const merged: string[] = [];
    for (const tag of lists.flatMap(list => list || [])) {
        const key = tag.trim().toLowerCase();
        if (key && !seen.has(key)) {
            seen.add(key);
            merged.push(tag.trim());
        }
    }
    return merged;
}
