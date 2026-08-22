"use client";

import { useState } from "react";
import { Navigation, Copy, Check, Phone, Mail } from "lucide-react";
import { contactInfo, mapConfig } from "@/data/company";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AdminNotice } from "@/components/ui/AdminNotice";
import { Reveal } from "@/components/motion/Reveal";
import { isConfigured, formatPhoneHref } from "@/lib/utils";

export function LocationMap() {
  const [copied, setCopied] = useState(false);
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapConfig.lat},${mapConfig.lng}`;
  const embedUrl = `https://maps.google.com/maps?q=${mapConfig.lat},${mapConfig.lng}&z=${mapConfig.zoomLevel}&output=embed`;
  const emailTarget = contactInfo.quoteEmail ?? contactInfo.generalEmail;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(mapConfig.address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="location" className="relative bg-ivory py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow="Location" title="오시는 길" description={mapConfig.address} />

        <Reveal className="glass-panel mt-12 overflow-hidden rounded-[28px]">
          <div className="relative aspect-[4/3] w-full sm:aspect-[16/9]">
            <iframe
              src={embedUrl}
              title="상일엔지니어링 위치 지도"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 grayscale-[0.1]"
            />
          </div>

          <div className="flex flex-col gap-4 border-t border-line p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="font-en text-sm text-muted">ADDRESS</p>
              <p className="mt-1 text-body-lg font-medium text-heading">{mapConfig.address}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-sweep touch-target relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-navy px-5 py-2.5 font-en text-sm font-semibold text-on-dark"
              >
                <span className="relative z-[2] flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-gold-soft" aria-hidden="true" />
                  길찾기
                </span>
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="touch-target inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 font-en text-sm font-semibold text-heading transition-colors hover:border-gold/50 hover:text-sapphire"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-sapphire" aria-hidden="true" />
                ) : (
                  <Copy className="h-4 w-4" aria-hidden="true" />
                )}
                <span aria-live="polite">{copied ? "복사됨" : "주소 복사"}</span>
              </button>

              {isConfigured(contactInfo.phone) && (
                <a
                  href={formatPhoneHref(contactInfo.phone)}
                  className="touch-target inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 font-en text-sm font-semibold text-heading transition-colors hover:border-gold/50 hover:text-sapphire"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  전화 문의
                </a>
              )}

              {isConfigured(emailTarget) && (
                <a
                  href={`mailto:${emailTarget}`}
                  className="touch-target inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 font-en text-sm font-semibold text-heading transition-colors hover:border-gold/50 hover:text-sapphire"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  이메일 문의
                </a>
              )}
            </div>
          </div>
        </Reveal>

        <AdminNotice className="mt-4" label="지도 좌표 확인 필요 (data/company.ts의 mapConfig - 현재 값은 근사 좌표입니다)" />
      </Container>
    </section>
  );
}
