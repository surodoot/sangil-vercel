import type { ReactNode } from "react";
interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
  delay?: number;
  y?: number;
  duration?: number;
  container?: boolean;
}
/** Content stays visible on first paint, with JavaScript disabled, and in reduced motion. */
export function Reveal({ children, className, as: Tag = "div" }: RevealProps) {
  return <Tag className={className}>{children}</Tag>;
}
export function RevealItem({
  children,
  className,
  as: Tag = "div",
}: RevealProps) {
  return <Tag className={className}>{children}</Tag>;
}
