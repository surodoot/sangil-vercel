import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { companyInfo } from "@/data/company";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "상일엔지니어링 - 어떤 주문이든, 약속한 기한 안에 완성합니다";

export default async function OpengraphImage() {
  const fontsDir = path.join(process.cwd(), "assets", "fonts");
  const [regular, bold] = await Promise.all([
    readFile(path.join(fontsDir, "Pretendard-Regular.otf")),
    readFile(path.join(fontsDir, "Pretendard-Bold.otf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#F7F5F0",
          backgroundImage: "linear-gradient(135deg, #FCFBF8 0%, #F7F5F0 55%, #E9EDF2 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -20,
            display: "flex",
            fontSize: 320,
            fontWeight: 700,
            color: "rgba(10,28,51,0.05)",
            letterSpacing: -4,
          }}
        >
          SE
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              width: 56,
              height: 56,
              borderRadius: 10,
              background: "#0B1F3A",
              border: "1px solid rgba(201,169,110,0.5)",
              color: "#F9F7F2",
              fontSize: 22,
              fontWeight: 700,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            SE
          </div>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: "#0A1C33" }}>
            {companyInfo.name}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 48,
            fontSize: 64,
            fontWeight: 700,
            color: "#0A1C33",
            lineHeight: 1.25,
          }}
        >
          <span>어떤 주문이든,</span>
          <span style={{ color: "#2457C5" }}>약속한 기한 안에 완성합니다.</span>
        </div>

        <div style={{ display: "flex", marginTop: 32, fontSize: 26, color: "#405168" }}>
          자동차용 신품 부품 제조 · 경기도 김포시
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Pretendard", data: regular, weight: 400, style: "normal" },
        { name: "Pretendard", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
