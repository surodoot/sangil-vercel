"use client";

import { useState, type HTMLInputTypeAttribute } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, ChevronDown, ClipboardCheck, Info } from "lucide-react";
import { inquiryPreviewSchema, type InquiryFormValues } from "@/lib/validation";
import { inquiryConfig } from "@/data/company";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import {
  FormField,
  fieldInputClass,
  fieldBorderClass,
} from "@/components/ui/FormField";
import { InquiryFileUploader, type FileEntry } from "./InquiryFileUploader";
import { cn } from "@/lib/utils";

const DEFAULT_VALUES: InquiryFormValues = {
  companyName: "",
  contactName: "",
  phone: "",
  email: "",
  inquiryType: inquiryConfig.inquiryTypes[0],
  productName: "",
  material: "",
  quantity: "",
  desiredDeadline: "",
  message: "",
  privacyConsent: false,
};

type TextFieldName = Exclude<
  keyof InquiryFormValues,
  "privacyConsent" | "message" | "inquiryType"
>;

interface TextField {
  name: TextFieldName;
  label: string;
  type?: HTMLInputTypeAttribute;
  autoComplete?: string;
  placeholder?: string;
  hint?: string;
  maxLength?: number;
  required?: boolean;
}

const contactFields: TextField[] = [
  {
    name: "companyName",
    label: "회사명",
    autoComplete: "organization",
    maxLength: 100,
    required: true,
  },
  {
    name: "contactName",
    label: "담당자명",
    autoComplete: "name",
    maxLength: 50,
    required: true,
  },
  {
    name: "phone",
    label: "연락처",
    type: "tel",
    autoComplete: "tel",
    placeholder: "010-0000-0000",
    hint: "숫자와 하이픈(-)으로 입력해 주세요",
    required: true,
  },
  {
    name: "email",
    label: "이메일",
    type: "email",
    autoComplete: "email",
    placeholder: "name@company.com",
    required: true,
  },
];

