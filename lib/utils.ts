import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 중앙 데이터 파일에서 값이 아직 실제 정보로 교체되지 않은 "표시값"인지 확인합니다.
 * 표시값은 "[항목명 입력]" 형태의 대괄호 문자열로 통일합니다.
 */
export function isPlaceholder(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.trim().startsWith("[") &&
    value.trim().endsWith("]")
  );
}

/**
 * 값이 실제로 채워져 있는지(공개 화면에 노출 가능한지) 확인합니다.
 * null/undefined/빈 문자열/표시값은 모두 "미확정"으로 취급합니다.
 */
export function isConfigured<T>(value: T | null | undefined): value is T {
  if (value === null || value === undefined) return false;
  if (typeof value === "string" && (value.trim() === "" || isPlaceholder(value))) {
    return false;
  }
  if (Array.isArray(value) && value.length === 0) return false;
  return true;
}

export function formatPhoneHref(phone: string) {
  return `tel:${phone.replace(/[^0-9+]/g, "")}`;
}

export function formatBytes(bytes: number) {
  if (bytes === 0) return "0B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)}${units[i]}`;
}
