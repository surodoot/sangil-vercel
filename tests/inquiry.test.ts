import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { inquiryConfig } from "../data/company";
import {
  inquirySchema,
  inquiryPreviewSchema,
  validateFile,
  type InquiryFormValues,
} from "../lib/validation";
import { POST } from "../app/api/inquiry/route";

// Synthetic fixtures only. These checks make no network requests.
const validInquiry: InquiryFormValues = {
  companyName: "테스트 제조사",
  contactName: "테스트 담당자",
  phone: "010-0000-0000",
  email: "test@example.invalid",
  inquiryType: inquiryConfig.inquiryTypes[0],
  productName: "테스트 부품",
  material: "",
  quantity: "",
  desiredDeadline: "",
  message: "로컬 검증을 위한 테스트 문의입니다.",
  privacyConsent: true,
};

function errorFor(field: keyof InquiryFormValues, value: unknown) {
  const parsed = inquirySchema.safeParse({ ...validInquiry, [field]: value });
  assert.equal(parsed.success, false);
  if (parsed.success) throw new Error("Expected invalid fixture");
  return parsed.error.issues.find((issue) => issue.path[0] === field);
}

describe("inquiry field validation", () => {
  it("accepts all configured inquiry types", () => {
    for (const inquiryType of inquiryConfig.inquiryTypes) {
      assert.equal(
        inquirySchema.safeParse({ ...validInquiry, inquiryType }).success,
        true,
      );
    }
  });

  it("requires every original mandatory text field", () => {
    const requiredFields = [
      "companyName",
      "contactName",
      "phone",
      "email",
      "productName",
      "message",
    ] as const;
    for (const field of requiredFields) {
      assert.ok(errorFor(field, ""), `${field} must not be empty`);
      assert.ok(errorFor(field, "   "), `${field} must not be whitespace`);
    }
  });

  it("trims values before validating them", () => {
    const parsed = inquirySchema.parse({
      ...validInquiry,
      companyName: "  테스트 제조사  ",
      email: "  test@example.invalid  ",
    });
    assert.equal(parsed.companyName, "테스트 제조사");
    assert.equal(parsed.email, "test@example.invalid");
  });

  it("rejects malformed email addresses", () => {
    for (const email of ["test", "test@", "@example.com", "test example.com"]) {
      assert.equal(
        errorFor("email", email)?.message,
        "올바른 이메일 형식으로 입력해 주세요.",
      );
    }
  });

  it("accepts existing phone formats and rejects invalid characters or length", () => {
    for (const phone of ["010-0000-0000", "01000000000", "+82 10 00000000"]) {
      assert.equal(
        inquirySchema.safeParse({ ...validInquiry, phone }).success,
        true,
      );
    }
    for (const phone of [
      "010-ABCD-0000",
      "12345678",
      "1234567890123456",
      "010/0000/0000",
    ]) {
      assert.equal(
        errorFor("phone", phone)?.message,
        "올바른 연락처 형식으로 입력해 주세요.",
      );
    }
  });

  it("rejects inquiry types outside the configured enum", () => {
    assert.equal(
      errorFor("inquiryType", "알 수 없는 유형")?.message,
      "문의 유형을 선택해 주세요.",
    );
  });

  it("keeps material, quantity, and deadline optional", () => {
    const { material, quantity, desiredDeadline, ...withoutOptional } =
      validInquiry;
    assert.equal(inquirySchema.safeParse(withoutOptional).success, true);
    assert.equal(
      inquirySchema.safeParse({
        ...withoutOptional,
        material,
        quantity,
        desiredDeadline,
      }).success,
      true,
    );
    assert.equal(
      inquirySchema.safeParse({ ...validInquiry, quantity: "월 500개" })
        .success,
      true,
    );
  });

  it("enforces each original maximum text length", () => {
    const limits = {
      companyName: 100,
      contactName: 50,
      productName: 100,
      material: 100,
      quantity: 50,
      desiredDeadline: 50,
      message: 2000,
    } as const;
    for (const [field, limit] of Object.entries(limits)) {
      assert.equal(
        inquirySchema.safeParse({
          ...validInquiry,
          [field]: "가".repeat(limit),
        }).success,
        true,
      );
      assert.ok(
        errorFor(field as keyof InquiryFormValues, "가".repeat(limit + 1)),
      );
    }
  });

  it("retains consent for production while allowing a local preview without consent", () => {
    assert.equal(
      errorFor("privacyConsent", false)?.message,
      "개인정보 수집 및 이용에 동의해 주세요.",
    );
    assert.equal(
      inquiryPreviewSchema.safeParse({ ...validInquiry, privacyConsent: false })
        .success,
      true,
    );
    assert.equal(
      inquiryPreviewSchema.safeParse({
        ...validInquiry,
        privacyConsent: false,
        email: "invalid",
      }).success,
      false,
    );
  });
});

describe("local attachment validation", () => {
  it("accepts every configured extension regardless of suffix case", () => {
    for (const extension of inquiryConfig.allowedFileExtensions) {
      assert.equal(
        validateFile(new File(["test"], `drawing${extension}`)),
        null,
      );
      assert.equal(
        validateFile(new File(["test"], `drawing${extension.toUpperCase()}`)),
        null,
      );
    }
  });

  it("rejects unsupported, missing, and disguised file suffixes", () => {
    for (const filename of ["drawing.exe", "drawing", "drawing.pdf.exe"]) {
      assert.match(
        validateFile(new File(["test"], filename)) ?? "",
        /^지원하지 않는 파일 형식입니다\./,
      );
    }
  });

  it("accepts the size limit and rejects files one byte above it", () => {
    const limit = inquiryConfig.maxFileSizeMB * 1024 * 1024;
    assert.equal(
      validateFile(new File([new Uint8Array(limit)], "drawing.pdf")),
      null,
    );
    assert.equal(
      validateFile(new File([new Uint8Array(limit + 1)], "drawing.pdf")),
      `파일 크기는 ${inquiryConfig.maxFileSizeMB}MB 이하만 첨부할 수 있습니다.`,
    );
  });
});

describe("unconfigured inquiry service", () => {
  it("returns an explicit uncached 503 rather than an undelivered success", async () => {
    const response = await POST();
    assert.equal(response.status, 503);
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.deepEqual(await response.json(), {
      ok: false,
      code: "INQUIRY_SERVICE_UNAVAILABLE",
      message:
        "온라인 문의 접수 서비스를 준비 중입니다. 문의가 접수되지 않았습니다.",
    });
  });
});
