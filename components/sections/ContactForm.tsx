"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, XCircle, Loader2, Send } from "lucide-react";
import { inquirySchema, type InquiryFormValues } from "@/lib/validation";
import { inquiryConfig } from "@/data/company";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { FormField, fieldInputClass, fieldBorderClass } from "@/components/ui/FormField";
import { InquiryFileUploader, type FileEntry } from "./InquiryFileUploader";
import { cn } from "@/lib/utils";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

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

function simulateUpload(id: string, onProgress: (id: string, progress: number) => void) {
  return new Promise<void>((resolve) => {
    let progress = 0;
    const timer = setInterval(() => {
      progress = Math.min(100, progress + 15 + Math.random() * 20);
      onProgress(id, progress);
      if (progress >= 100) {
        clearInterval(timer);
        resolve();
      }
    }, 160);
  });
}

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    mode: "onTouched",
    defaultValues: DEFAULT_VALUES,
  });

  const [files, setFiles] = useState<FileEntry[]>([]);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [attachmentNotice, setAttachmentNotice] = useState<string | null>(null);

  const busy = status === "submitting" || isSubmitting;

  const onValid = async (data: InquiryFormValues) => {
    if (files.some((entry) => entry.status === "error")) {
      setAttachmentNotice("첨부파일 형식/크기 오류를 확인한 뒤 다시 시도해 주세요.");
      return;
    }
    setAttachmentNotice(null);
    setStatus("submitting");

    const pending = files.filter((entry) => entry.status === "pending");
    if (pending.length > 0) {
      setFiles((prev) =>
        prev.map((entry) => (entry.status === "pending" ? { ...entry, status: "uploading" } : entry)),
      );
      await Promise.all(
        pending.map((entry) =>
          simulateUpload(entry.id, (id, progress) => {
            setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, progress } : f)));
          }).then(() => {
            setFiles((prev) =>
              prev.map((f) => (f.id === entry.id ? { ...f, status: "done", progress: 100 } : f)),
            );
          }),
        ),
      );
    }

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          attachments: files.map((entry) => ({
            name: entry.file.name,
            size: entry.file.size,
            type: entry.file.type,
          })),
        }),
      });

      if (!response.ok) throw new Error("submit-failed");

      setStatus("success");
      reset(DEFAULT_VALUES);
      setFiles([]);
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section id="contact" className="relative bg-ivory py-24 sm:py-32">
        <Container>
          <Reveal className="glass-panel mx-auto flex max-w-xl flex-col items-center gap-4 rounded-[28px] px-8 py-16 text-center">
            <CheckCircle2 className="h-12 w-12 text-sapphire" aria-hidden="true" />
            <h2 className="text-heading-1 font-display font-bold text-heading">
              문의가 접수되었습니다
            </h2>
            <p className="text-body-lg text-body">
              보내주신 내용을 확인한 후 담당자가 순차적으로 안내해 드리겠습니다.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="touch-target mt-2 rounded-full border border-line-strong px-6 py-3 font-en text-sm font-semibold text-heading transition-colors hover:border-gold/50 hover:text-sapphire"
            >
              새 문의 작성하기
            </button>
          </Reveal>
        </Container>
      </section>
    );
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-ivory py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-60" aria-hidden="true" />

      <Container className="relative">
        <SectionHeading
          eyebrow="Get a Quote"
          title="가공 가능 여부와 견적을 문의해 주세요."
          description="제품 정보와 요청사항을 보내주시면 내용을 확인한 후 담당자가 안내해 드립니다."
        />

        <Reveal className="mt-12">
          <form
            onSubmit={handleSubmit(onValid)}
            noValidate
            className="glass-panel mx-auto max-w-3xl space-y-8 rounded-[28px] p-6 sm:p-10"
          >
            <div className="flex items-center justify-between">
              <span className="text-caption text-muted" aria-live="polite">
                {status === "error"
                  ? "전송 실패 · 다시 시도해 주세요"
                  : isDirty
                    ? "작성 중"
                    : "입력 전"}
              </span>
              <span className="text-caption text-muted">
                <span className="text-sapphire">*</span> 표시는 필수 입력 항목입니다
              </span>
            </div>

            {status === "error" && (
              <div
                role="alert"
                className="flex items-center gap-3 rounded-xl border border-[#B91C1C]/40 bg-[#B91C1C]/5 px-5 py-4"
              >
                <XCircle className="h-5 w-5 shrink-0 text-[#B91C1C]" aria-hidden="true" />
                <p className="text-body text-heading">
                  전송 중 문제가 발생했습니다. 잠시 후 다시 시도해 주시거나, 표시된
                  연락처로 문의해 주세요.
                </p>
              </div>
            )}

            <div className="grid gap-6 sm:grid-cols-2">
              <FormField label="회사명" htmlFor="companyName" required error={errors.companyName?.message}>
                <input
                  id="companyName"
                  type="text"
                  disabled={busy}
                  aria-invalid={!!errors.companyName}
                  aria-describedby={errors.companyName ? "companyName-error" : undefined}
                  className={cn(fieldInputClass, fieldBorderClass(!!errors.companyName))}
                  {...register("companyName")}
                />
              </FormField>

              <FormField label="담당자명" htmlFor="contactName" required error={errors.contactName?.message}>
                <input
                  id="contactName"
                  type="text"
                  disabled={busy}
                  aria-invalid={!!errors.contactName}
                  aria-describedby={errors.contactName ? "contactName-error" : undefined}
                  className={cn(fieldInputClass, fieldBorderClass(!!errors.contactName))}
                  {...register("contactName")}
                />
              </FormField>

              <FormField label="연락처" htmlFor="phone" required error={errors.phone?.message} hint="숫자와 하이픈(-)으로 입력해 주세요">
                <input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  disabled={busy}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  placeholder="010-0000-0000"
                  className={cn(fieldInputClass, fieldBorderClass(!!errors.phone))}
                  {...register("phone")}
                />
              </FormField>

              <FormField label="이메일" htmlFor="email" required error={errors.email?.message}>
                <input
                  id="email"
                  type="email"
                  inputMode="email"
                  disabled={busy}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  placeholder="name@company.com"
                  className={cn(fieldInputClass, fieldBorderClass(!!errors.email))}
                  {...register("email")}
                />
              </FormField>

              <FormField label="문의 유형" htmlFor="inquiryType" required error={errors.inquiryType?.message}>
                <select
                  id="inquiryType"
                  disabled={busy}
                  aria-invalid={!!errors.inquiryType}
                  aria-describedby={errors.inquiryType ? "inquiryType-error" : undefined}
                  className={cn(fieldInputClass, fieldBorderClass(!!errors.inquiryType))}
                  {...register("inquiryType")}
                >
                  {inquiryConfig.inquiryTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="제품 또는 부품명" htmlFor="productName" required error={errors.productName?.message}>
                <input
                  id="productName"
                  type="text"
                  disabled={busy}
                  aria-invalid={!!errors.productName}
                  aria-describedby={errors.productName ? "productName-error" : undefined}
                  className={cn(fieldInputClass, fieldBorderClass(!!errors.productName))}
                  {...register("productName")}
                />
              </FormField>

              <FormField label="소재" htmlFor="material" error={errors.material?.message} hint="선택 입력">
                <input
                  id="material"
                  type="text"
                  disabled={busy}
                  className={cn(fieldInputClass, fieldBorderClass(!!errors.material))}
                  {...register("material")}
                />
              </FormField>

              <FormField label="예상 수량" htmlFor="quantity" error={errors.quantity?.message} hint="선택 입력">
                <input
                  id="quantity"
                  type="text"
                  disabled={busy}
                  placeholder="예: 월 500개"
                  className={cn(fieldInputClass, fieldBorderClass(!!errors.quantity))}
                  {...register("quantity")}
                />
              </FormField>

              <FormField
                label="희망 납기"
                htmlFor="desiredDeadline"
                error={errors.desiredDeadline?.message}
                hint="선택 입력"
                className="sm:col-span-2"
              >
                <input
                  id="desiredDeadline"
                  type="text"
                  disabled={busy}
                  placeholder="예: 2026년 10월 중"
                  className={cn(fieldInputClass, fieldBorderClass(!!errors.desiredDeadline))}
                  {...register("desiredDeadline")}
                />
              </FormField>
            </div>

            <FormField label="문의 내용" htmlFor="message" required error={errors.message?.message}>
              <textarea
                id="message"
                rows={6}
                disabled={busy}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                placeholder="가공 요청 사항, 도면 유무, 참고 사항 등을 자유롭게 남겨 주세요."
                className={cn(fieldInputClass, fieldBorderClass(!!errors.message), "resize-y")}
                {...register("message")}
              />
            </FormField>

            <FormField label="도면 및 관련 파일 첨부" htmlFor="inquiry-files" error={attachmentNotice ?? undefined}>
              <InquiryFileUploader files={files} onChange={setFiles} disabled={busy} />
            </FormField>

            <div>
              <label className="flex touch-target items-start gap-3">
                <input
                  type="checkbox"
                  disabled={busy}
                  aria-invalid={!!errors.privacyConsent}
                  aria-describedby={errors.privacyConsent ? "privacyConsent-error" : undefined}
                  className="mt-1 h-5 w-5 shrink-0 rounded border-line-strong bg-white/70 text-navy accent-navy"
                  {...register("privacyConsent")}
                />
                <span className="text-body text-muted">
                  <span className="text-heading">개인정보 수집 및 이용에 동의합니다.</span>{" "}
                  견적 문의 응대를 위해 회사명, 담당자명, 연락처, 이메일을
                  수집하며, 목적 달성 후 관련 법령에 따라 안전하게 보관 후
                  파기합니다.
                </span>
              </label>
              {errors.privacyConsent && (
                <p id="privacyConsent-error" role="alert" className="mt-1.5 text-caption font-medium text-[#B91C1C]">
                  {errors.privacyConsent.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={busy}
              className="gold-sweep touch-target flex w-full items-center justify-center gap-2 rounded-full bg-navy px-8 py-4 font-en text-base font-semibold text-on-dark shadow-[0_16px_40px_rgba(11,31,58,0.28),inset_0_1px_0_rgba(216,191,145,0.35)] transition-all duration-300 hover:-translate-y-[3px] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto"
            >
              <span className="relative z-[2] flex items-center gap-2">
                {busy ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    전송 중...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 text-gold-soft" aria-hidden="true" />
                    문의 보내기
                  </>
                )}
              </span>
            </button>
          </form>
        </Reveal>
      </Container>
    </section>
  );
}
