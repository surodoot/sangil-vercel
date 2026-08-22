interface SectionEdgeFadeProps {
  /** 페이드가 시작되는 가장자리 */
  position: "top" | "bottom";
  /** 맞닿는 이웃 영역의 색상 (6자리 hex). 다크↔다크 경계에서는 --color-cosmos 값을 사용하세요. */
  color: string;
  /** 페이드 높이 Tailwind 클래스 (섹션 패딩과 비슷하거나 조금 더 크게 잡아도 됩니다) */
  heightClassName?: string;
}

/**
 * 서로 다른 배경(밝은 섹션 ↔ 우주 테마, 또는 우주 테마 섹션끼리)이 맞닿는
 * 경계를 길게 겹쳐 부드럽게 이어주는 그라데이션 오버레이입니다.
 * 앞쪽 35%는 이웃 색상으로 불투명하게 덮어 성운 글로우 등 어긋난 요소를
 * 가려주고, 나머지 구간에서 서서히 투명해지며 자연스럽게 사라집니다.
 */
export function SectionEdgeFade({
  position,
  color,
  heightClassName = "h-40 sm:h-56",
}: SectionEdgeFadeProps) {
  const direction = position === "top" ? "to bottom" : "to top";
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 z-[1] ${heightClassName} ${
        position === "top" ? "top-0" : "bottom-0"
      }`}
      style={{
        backgroundImage: `linear-gradient(${direction}, ${color} 0%, ${color} 35%, ${color}00 100%)`,
      }}
    />
  );
}
