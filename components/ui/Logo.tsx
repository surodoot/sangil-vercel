import { companyInfo } from "@/data/company";
import { AnchorLink } from "@/components/ui/AnchorLink";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  onDark?: boolean;
}

/** A typographic wordmark until the company's official logo is supplied. */
export function Logo({ className, onDark }: LogoProps) {
  return (
    <AnchorLink
      href="/#top"
      className={cn(
        "inline-flex min-h-11 shrink-0 flex-col justify-center gap-1",
        onDark ? "text-white" : "text-[#172b3a]",
        className,
      )}
      aria-label={`${companyInfo.name} 홈으로 이동`}
    >
      <span className="whitespace-nowrap text-[19px] leading-none font-extrabold tracking-[-0.055em] lg:text-[21px]">
        {companyInfo.name}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "font-en text-[8px] leading-none font-semibold tracking-[0.16em] lg:text-[9px]",
          onDark ? "text-white/60" : "text-[#6b7b88]",
        )}
      >
        SANGIL ENGINEERING
      </span>
    </AnchorLink>
  );
}
