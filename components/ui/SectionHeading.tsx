import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  /** 네이비 등 어두운 배경 섹션(AI 견적 모델 등)에 놓일 때 true */
  onDark?: boolean;
  className?: string;
  as?: "h2" | "h3";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  onDark = false,
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {eyebrow && (
        <p
          className={cn(
            "section-kicker",
            onDark ? "!text-[#aac7ff]" : "text-sapphire",
          )}
        >
          {eyebrow}
        </p>
      )}
      <Tag
        className={cn(
          "mt-3 text-heading-1 font-display font-bold",
          onDark ? "text-on-dark" : "text-heading",
        )}
      >
        {title}
      </Tag>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-body-lg",
            align === "center" && "mx-auto",
            onDark ? "text-platinum" : "text-body",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
