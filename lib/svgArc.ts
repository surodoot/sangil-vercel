function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: Number((cx + r * Math.cos(angleRad)).toFixed(2)),
    y: Number((cy + r * Math.sin(angleRad)).toFixed(2)),
  };
}

/** 원형 다이어그램의 부분 호(arc)를 그리기 위한 SVG path d 문자열을 생성합니다. */
export function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}
