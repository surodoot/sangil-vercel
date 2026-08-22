import { Wrench } from "lucide-react";
import { equipmentList } from "@/data/company";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AdminNotice } from "@/components/ui/AdminNotice";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { EquipmentCard } from "./EquipmentCard";

const BENTO_SPAN = [
  "sm:col-span-2 lg:col-span-2 lg:row-span-2",
  "",
  "",
  "sm:col-span-2 lg:col-span-1",
];

export function Equipment() {
  const hasEquipment = equipmentList.length > 0;

  return (
    <section id="equipment" className="relative bg-ivory py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Equipment"
          title="보유 설비"
          description="정밀가공에 사용되는 보유 설비 정보를 안내합니다."
        />

        {hasEquipment ? (
          <Reveal
            container
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:auto-rows-[15rem] lg:grid-cols-4"
          >
            {equipmentList.map((item, index) => (
              <RevealItem key={item.id} className={BENTO_SPAN[index % BENTO_SPAN.length]}>
                <EquipmentCard item={item} />
              </RevealItem>
            ))}
          </Reveal>
        ) : (
          <Reveal className="glass-panel mt-14 flex flex-col items-center gap-5 rounded-[28px] px-8 py-20 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-line-strong text-muted">
              <Wrench className="h-6 w-6" aria-hidden="true" />
            </div>
            <p className="text-heading-2 font-display font-bold text-heading">
              보유 설비 정보 준비 중입니다
            </p>
            <p className="max-w-lg text-body text-body">
              실제 보유 설비 정보가 확정되는 대로 설비명, 제조사, 가공 범위 등
              상세 정보를 안내해 드리겠습니다.
            </p>
            <AdminNotice label="보유 설비 정보 (data/company.ts의 equipmentList)" />
          </Reveal>
        )}
      </Container>
    </section>
  );
}
