import { NextResponse } from "next/server";
import { inquirySchema } from "@/lib/validation";

/**
 * ⚠️ 배포 전 반드시 확인하세요
 * 이 라우트는 현재 목업(mock) 엔드포인트입니다. 입력값을 검증만 하고
 * 실제로 이메일을 발송하거나, 데이터베이스에 저장하거나, 첨부파일을
 * 저장소에 업로드하지 않습니다. (요청 본문에도 파일의 실제 바이너리는
 * 포함되지 않으며, 파일명/크기/형식 메타데이터만 전달됩니다.)
 *
 * 실제 운영 전 아래 작업이 필요합니다.
 *   1) 이메일 발송 연동 (예: Resend, Nodemailer + SMTP)
 *   2) 첨부파일 보안 스토리지 연동 (예: S3, Vercel Blob) 및 바이러스 검사
 *   3) 문의 데이터 저장을 위한 DB 또는 CRM 연동
 *   4) 스팸 방지를 위한 CAPTCHA/레이트리밋 적용
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "입력값을 다시 확인해 주세요.", issues: parsed.error.issues },
      { status: 422 },
    );
  }

  console.warn(
    "[inquiry] 목업 엔드포인트로 문의가 수신되었습니다. 실제 이메일/DB 연동이 필요합니다.",
    { company: parsed.data.companyName, email: parsed.data.email },
  );

  return NextResponse.json({ ok: true });
}
