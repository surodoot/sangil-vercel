"use client";

import { useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";
import { loadGsap } from "@/lib/gsap";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { businessSteps, businessCapabilities } from "@/data/company";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { StarField } from "@/components/motion/StarField";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { SectionEdgeFade } from "@/components/ui/SectionEdgeFade";
import { BusinessCard } from "./BusinessCard";
import { cn } from "@/lib/utils";

export function BusinessStory() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const isDesktop = useIsDesktop();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isDesktop || prefersReducedMotion) return;
    let cancelled = false;
    let revert: (() => void) | undefined;

    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;
      const pinEl = pinRef.current;
      const track = trackRef.current;
      if (!pinEl || !track) return;

      const ctx = gsap.context(() => {
        const distance = track.scrollWidth - pinEl.clientWidth;
        if (distance <= 0) return;

        ScrollTrigger.create({
          trigger: pinEl,
          start: "top top",
          end: () => `+=${distance}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            gsap.set(track, { x: -distance * self.progress });
            if (progressRef.current) {
              const step = Math.min(
                businessSteps.length,
                Math.max(1, Math.ceil(self.progress * (businessSteps.length + 1))),
              );
              progressRef.current.textContent = `0${step} / 0${businessSteps.length}`;
            }
          },
        });
      }, pinEl);

      revert = () => ctx.revert();
    });

    return () => {
      cancelled = true;
      revert?.();
    };
  }, [isDesktop, prefersReducedMotion]);

  return (
    <section id="business" className="bg-cosmos-gradient relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid-dark opacity-40" aria-hidden="true" />
      <StarField count={110} />
      <ParallaxLayer speed={22} className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-[8%] top-1/4 h-[26rem] w-[26rem] rounded-full bg-electric/16 blur-[130px]" />
      </ParallaxLayer>
      <ParallaxLayer speed={16} className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute bottom-24 right-[10%] h-80 w-80 rounded-full bg-violet/18 blur-[120px]" />
      </ParallaxLayer>
      <SectionEdgeFade position="top" color="#07040f" heightClassName="h-32 sm:h-48" />
      <SectionEdgeFade position="bottom" color="#07040f" heightClassName="h-32 sm:h-48" />

      {/* ---------- PC: 핀 고정 가로 스크롤 스토리 ---------- */}
      {/* "동작 줄이기" 환경에서는 GSAP 핀 효과를 사용하지 않으므로, 대신 네이티브
          가로 스크롤로 모든 카드에 접근할 수 있도록 overflow를 전환합니다. */}
      <div
        ref={pinRef}
        tabIndex={prefersReducedMotion ? 0 : undefined}
        aria-label={prefersReducedMotion ? "사업 및 가공 영역 카드 목록, 화살표 키로 좌우 스크롤" : undefined}
        className={cn(
          "relative hidden h-screen lg:block",
          prefersReducedMotion
            ? "overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-sapphire"
            : "overflow-hidden",
        )}
      >
        <div className="pointer-events-none absolute inset-x-0 top-10 z-10 flex justify-between px-[6vw]">
          <p className="font-en text-sm font-semibold uppercase tracking-[0.18em] text-gold-soft">
            Our Business
          </p>
          {!prefersReducedMotion && (
            <span ref={progressRef} className="font-en text-sm text-platinum">
              01 / 0{businessSteps.length}
            </span>
          )}
        </div>

        <div ref={trackRef} className="flex h-full w-max items-center gap-8 px-[6vw] will-change-transform">
          <div className="flex h-[60vh] w-[46vw] shrink-0 flex-col justify-center">
            <h2 className="text-display-2 font-display font-bold text-on-dark">
              사업 및 가공
              <br />
              영역
            </h2>
            <p className="mt-6 max-w-md text-body-lg text-platinum">
              상담부터 검사·출하까지, 자동차용 신품 부품 제조 과정을 단계별로
              소개합니다. 스크롤하면 각 단계가 순서대로 이어집니다.
            </p>
            <div className="mt-8 flex items-center gap-2 text-platinum">
              <span className="font-en text-xs tracking-[0.2em]">SCROLL TO EXPLORE</span>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </div>
          </div>

          {businessSteps.map((step, index) => (
            <BusinessCard key={step.id} step={step} index={index} />
          ))}

          <div className="glass-panel-dark flex h-[56vh] w-[36vw] shrink-0 flex-col justify-center rounded-[28px] p-10">
            <h3 className="text-heading-2 font-display font-bold text-on-dark">
              가공 사양 안내
            </h3>
            <dl className="mt-6 space-y-4">
              {businessCapabilities.map((spec) => (
                <div key={spec.label} className="border-b border-line-on-dark pb-3">
                  <dt className="text-caption text-platinum">{spec.label}</dt>
                  <dd className="mt-1 text-body text-on-dark">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* ---------- 모바일: 세로형 카드 ---------- */}
      <div className="relative py-20 lg:hidden">
        <Container>
          <p className="font-en text-sm font-semibold uppercase tracking-[0.18em] text-gold-soft">
            Our Business
          </p>
          <h2 className="mt-3 text-display-2 font-display font-bold text-on-dark">
            사업 및 가공 영역
          </h2>
          <p className="mt-4 max-w-md text-body-lg text-platinum">
            상담부터 검사·출하까지, 자동차용 신품 부품 제조 과정을 단계별로
            소개합니다.
          </p>

          <div className="mt-10 space-y-5">
            {businessSteps.map((step) => (
              <Reveal key={step.id}>
                <div className="glass-panel-dark relative overflow-hidden rounded-[24px] p-7">
                  <span className="font-en text-4xl font-black text-outline-dark">{step.index}</span>
                  <h3 className="mt-4 text-heading-2 font-display font-bold text-on-dark">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-body text-platinum">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="glass-panel-dark mt-8 rounded-[24px] p-7">
            <h3 className="text-heading-2 font-display font-bold text-on-dark">가공 사양 안내</h3>
            <dl className="mt-5 space-y-4">
              {businessCapabilities.map((spec) => (
                <div key={spec.label} className="border-b border-line-on-dark pb-3">
                  <dt className="text-caption text-platinum">{spec.label}</dt>
                  <dd className="mt-1 text-body text-on-dark">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
