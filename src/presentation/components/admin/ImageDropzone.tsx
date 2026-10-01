"use client"

import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";

interface ImageDropzoneProps {
    /** Currently displayed image (existing URL or a preset URL). */
    value?: string | null;
    /** Called with the dropped/selected file and a local preview URL. */
    onFile: (file: File, previewUrl: string) => void;
    onClear?: () => void;
    label?: string;
    className?: string;
    previewClassName?: string;
}

export function ImageDropzone({ value, onFile, onClear, label = "Drop an image here, or click to browse", className = "", previewClassName = "w-16 h-16 object-contain" }: ImageDropzoneProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = useState(false);

    function handleFile(file?: File | null) {
        if (!file || !file.type.startsWith("image/")) return;
        onFile(file, URL.createObjectURL(file));
    }

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                handleFile(e.dataTransfer.files?.[0]);
            }}
            className={`relative flex flex-col items-center justify-center gap-3 p-6 rounded-lg border-2 border-dashed cursor-pointer transition-colors ${
                dragging
                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                    : "border-zinc-300 dark:border-zinc-700 hover:border-indigo-400"
            } ${className}`}
        >
            {value ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={value} alt="Preview" className={previewClassName} />
            ) : (
                <Upload className="w-8 h-8 text-zinc-400" />
            )}
            <p className="text-sm text-zinc-500 text-center">{label}</p>

            {value && onClear && (
                <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onClear(); }}
                    className="absolute top-2 right-2 p-1 rounded-md text-zinc-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    aria-label="Remove image"
                >
                    <X size={16} />
                </button>
            )}

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
            />
        </div>
    );
}
