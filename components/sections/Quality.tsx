import { Check, FileCheck2 } from "lucide-react";
import { qualityAreas, certifications } from "@/data/company";
import { Container } from "@/components/ui/Container";
export function Quality() {
  return (
    <section id="quality" className="section-space bg-navy text-white">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_.85fr] lg:gap-24">
          <div>
            <p className="section-kicker !text-[#aac7ff]">
              04 / Quality management
            </p>
            <h2 className="mt-5 text-heading-1 font-bold">
              품질은 모든 과정에서
              <br />
              만들어집니다.
            </h2>
            <p className="mt-6 max-w-lg text-body-lg text-platinum">
              소재의 확인부터 출하 전 최종 점검까지.
              <br />각 공정에서 제품의 상태와 사양을 살피는 것을 기본으로
              생각합니다.
            </p>
            <div className="mt-10 border-l-2 border-[#779eff] pl-5 text-sm leading-relaxed text-platinum">
              PRECISION IN THE DETAILS.
              <br />
              CONSISTENCY THROUGH THE PROCESS.
            </div>
          </div>
          <ol className="divide-y divide-white/20 border-y border-white/20">
            {qualityAreas.map((area, index) => (
              <li key={area.id} className="flex gap-4 py-6">
                <span className="text-sm text-[#aac7ff]">0{index + 1}</span>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{area.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-platinum">
                    {area.description}
                  </p>
                </div>
                <Check
                  className="mt-1 h-5 w-5 shrink-0 text-[#aac7ff]"
                  aria-hidden="true"
                />
              </li>
            ))}
          </ol>
        </div>
        {certifications.length > 0 && (
          <div className="mt-12 grid gap-4 border-t border-white/20 pt-8 sm:grid-cols-2">
            {certifications.map((cert) => (
              <a
                key={cert.id}
                href={cert.fileUrl ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border border-white/20 p-5"
              >
                <FileCheck2 aria-hidden="true" className="h-6 w-6" />
                <span>
                  {cert.name}
                  {cert.issuedBy && (
                    <span className="block text-sm text-platinum">
                      {cert.issuedBy}
                    </span>
                  )}
                </span>
              </a>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
