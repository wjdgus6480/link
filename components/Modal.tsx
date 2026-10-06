"use client";

import type { MouseEvent, ReactNode, Ref } from "react";

type ModalProps = {
  ref: Ref<HTMLDialogElement>;
  labelledBy: string;
  onClose?: () => void;
  children: ReactNode;
};

// Native <dialog>: open with ref.current.showModal(). Esc and backdrop clicks close it.
export default function Modal({ ref, labelledBy, onClose, children }: ModalProps) {
  function handleClick(e: MouseEvent<HTMLDialogElement>) {
    if (e.target === e.currentTarget) e.currentTarget.close();
  }

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={handleClick}
      aria-labelledby={labelledBy}
      className="modal m-auto w-[calc(100%-40px)] max-w-[400px] rounded-2xl bg-[var(--surface)] text-left text-base font-normal text-[var(--text)] shadow-[0_8px_32px_rgba(0,0,0,0.16)]"
    >
      <div className="flex flex-col gap-3.5 p-6">{children}</div>
    </dialog>
  );
}
