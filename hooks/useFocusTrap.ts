"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), summary, [contenteditable="true"], [tabindex]:not([tabindex="-1"])';

function isVisible(element: HTMLElement) {
  return (
    element.getClientRects().length > 0 &&
    window.getComputedStyle(element).visibility !== "hidden" &&
    !element.closest('[inert], [aria-hidden="true"]')
  );
}

/** Trap focus, isolate background content, and restore the original trigger. */
export function useFocusTrap(
  ref: RefObject<HTMLElement | null>,
  active: boolean,
  onClose: () => void,
) {
  const onCloseRef = useRef(onClose);

  useLayoutEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useLayoutEffect(() => {
    if (!active || !ref.current) return;

    const container = ref.current;
    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousTabIndex = container.getAttribute("tabindex");
    if (previousTabIndex === null) container.tabIndex = -1;

    const getFocusable = () =>
      Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((element) => element.tabIndex >= 0 && isVisible(element));

    const focusFirst = () => {
      const preferred =
        container.querySelector<HTMLElement>("[data-autofocus]");
      const target =
        preferred && isVisible(preferred) ? preferred : getFocusable()[0];
      (target ?? container).focus({ preventScroll: true });
    };

    // Focus inside before isolating siblings, so the active trigger is never inert.
    focusFirst();
    const background = new Map<HTMLElement, boolean>();
    let branch: HTMLElement = container;
    while (branch.parentElement) {
      for (const sibling of branch.parentElement.children) {
        if (sibling instanceof HTMLElement && sibling !== branch) {
          background.set(sibling, sibling.inert);
          sibling.setAttribute("inert", "");
        }
      }
      if (branch.parentElement === document.body) break;
      branch = branch.parentElement;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;

      const items = getFocusable();
      if (items.length === 0) {
        event.preventDefault();
        container.focus({ preventScroll: true });
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;
      const outside = !current || !container.contains(current);
      if (
        event.shiftKey &&
        (current === first || current === container || outside)
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (current === last || current === container || outside)
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    const handleFocusIn = (event: FocusEvent) => {
      if (event.target instanceof Node && !container.contains(event.target))
        focusFirst();
    };

    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("focusin", handleFocusIn, true);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("focusin", handleFocusIn, true);
      background.forEach((wasInert, element) => {
        element.toggleAttribute("inert", wasInert);
      });
      if (previousTabIndex === null) container.removeAttribute("tabindex");
      if (previouslyFocused?.isConnected && isVisible(previouslyFocused)) {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, [active, ref]);
}
