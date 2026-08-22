import { CheckCircle2, FileCheck2 } from "lucide-react";
import { qualityAreas, certifications } from "@/data/company";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { StarField } from "@/components/motion/StarField";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { SectionEdgeFade } from "@/components/ui/SectionEdgeFade";

export function Quality() {
  const hasCertifications = certifications.length > 0;

  return (
    <section id="quality" className="bg-cosmos-gradient relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid-dark opacity-40" aria-hidden="true" />
      <StarField count={90} />
      <ParallaxLayer speed={22} className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute right-[8%] top-1/4 h-96 w-96 rounded-full bg-turquoise/14 blur-[130px]" />
      </ParallaxLayer>
      <SectionEdgeFade position="top" color="#f8f7f4" />
      <SectionEdgeFade position="bottom" color="#f8f7f4" />

      <Container className="relative">
        <SectionHeading
          onDark
          eyebrow="Quality Management"
          title={
            <>
              품질은 마지막 검사가 아니라
              <br />
              모든 과정에서 만들어집니다.
            </>
          }
        />

        <Reveal container className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {qualityAreas.map((area, index) => (
            <RevealItem key={area.id} className="h-full">
              <div className="gold-trace glass-panel-dark relative h-full overflow-hidden rounded-[24px] p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-turquoise/35 bg-turquoise/10 text-turquoise">
                  <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                </div>
                <span className="mt-4 block font-en text-sm text-platinum">0{index + 1}</span>
                <h3 className="mt-1 text-heading-2 font-display font-bold text-on-dark">
                  {area.title}
                </h3>
                <p className="mt-2 text-body text-platinum">{area.description}</p>
              </div>
            </RevealItem>
          ))}
        </Reveal>

        {hasCertifications && (
          <Reveal className="mt-16 border-t border-line-on-dark pt-12">
            <h3 className="text-heading-2 font-display font-bold text-on-dark">
              보유 인증 및 시험성적서
            </h3>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {certifications.map((cert) => (
                <a
                  key={cert.id}
                  href={cert.fileUrl ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel-dark group flex items-center gap-3 rounded-[20px] p-5 transition-colors hover:border-gold/40"
                >
                  <FileCheck2 className="h-6 w-6 shrink-0 text-gold-soft" aria-hidden="true" />
                  <span>
                    <span className="block text-body font-semibold text-on-dark">
                      {cert.name}
                    </span>
                    {cert.issuedBy && (
                      <span className="block text-caption text-platinum">{cert.issuedBy}</span>
                    )}
                  </span>
                </a>
              ))}
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
