import { Wrench } from "lucide-react";
import { equipmentList } from "@/data/company";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EquipmentCard } from "./EquipmentCard";
export function Equipment() {
  return (
    <section
      id="equipment"
      className="section-space border-t border-line bg-ivory"
    >
      <Container>
        <SectionHeading
          eyebrow="03 / Equipment"
          title="생산을 뒷받침하는 설비"
          description="보유 설비와 가공 범위를 안내합니다."
        />
        {equipmentList.length > 0 ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {equipmentList.map((item) => (
              <EquipmentCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="mt-9 flex flex-col gap-5 rounded-xl border border-line bg-white p-6 sm:flex-row sm:items-center sm:p-8">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-mist text-sapphire">
              <Wrench
                className="h-6 w-6"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </div>
            <div>
              <p className="text-lg font-semibold text-heading">
                설비 상세 정보를 준비하고 있습니다.
              </p>
              <p className="mt-2 text-base leading-relaxed text-muted">
                실제 보유 설비 정보가 확정되는 대로 설비명과 가공 범위를
                안내하겠습니다.
              </p>
            </div>
            <span className="self-start whitespace-nowrap rounded-md border border-line bg-ivory px-3 py-1.5 text-xs font-medium text-muted sm:ml-auto sm:self-center">
              업데이트 예정
            </span>
          </div>
        )}
      </Container>
    </section>
  );
}
