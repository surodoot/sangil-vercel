import { z } from "zod";
import { inquiryConfig } from "@/data/company";

const phoneRegex = /^[0-9\-+ ]{9,15}$/;

export const inquirySchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(1, "회사명을 입력해 주세요.")
    .max(100, "회사명은 100자 이내로 입력해 주세요."),
  contactName: z
    .string()
    .trim()
    .min(1, "담당자명을 입력해 주세요.")
    .max(50, "담당자명은 50자 이내로 입력해 주세요."),
  phone: z
    .string()
    .trim()
    .min(1, "연락처를 입력해 주세요.")
    .regex(phoneRegex, "올바른 연락처 형식으로 입력해 주세요."),
  email: z
    .string()
    .trim()
    .min(1, "이메일을 입력해 주세요.")
    .email("올바른 이메일 형식으로 입력해 주세요."),
  inquiryType: z.enum(inquiryConfig.inquiryTypes, {
    message: "문의 유형을 선택해 주세요.",
  }),
  productName: z
    .string()
    .trim()
    .min(1, "제품 또는 부품명을 입력해 주세요.")
    .max(100, "100자 이내로 입력해 주세요."),
  material: z.string().trim().max(100, "100자 이내로 입력해 주세요.").optional(),
  quantity: z.string().trim().max(50, "50자 이내로 입력해 주세요.").optional(),
  desiredDeadline: z.string().trim().max(50, "50자 이내로 입력해 주세요.").optional(),
  message: z
    .string()
    .trim()
    .min(1, "문의 내용을 입력해 주세요.")
    .max(2000, "문의 내용은 2000자 이내로 입력해 주세요."),
  privacyConsent: z
    .boolean()
    .refine((value) => value === true, { message: "개인정보 수집 및 이용에 동의해 주세요." }),
});

export type InquiryFormValues = z.infer<typeof inquirySchema>;

const ALLOWED_EXTENSIONS = inquiryConfig.allowedFileExtensions;
const MAX_FILE_SIZE_BYTES = inquiryConfig.maxFileSizeMB * 1024 * 1024;

export function validateFile(file: File): string | null {
  const ext = `.${file.name.split(".").pop()?.toLowerCase() ?? ""}`;
  if (!ALLOWED_EXTENSIONS.includes(ext as (typeof ALLOWED_EXTENSIONS)[number])) {
    return `지원하지 않는 파일 형식입니다. (허용: ${ALLOWED_EXTENSIONS.join(", ")})`;
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return `파일 크기는 ${inquiryConfig.maxFileSizeMB}MB 이하만 첨부할 수 있습니다.`;
  }
  return null;
}
