import { createElement, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

export function Container({ children, className, as = "div" }: ContainerProps) {
  return createElement(
    as,
    { className: cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className) },
    children,
  );
}
