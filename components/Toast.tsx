"use client";

import { useEffect } from "react";

type ToastProps = {
  message: string | null;
  onClose: () => void;
};

/** Top-center toast that dismisses itself after a few seconds. */
export default function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      role="alert"
      className="fixed top-5 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-[var(--error)] px-5 py-3 text-sm font-bold text-white shadow-[var(--shadow)]"
    >
      {message}
    </div>
  );
}
