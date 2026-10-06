import type { ComponentProps } from "react";

export const buttonStyles =
  "btn inline-flex items-center justify-center rounded-xl bg-[var(--accent)] px-6 py-3.5 text-base leading-none font-bold text-white";

export const compactButtonStyles =
  "btn inline-flex items-center justify-center rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm leading-none font-bold text-white";

export const secondaryButtonStyles =
  "btn-secondary inline-flex items-center justify-center rounded-xl bg-[var(--hover-bg)] px-6 py-3.5 text-base leading-none font-bold text-[var(--accent)]";

export const compactSecondaryButtonStyles =
  "btn-secondary inline-flex items-center justify-center rounded-xl bg-[var(--hover-bg)] px-4 py-2.5 text-sm leading-none font-bold text-[var(--accent)]";

export const dangerButtonStyles =
  "btn-danger inline-flex items-center justify-center rounded-xl bg-[var(--error)] px-6 py-3.5 text-base leading-none font-bold text-white";

/** Small icon button shown on a sidebar folder row. */
export const folderActionStyles =
  "flex size-7 items-center justify-center rounded-lg text-[var(--text-sub)]";

export default function Button({ className = "", type = "button", ...props }: ComponentProps<"button">) {
  return <button type={type} className={`${buttonStyles} ${className}`} {...props} />;
}
