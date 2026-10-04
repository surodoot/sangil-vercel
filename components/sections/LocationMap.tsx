"use client";
import { useEffect, useRef, useState } from "react";
import { MapPin, Copy, Check, ExternalLink } from "lucide-react";
import { companyInfo, mapConfig } from "@/data/company";
import { Container } from "@/components/ui/Container";

export function LocationMap() {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle",
  );
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  const handleCopy = async () => {
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(mapConfig.address);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
    timer.current = setTimeout(() => setCopyStatus("idle"), 4000);
  };
  // The configured coordinates are approximate. Use the verified address, never a false map pin.
  const searchUrl = `https://map.naver.com/p/search/${encodeURIComponent(mapConfig.address)}`;
  return (
    <section
      id="location"
      className="section-space border-t border-line bg-ivory"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-[.65fr_1.35fr] lg:gap-20">
          <div>
            <p className="section-kicker">Visit us</p>
            <h2 className="mt-4 text-heading-1 font-bold text-heading">
              오시는 길
            </h2>
            <p className="mt-4 text-body text-muted">
              방문 전 주소를 확인해 주세요.
            </p>
          </div>
          <div className="rounded-xl border border-line bg-white p-6 sm:p-9">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-mist text-sapphire">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm text-muted">
                  {companyInfo.name} · 우편번호 {companyInfo.postalCode}
                </p>
                <p className="mt-2 text-lg font-semibold leading-relaxed text-heading">
                  {mapConfig.address}
                </p>
              </div>
            </div>
            <div className="mt-7 flex flex-wrap gap-3 border-t border-line pt-6">
              <a
                href={searchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target inline-flex items-center gap-2 rounded-lg bg-navy px-5 py-3 text-sm font-semibold text-white hover:bg-navy-deep"
              >
                네이버 지도에서 보기
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only"> (새 창)</span>
              </a>
              <button
                type="button"
                onClick={handleCopy}
                className="touch-target inline-flex items-center gap-2 rounded-lg border border-line-strong px-5 py-3 text-sm font-semibold text-heading hover:border-sapphire"
              >
                {copyStatus === "copied" ? (
                  <Check className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Copy className="h-4 w-4" aria-hidden="true" />
                )}
                주소 복사
              </button>
            </div>
            <p className="mt-3 min-h-5 text-sm text-muted" role="status">
              {copyStatus === "copied"
                ? "주소를 복사했습니다."
                : copyStatus === "error"
                  ? "복사하지 못했습니다. 위 주소를 직접 선택해 복사해 주세요."
                  : ""}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
