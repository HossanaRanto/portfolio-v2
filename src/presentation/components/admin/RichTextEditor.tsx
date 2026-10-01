"use client"

import { useState } from "react";
import { EditorContent, useEditor, useEditorState, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Color, TextStyle } from "@tiptap/extension-text-style";
import { Highlight } from "@tiptap/extension-highlight";
import { TextAlign } from "@tiptap/extension-text-align";
import {
    AlignCenter, AlignLeft, AlignRight, Baseline, Bold, Highlighter, Italic, Link2, List,
    ListOrdered, Minus, Quote, Redo2, RemoveFormatting, Strikethrough, Underline, Undo2,
} from "lucide-react";
import { RICH_TEXT_CLASSES, toRichHtml } from "@/lib/rich-text";

const TEXT_COLORS = ["#18181b", "#71717a", "#dc2626", "#ea580c", "#ca8a04", "#16a34a", "#0891b2", "#2563eb", "#4f46e5", "#9333ea", "#db2777"];
const HIGHLIGHT_COLORS = ["#fef08a", "#bbf7d0", "#bae6fd", "#c7d2fe", "#fbcfe8", "#fed7aa"];

interface RichTextEditorProps {
    /** Form field name: the HTML is submitted through a hidden input. */
    name: string;
    defaultValue?: string;
    placeholder?: string;
}

export function RichTextEditor({ name, defaultValue, placeholder }: RichTextEditorProps) {
    const initial = toRichHtml(defaultValue);
    const [html, setHtml] = useState(initial);

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                heading: { levels: [2, 3] },
                link: { openOnClick: false, autolink: true, defaultProtocol: "https" },
            }),
            TextStyle,
            Color,
            Highlight.configure({ multicolor: true }),
            TextAlign.configure({ types: ["heading", "paragraph"] }),
        ],
        content: initial,
        editorProps: {
            attributes: {
                class: `min-h-[160px] px-3 py-2 focus:outline-none ${RICH_TEXT_CLASSES}`,
                ...(placeholder && { "aria-placeholder": placeholder }),
            },
        },
        onUpdate: ({ editor }) => setHtml(editor.isEmpty ? "" : editor.getHTML()),
    });

    return (
        <div className="rounded-md border border-zinc-300 dark:border-zinc-700 focus-within:ring-2 focus-within:ring-indigo-500/40">
            {editor && <Toolbar editor={editor} />}
            <EditorContent editor={editor} />
            <input type="hidden" name={name} value={html} />
        </div>
    );
}

