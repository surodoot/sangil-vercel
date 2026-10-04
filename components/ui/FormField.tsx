import type { ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}

export function FormField({
  label,
  htmlFor,
  required,
  error,
  hint,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn("min-w-0", className)}>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-heading"
      >
        {label}
        {required && (
          <>
            <span className="ml-1 text-sapphire" aria-hidden="true">
              *
            </span>
            <span className="sr-only">(필수 입력)</span>
          </>
        )}
      </label>
      <div className="mt-2">{children}</div>
      {hint && (
        <p
          id={`${htmlFor}-hint`}
          className="mt-1.5 text-xs leading-relaxed text-muted"
        >
          {hint}
        </p>
      )}
      {error && (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="mt-1.5 flex items-start gap-1.5 text-xs font-medium leading-relaxed text-red-700"
        >
          <AlertCircle
            className="mt-0.5 h-3.5 w-3.5 shrink-0"
            aria-hidden="true"
          />
          {error}
        </p>
      )}
    </div>
  );
}

export const fieldInputClass =
  "min-h-12 w-full min-w-0 rounded-lg border bg-white px-3.5 py-3 text-[16px] leading-6 text-heading placeholder:text-muted transition-colors focus-visible:border-sapphire focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sapphire disabled:cursor-not-allowed disabled:opacity-50";

export function fieldBorderClass(hasError?: boolean) {
  return hasError
    ? "border-red-400"
    : "border-line-strong hover:border-sapphire/40";
}