const optionalFields: TextField[] = [
  { name: "material", label: "소재", maxLength: 100 },
  {
    name: "quantity",
    label: "예상 수량",
    placeholder: "예: 월 500개",
    maxLength: 50,
  },
  {
    name: "desiredDeadline",
    label: "희망 납기",
    placeholder: "예: 협의 후 결정",
    maxLength: 50,
  },
];

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquiryPreviewSchema),
    mode: "onTouched",
    defaultValues: DEFAULT_VALUES,
  });
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [reviewed, setReviewed] = useState(false);
  const [attachmentNotice, setAttachmentNotice] = useState<string | null>(null);

  // This is a local preview only. Do not send personal data or simulate uploads
  // until a real delivery/storage service and privacy notice are configured.
  const reviewInputs = () => {
    const invalidFile = files.find((entry) => entry.status === "error");
    if (invalidFile) {
      setAttachmentNotice(
        "파일 형식과 크기를 확인하거나 해당 파일을 삭제해 주세요.",
      );
      document.getElementById(`inquiry-file-remove-${invalidFile.id}`)?.focus();
      return;
    }
    setAttachmentNotice(null);
    setReviewed(true);
  };

  const renderTextField = (field: TextField) => {
    const error = errors[field.name]?.message;
    return (
      <FormField
        key={field.name}
        label={field.label}
        htmlFor={field.name}
        required={field.required}
        error={error}
        hint={field.hint}
      >
        <input
          id={field.name}
          type={field.type ?? "text"}
          autoComplete={field.autoComplete}
          inputMode={
            field.type === "tel"
              ? "tel"
              : field.type === "email"
                ? "email"
                : undefined
          }
          maxLength={field.maxLength}
          aria-required={field.required}
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${field.name}-error`
              : field.hint
                ? `${field.name}-hint`
                : undefined
          }
          placeholder={field.placeholder}
          className={cn(fieldInputClass, fieldBorderClass(!!error))}
          {...register(field.name)}
        />
      </FormField>
    );
  };

  return (
    <section id="contact" className="relative bg-ivory py-20 sm:py-28">
      <Container>
        <div className="grid items-start gap-8 lg:grid-cols-[0.8fr_1.5fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="Get a Quote"
              title={
                <>
                  견적 검토,
                  <br />
                  필요한 정보부터.
                </>
              }
              description="제품 정보와 요청 사항을 정리해 보세요. 가공 가능 여부와 견적 검토에 필요한 항목을 안내합니다."
            />
            <div
              className="mt-7 flex items-start gap-3 rounded-2xl border border-sapphire/15 bg-white p-5"
              id="inquiry-availability"
            >
              <Info
                className="mt-0.5 h-5 w-5 shrink-0 text-sapphire"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-semibold text-heading">
                  온라인 문의 접수 준비 중
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-body">
                  현재는 입력 내용만 확인할 수 있습니다. 작성한 내용과 선택한
                  파일은 전송되거나 저장되지 않습니다.
                </p>
              </div>
            </div>
            <p className="mt-5 hidden text-sm leading-relaxed text-muted lg:block">
              제품명, 소재, 수량과 도면을 함께 준비하면
              <br />더 구체적인 검토에 도움이 됩니다.
            </p>
          </Reveal>

          <Reveal>
            <form
              onSubmit={handleSubmit(reviewInputs)}
              onChangeCapture={() => setReviewed(false)}
              noValidate
              aria-label="견적 문의 입력 확인"
              aria-describedby="inquiry-availability"
              className="min-w-0 space-y-7 rounded-2xl border border-line bg-white p-5 sm:space-y-8 sm:rounded-3xl sm:p-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-5">
                <h3 className="text-lg font-semibold tracking-tight text-heading">
                  문의 내용 작성
                </h3>
                <span className="text-xs text-muted">
                  <span className="text-sapphire">*</span> 필수 입력
                </span>
              </div>

              <fieldset className="min-w-0">
                <legend className="mb-4 flex items-center gap-2.5 text-sm font-semibold text-heading">
                  <span className="font-en text-xs text-sapphire">01</span>{" "}
                  담당자 정보
                </legend>
                <div className="grid gap-5 sm:grid-cols-2">
                  {contactFields.map(renderTextField)}
                </div>
              </fieldset>

              <fieldset className="min-w-0 border-t border-line pt-6">
                <legend className="float-left mb-4 flex w-full items-center gap-2.5 text-sm font-semibold text-heading">
                  <span className="font-en text-xs text-sapphire">02</span>{" "}
                  제품과 요청 사항
                </legend>
                <div className="clear-both grid gap-5 sm:grid-cols-2">
                  <FormField
                    label="문의 유형"
                    htmlFor="inquiryType"
                    required
                    error={errors.inquiryType?.message}
                  >
                    <select
                      id="inquiryType"
                      aria-required="true"
                      aria-invalid={!!errors.inquiryType}
                      aria-describedby={
                        errors.inquiryType ? "inquiryType-error" : undefined
                      }
                      className={cn(
                        fieldInputClass,
                        fieldBorderClass(!!errors.inquiryType),
                      )}
                      {...register("inquiryType")}
                    >
                      {inquiryConfig.inquiryTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </FormField>
                  {renderTextField({
                    name: "productName",
                    label: "제품 또는 부품명",
                    maxLength: 100,
                    required: true,
                  })}
                </div>

                <details className="group mt-5 rounded-xl border border-line">
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-body [&::-webkit-details-marker]:hidden">
                    <span>
                      소재 · 수량 · 납기{" "}
                      <span className="ml-1 text-xs font-normal text-muted">
                        선택
                      </span>
                    </span>
                    <ChevronDown
                      className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <div className="grid gap-5 border-t border-line p-4 sm:grid-cols-2">
                    {optionalFields.map(renderTextField)}
                  </div>
                </details>

                <div className="mt-5">
                  <FormField
                    label="문의 내용"
                    htmlFor="message"
                    required
                    error={errors.message?.message}
                    hint="최대 2,000자"
                  >
                    <textarea
                      id="message"
                      rows={4}
                      maxLength={2000}
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      aria-describedby={
                        errors.message ? "message-error" : "message-hint"
                      }
                      placeholder="가공 요청 사항, 도면 유무, 참고 사항 등을 남겨 주세요."
                      className={cn(
                        fieldInputClass,
                        fieldBorderClass(!!errors.message),
                        "min-h-32 resize-y",
                      )}
                      {...register("message")}
                    />
                  </FormField>
                </div>
              </fieldset>

              <FormField
                label="도면 및 관련 파일"
                htmlFor="inquiry-files"
                error={attachmentNotice ?? undefined}
                hint="선택한 파일은 이 화면에서만 확인하며 업로드되지 않습니다."
              >
                <InquiryFileUploader
                  files={files}
                  onChange={(nextFiles) => {
                    setFiles(nextFiles);
                    setReviewed(false);
                    setAttachmentNotice(null);
                  }}
                />
              </FormField>

              <div className="border-t border-line pt-5">
                <label className="flex min-h-11 items-start gap-3 text-sm leading-relaxed text-muted">
                  <input
                    name="privacyConsent"
                    type="checkbox"
                    disabled
                    className="mt-0.5 h-5 w-5 shrink-0 rounded accent-sapphire"
                  />
                  <span>
                    개인정보 수집 및 이용 동의
                    <span className="mt-1 block text-xs">
                      접수 서비스 연결 후 상세 안내와 동의 절차가 제공됩니다.
                    </span>
                  </span>
                </label>
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex min-h-13 w-full items-center justify-center gap-3 rounded-xl bg-sapphire px-5 py-3.5 text-base font-semibold text-white transition-colors hover:bg-navy disabled:cursor-wait disabled:opacity-60"
                >
                  입력 내용 확인하기
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <p className="text-center text-xs leading-relaxed text-muted">
                  입력 확인은 문의 접수가 아닙니다. 새로고침하면 작성 내용이
                  사라질 수 있습니다.
                </p>
                <div role="status" aria-live="polite" aria-atomic="true">
                  {reviewed && (
                    <div className="flex items-start gap-3 rounded-xl border border-sapphire/15 bg-sapphire/5 p-4">
                      <ClipboardCheck
                        className="mt-0.5 h-5 w-5 shrink-0 text-sapphire"
                        aria-hidden="true"
                      />
                      <p className="text-sm leading-relaxed text-heading">
                        필수 입력 항목을 확인했습니다. 아직 문의가 접수되지
                        않았으며, 작성 내용과 파일은 전송되지 않았습니다.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
