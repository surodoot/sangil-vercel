"use client";

import { useRef } from "react";
import { Paperclip, X, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { formatBytes, cn } from "@/lib/utils";
import { validateFile } from "@/lib/validation";
import { inquiryConfig } from "@/data/company";

export interface FileEntry {
  id: string;
  file: File;
  status: "pending" | "uploading" | "done" | "error";
  progress: number;
  error?: string;
}

interface InquiryFileUploaderProps {
  files: FileEntry[];
  onChange: (files: FileEntry[]) => void;
  disabled?: boolean;
}

export function InquiryFileUploader({ files, onChange, disabled }: InquiryFileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const atLimit = files.length >= inquiryConfig.maxFiles;

  const handleSelect = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const incoming = Array.from(fileList);
    const merged = [...files];

    for (const file of incoming) {
      if (merged.length >= inquiryConfig.maxFiles) break;
      const error = validateFile(file);
      merged.push({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        file,
        status: error ? "error" : "pending",
        progress: 0,
        error: error ?? undefined,
      });
    }
    onChange(merged);
    if (inputRef.current) inputRef.current.value = "";
  };

  const removeFile = (id: string) => {
    onChange(files.filter((entry) => entry.id !== id));
  };

  return (
    <div>
      <label
        htmlFor="inquiry-files"
        className={cn(
          "flex touch-target cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-line-strong bg-white/50 px-4 py-6 text-center transition-colors hover:border-gold/60",
          (disabled || atLimit) && "pointer-events-none opacity-50",
        )}
      >
        <Paperclip className="h-5 w-5 text-muted" aria-hidden="true" />
        <span className="text-body text-muted">
          파일을 선택하여 첨부해 주세요
        </span>
        <span className="text-caption text-muted">
          {inquiryConfig.allowedFileExtensions.join(", ")} · 개당 최대{" "}
          {inquiryConfig.maxFileSizeMB}MB · 최대 {inquiryConfig.maxFiles}개
        </span>
      </label>
      <input
        ref={inputRef}
        id="inquiry-files"
        name="attachments"
        type="file"
        multiple
        accept={inquiryConfig.allowedFileExtensions.join(",")}
        className="sr-only"
        disabled={disabled || atLimit}
        onChange={(event) => handleSelect(event.target.files)}
      />

      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((entry) => (
            <li
              key={entry.id}
              className={cn(
                "flex items-center gap-3 rounded-lg border px-3 py-2.5",
                entry.status === "error"
                  ? "border-[#B91C1C]/40 bg-[#B91C1C]/5"
                  : "border-line bg-white/60",
              )}
            >
              <span className="shrink-0" aria-hidden="true">
                {entry.status === "uploading" && <Loader2 className="h-4 w-4 animate-spin text-sapphire" />}
                {entry.status === "done" && <CheckCircle2 className="h-4 w-4 text-[#16a34a]" />}
                {entry.status === "error" && <AlertCircle className="h-4 w-4 text-[#B91C1C]" />}
                {entry.status === "pending" && <Paperclip className="h-4 w-4 text-muted" />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-body text-heading">{entry.file.name}</span>
                <span
                  className={cn(
                    "block text-caption",
                    entry.status === "error" ? "text-[#B91C1C]" : "text-muted",
                  )}
                >
                  {entry.error ?? formatBytes(entry.file.size)}
                </span>
                {entry.status === "uploading" && (
                  <span className="mt-1.5 block h-1 w-full overflow-hidden rounded-full bg-line-strong">
                    <span
                      className="block h-full rounded-full bg-gradient-to-r from-sapphire to-gold transition-[width] duration-200"
                      style={{ width: `${entry.progress}%` }}
                    />
                  </span>
                )}
              </span>
              <button
                type="button"
                onClick={() => removeFile(entry.id)}
                aria-label={`${entry.file.name} 첨부 삭제`}
                disabled={disabled}
                className="touch-target flex shrink-0 items-center justify-center text-muted hover:text-heading"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
