"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FileText, Palette, Printer } from "lucide-react";
import { CV_THEMES, CvLabels, CvStyle } from "./cv-config";

export function CvToolbar({ style, theme, labels }: { style: CvStyle; theme: string; labels: CvLabels }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    function update(key: string, value: string) {
        const params = new URLSearchParams(searchParams.toString());
        params.set(key, value);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }

    const tab = (value: CvStyle, label: string, Icon: typeof Palette) => (
        <button
            type="button"
            onClick={() => update('style', value)}
            aria-pressed={style === value}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                style === value
                    ? "bg-indigo-600 text-white"
                    : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800"
            }`}
        >
            <Icon size={16} /> {label}
        </button>
    );

    return (
        <div className="print:hidden flex flex-wrap items-center justify-center gap-4 mb-8">
            <div className="flex gap-1 p-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                {tab('colorful', labels.colorful, Palette)}
                {tab('simple', labels.simple, FileText)}
            </div>

            {style === 'colorful' && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <span className="text-xs font-medium text-zinc-500 mr-1">{labels.theme}</span>
                    {Object.entries(CV_THEMES).map(([key, t]) => (
                        <button
                            key={key}
                            type="button"
                            onClick={() => update('theme', key)}
                            title={t.name}
                            aria-label={t.name}
                            aria-pressed={theme === key}
                            className={`w-6 h-6 rounded-full transition-transform hover:scale-110 ${
                                theme === key ? "ring-2 ring-offset-2 ring-zinc-900 dark:ring-white dark:ring-offset-zinc-900" : ""
                            }`}
                            style={{ backgroundColor: t.primary }}
                        />
                    ))}
                </div>
            )}

            <button
                type="button"
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
                <Printer size={16} /> {labels.print}
            </button>
        </div>
    );
}
