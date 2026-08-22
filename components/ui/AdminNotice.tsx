import { cn } from "@/lib/utils";

interface AdminNoticeProps {
  label: string;
  className?: string;
  inline?: boolean;
  /** 네이비 등 어두운 배경 위에 놓일 때 true */
  onDark?: boolean;
}

/**
 * 실제 데이터가 아직 입력되지 않은 항목을 개발 모드에서만 표시하는 배지입니다.
 * 프로덕션 빌드(npm run build && npm run start)에서는 렌더링되지 않으므로
 * 일반 방문자에게는 노출되지 않습니다.
 */
export function AdminNotice({ label, className, inline, onDark }: AdminNoticeProps) {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <span
      role="note"
      className={cn(
        "gap-1.5 rounded border border-dashed px-2 py-1 font-en text-caption font-medium",
        onDark
          ? "border-gold-soft/50 bg-gold-soft/10 text-gold-soft"
          : "border-sapphire/50 bg-sapphire/10 text-sapphire",
        inline ? "inline-flex" : "flex w-fit",
        className,
      )}
    >
      <span aria-hidden="true">⚠</span>
      관리자 확인 필요 · {label}
    </span>
  );
}
