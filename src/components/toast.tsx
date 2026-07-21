"use client";

import { useEffect } from "react";

export type ToastMessage = {
  id: number;
  text: string;
};

type ToastProps = {
  message: ToastMessage | null;
  onDismiss: () => void;
};

export function Toast({ message, onDismiss }: ToastProps) {
  useEffect(() => {
    if (!message) return;

    const timer = window.setTimeout(() => {
      onDismiss();
    }, 2800);

    return () => window.clearTimeout(timer);
  }, [message, onDismiss]);

  return (
    <div
      className="pointer-events-none fixed right-4 top-4 z-50 flex max-w-sm flex-col gap-2"
      aria-live="polite"
      aria-relevant="additions"
    >
      {message ? (
        <div
          key={message.id}
          className="pointer-events-auto animate-[toast-in_180ms_ease-out] rounded-[var(--radius-md)] border border-border bg-surface px-4 py-3 text-sm font-medium text-foreground shadow-[0_8px_24px_rgba(18,22,28,0.12)]"
          role="status"
        >
          {message.text}
        </div>
      ) : null}
    </div>
  );
}