function Toolbar({ editor }: { editor: Editor }) {
    const [palette, setPalette] = useState<"color" | "highlight" | null>(null);

    const state = useEditorState({
        editor,
        selector: ({ editor: e }) => ({
            block: e.isActive("heading", { level: 2 }) ? "h2" : e.isActive("heading", { level: 3 }) ? "h3" : "p",
            bold: e.isActive("bold"),
            italic: e.isActive("italic"),
            underline: e.isActive("underline"),
            strike: e.isActive("strike"),
            bulletList: e.isActive("bulletList"),
            orderedList: e.isActive("orderedList"),
            blockquote: e.isActive("blockquote"),
            link: e.isActive("link"),
            alignCenter: e.isActive({ textAlign: "center" }),
            alignRight: e.isActive({ textAlign: "right" }),
            color: (e.getAttributes("textStyle").color as string | undefined) || null,
            canUndo: e.can().undo(),
            canRedo: e.can().redo(),
        }),
    });

    const chain = () => editor.chain().focus();

    function setBlock(value: string) {
        if (value === "p") chain().setParagraph().run();
        else chain().setHeading({ level: value === "h2" ? 2 : 3 }).run();
    }

    function toggleLink() {
        if (state.link) {
            chain().extendMarkRange("link").unsetLink().run();
            return;
        }
        const url = window.prompt("Link URL", "https://");
        if (url && url !== "https://") chain().extendMarkRange("link").setLink({ href: url }).run();
    }

    return (
        <div className="relative flex flex-wrap items-center gap-0.5 p-1.5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 rounded-t-md">
            <select
                value={state.block}
                onChange={(e) => setBlock(e.target.value)}
                className="h-8 mr-1 px-2 text-sm rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                aria-label="Text style"
            >
                <option value="p">Paragraph</option>
                <option value="h2">Heading</option>
                <option value="h3">Subheading</option>
            </select>

            <Btn label="Bold" active={state.bold} onClick={() => chain().toggleBold().run()}><Bold size={16} /></Btn>
            <Btn label="Italic" active={state.italic} onClick={() => chain().toggleItalic().run()}><Italic size={16} /></Btn>
            <Btn label="Underline" active={state.underline} onClick={() => chain().toggleUnderline().run()}><Underline size={16} /></Btn>
            <Btn label="Strikethrough" active={state.strike} onClick={() => chain().toggleStrike().run()}><Strikethrough size={16} /></Btn>

            <Divider />

            <Btn label="Text color" active={palette === "color"} onClick={() => setPalette(p => p === "color" ? null : "color")}>
                <span className="flex flex-col items-center">
                    <Baseline size={16} />
                    <span className="block w-4 h-1 -mt-0.5 rounded-sm" style={{ backgroundColor: state.color || "currentColor" }} />
                </span>
            </Btn>
            <Btn label="Highlight" active={palette === "highlight"} onClick={() => setPalette(p => p === "highlight" ? null : "highlight")}>
                <Highlighter size={16} />
            </Btn>

            <Divider />

            <Btn label="Bulleted list" active={state.bulletList} onClick={() => chain().toggleBulletList().run()}><List size={16} /></Btn>
            <Btn label="Numbered list" active={state.orderedList} onClick={() => chain().toggleOrderedList().run()}><ListOrdered size={16} /></Btn>
            <Btn label="Quote" active={state.blockquote} onClick={() => chain().toggleBlockquote().run()}><Quote size={16} /></Btn>
            <Btn label="Divider line" onClick={() => chain().setHorizontalRule().run()}><Minus size={16} /></Btn>

            <Divider />

            <Btn label="Align left" active={!state.alignCenter && !state.alignRight} onClick={() => chain().setTextAlign("left").run()}><AlignLeft size={16} /></Btn>
            <Btn label="Align center" active={state.alignCenter} onClick={() => chain().setTextAlign("center").run()}><AlignCenter size={16} /></Btn>
            <Btn label="Align right" active={state.alignRight} onClick={() => chain().setTextAlign("right").run()}><AlignRight size={16} /></Btn>

            <Divider />

            <Btn label={state.link ? "Remove link" : "Add link"} active={state.link} onClick={toggleLink}><Link2 size={16} /></Btn>
            <Btn label="Clear formatting" onClick={() => chain().unsetAllMarks().clearNodes().run()}><RemoveFormatting size={16} /></Btn>

            <Divider />

            <Btn label="Undo" disabled={!state.canUndo} onClick={() => chain().undo().run()}><Undo2 size={16} /></Btn>
            <Btn label="Redo" disabled={!state.canRedo} onClick={() => chain().redo().run()}><Redo2 size={16} /></Btn>

            {palette && (
                <div className="absolute left-1.5 top-full mt-1 z-20 flex flex-wrap items-center gap-1.5 p-2 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-lg">
                    {(palette === "color" ? TEXT_COLORS : HIGHLIGHT_COLORS).map(c => (
                        <button
                            key={c}
                            type="button"
                            title={c}
                            aria-label={c}
                            onClick={() => {
                                if (palette === "color") chain().setColor(c).run();
                                else chain().setHighlight({ color: c }).run();
                                setPalette(null);
                            }}
                            className="w-6 h-6 rounded-full border border-zinc-300 dark:border-zinc-600 hover:scale-110 transition-transform"
                            style={{ backgroundColor: c }}
                        />
                    ))}
                    {palette === "color" && (
                        <input
                            type="color"
                            aria-label="Custom color"
                            onChange={(e) => chain().setColor(e.target.value).run()}
                            className="w-7 h-7 rounded border border-zinc-300 dark:border-zinc-600 bg-transparent cursor-pointer"
                        />
                    )}
                    <button
                        type="button"
                        onClick={() => {
                            if (palette === "color") chain().unsetColor().run();
                            else chain().unsetHighlight().run();
                            setPalette(null);
                        }}
                        className="px-2 h-6 text-xs rounded border border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                        Reset
                    </button>
                </div>
            )}
        </div>
    );
}

function Btn({ label, active, disabled, onClick, children }: {
    label: string;
    active?: boolean;
    disabled?: boolean;
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            title={label}
            aria-label={label}
            aria-pressed={active}
            disabled={disabled}
            onClick={onClick}
            className={`h-8 w-8 flex items-center justify-center rounded transition-colors disabled:opacity-30 ${
                active
                    ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
                    : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800"
            }`}
        >
            {children}
        </button>
    );
}

function Divider() {
    return <span className="w-px h-5 mx-1 bg-zinc-300 dark:bg-zinc-700" />;
}
