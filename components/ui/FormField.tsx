import type { ReactNode } from "react";
import { AlertCircle } from "lucide-react";

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
    <div className={className}>
      <label htmlFor={htmlFor} className="block font-en text-sm font-semibold text-heading">
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
      {hint && !error && <p className="mt-1.5 text-caption text-muted">{hint}</p>}
      {error && (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="mt-1.5 flex items-center gap-1.5 text-caption font-medium text-[#B91C1C]"
        >
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

export const fieldInputClass =
  "w-full touch-target rounded-xl border bg-white/70 px-4 py-3 text-body text-heading placeholder:text-muted/70 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sapphire disabled:opacity-50";

export function fieldBorderClass(hasError?: boolean) {
  return hasError ? "border-[#B91C1C]/50" : "border-line-strong";
}
