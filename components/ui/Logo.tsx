import Link from "next/link";
import { companyInfo } from "@/data/company";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** 네이비 등 어두운 배경 위에 놓일 때 true */
  onDark?: boolean;
}

/**
 * ⚠️ [회사 로고 입력]
 * 현재는 실제 로고 이미지가 없어 워드마크 텍스트 로고를 사용합니다.
 * 로고 파일이 준비되면 이 컴포넌트를 next/image 기반으로 교체하세요.
 */
export function Logo({ className, onDark }: LogoProps) {
  return (
    <Link
      href="#top"
      className={cn(
        "group inline-flex items-center gap-2 font-display text-lg font-bold tracking-tight sm:text-xl",
        onDark ? "text-on-dark" : "text-heading",
        className,
      )}
      aria-label={`${companyInfo.name} 홈으로 이동`}
    >
      <span
        aria-hidden="true"
        className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-gold/50 bg-navy text-[0.7rem] font-black text-on-dark"
      >
        SE
      </span>
      <span className="whitespace-nowrap">
        상일<span className="text-sapphire">엔지니어링</span>
      </span>
    </Link>
  );
}
