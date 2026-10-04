"use client";

import { useRef, useState } from "react";
import { Paperclip, X, AlertCircle, Plus } from "lucide-react";
import { formatBytes, cn } from "@/lib/utils";
import { validateFile } from "@/lib/validation";
import { inquiryConfig } from "@/data/company";

export interface FileEntry {
  id: string;
  file: File;
  status: "ready" | "error";
  error?: string;
}

interface InquiryFileUploaderProps {
  files: FileEntry[];
  onChange: (files: FileEntry[]) => void;
  disabled?: boolean;
}

export function InquiryFileUploader({
  files,
  onChange,
  disabled,
}: InquiryFileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectionNotice, setSelectionNotice] = useState<string | null>(null);
  const atLimit = files.length >= inquiryConfig.maxFiles;

  const handleSelect = (fileList: FileList | null) => {
    if (!fileList?.length) return;
    const merged = [...files];
    let duplicateCount = 0;
    let overflowCount = 0;

    for (const file of Array.from(fileList)) {
      if (
        merged.some(
          (entry) =>
            entry.file.name === file.name &&
            entry.file.size === file.size &&
            entry.file.lastModified === file.lastModified,
        )
      ) {
        duplicateCount += 1;
        continue;
      }
      if (merged.length >= inquiryConfig.maxFiles) {
        overflowCount += 1;
        continue;
      }
      const error = validateFile(file);
      merged.push({
        id: crypto.randomUUID(),
        file,
        status: error ? "error" : "ready",
        error: error ?? undefined,
      });
    }

    setSelectionNotice(
      [
        overflowCount
          ? `최대 ${inquiryConfig.maxFiles}개까지 선택할 수 있습니다. 초과한 ${overflowCount}개는 추가하지 않았습니다.`
          : "",
        duplicateCount
          ? `이미 선택한 파일 ${duplicateCount}개는 중복 추가하지 않았습니다.`
          : "",
      ]
        .filter(Boolean)
        .join(" ") || null,
    );
    onChange(merged);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="min-w-0">
      <button
        id="inquiry-files-picker"
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={disabled || atLimit}
        aria-describedby="inquiry-files-limits inquiry-files-hint"
        className="flex min-h-16 w-full items-center gap-3 rounded-xl border border-dashed border-line-strong bg-ivory/60 px-4 py-4 text-left transition-colors hover:border-sapphire hover:bg-sapphire/5 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Plus className="h-5 w-5 shrink-0 text-sapphire" aria-hidden="true" />
        <span className="min-w-0 flex-1 text-sm font-medium text-heading">
          {atLimit
            ? `파일 ${inquiryConfig.maxFiles}개 선택됨`
            : "파일 선택하기"}
        </span>
        <span className="shrink-0 text-xs text-muted">
          {files.length}/{inquiryConfig.maxFiles}
        </span>
      </button>
      <input
        ref={inputRef}
        id="inquiry-files"
        name="attachments"
        type="file"
        multiple
        accept={inquiryConfig.allowedFileExtensions.join(",")}
        className="hidden"
        disabled={disabled || atLimit}
        onChange={(event) => handleSelect(event.target.files)}
      />
      <p
        id="inquiry-files-limits"
        className="mt-2 break-words text-xs leading-relaxed text-muted"
      >
        {inquiryConfig.allowedFileExtensions
          .map((extension) => extension.slice(1).toUpperCase())
          .join(", ")}{" "}
        · 개당 {inquiryConfig.maxFileSizeMB}MB · 최대 {inquiryConfig.maxFiles}개
      </p>
      <div role="status" aria-live="polite" aria-atomic="true">
        {selectionNotice && (
          <p className="mt-2 text-xs leading-relaxed text-body">
            {selectionNotice}
          </p>
        )}
      </div>

      {files.length > 0 && (
        <ul className="mt-3 space-y-2" aria-label="이 화면에서 선택한 파일">
          {files.map((entry) => (
            <li
              key={entry.id}
              className={cn(
                "flex min-w-0 items-center gap-3 rounded-xl border py-2 pl-3 pr-1",
                entry.status === "error"
                  ? "border-red-200 bg-red-50"
                  : "border-line bg-white",
              )}
            >
              {entry.status === "error" ? (
                <AlertCircle
                  className="h-4 w-4 shrink-0 text-red-700"
                  aria-hidden="true"
                />
              ) : (
                <Paperclip
                  className="h-4 w-4 shrink-0 text-sapphire"
                  aria-hidden="true"
                />
              )}
              <span className="min-w-0 flex-1">
                <span className="block break-all text-sm text-heading">
                  {entry.file.name}
                </span>
                <span
                  id={`inquiry-file-status-${entry.id}`}
                  className={cn(
                    "mt-0.5 block text-xs leading-relaxed",
                    entry.status === "error" ? "text-red-700" : "text-muted",
                  )}
                >
                  {entry.error ??
                    `${formatBytes(entry.file.size)} · 선택됨, 미전송`}
                </span>
              </span>
              <button
                type="button"
                onClick={() => {
                  onChange(files.filter((file) => file.id !== entry.id));
                  setSelectionNotice(null);
                }}
                id={`inquiry-file-remove-${entry.id}`}
                aria-label={`${entry.file.name} 선택 취소`}
                aria-describedby={`inquiry-file-status-${entry.id}`}
                disabled={disabled}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-ivory hover:text-heading disabled:opacity-50"
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
