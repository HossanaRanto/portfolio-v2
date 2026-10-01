/**
 * Adds top/bottom white space on every printed page: browsers repeat a table's
 * thead/tfoot on each page, which @page margins can't do without breaking the
 * full-bleed sidebar. Has no effect on screen.
 */
export function PrintPageSpacing({ children }: { children: React.ReactNode }) {
    return (
        <table className="w-full border-collapse">
            <thead className="hidden print:table-header-group">
                <tr><td className="p-0"><div className="h-[12mm]" /></td></tr>
            </thead>
            <tbody>
                <tr><td className="p-0 align-top">{children}</td></tr>
            </tbody>
            <tfoot className="hidden print:table-footer-group">
                <tr><td className="p-0"><div className="h-[12mm]" /></td></tr>
            </tfoot>
        </table>
    );
}
