import { NextResponse } from "next/server";

/**
 * Online inquiries are unavailable until real delivery, secure attachment
 * storage, a privacy notice and abuse protection are configured. Never return
 * a success response for undelivered inquiries or log submitted personal data.
 * The client currently validates inputs locally and does not call this route.
 */
export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      code: "INQUIRY_SERVICE_UNAVAILABLE",
      message:
        "온라인 문의 접수 서비스를 준비 중입니다. 문의가 접수되지 않았습니다.",
    },
    { status: 503, headers: { "Cache-Control": "no-store" } },
  );
}
