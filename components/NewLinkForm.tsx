"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition, type FormEvent } from "react";
import { getLinkMetadata } from "@/app/(main)/new/actions";
import { useBookmarks } from "./BookmarksProvider";
import Button from "./Button";
import { fieldStyles, labelStyles } from "./fieldStyles";

export default function NewLinkForm() {
  const router = useRouter();
  const { folders, addBookmark } = useBookmarks();
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const rawUrl = String(formData.get("url") ?? "").trim();
    const folderId = String(formData.get("folderId") ?? "");

    let url: URL;
    try {
      url = new URL(rawUrl);
    } catch {
      return setError("올바른 URL을 입력해 주세요.");
    }
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return setError("http 또는 https 링크만 저장할 수 있습니다.");
    }
    if (!folders.some((f) => f.id === folderId)) {
      return setError("폴더를 선택해 주세요.");
    }

    setError(null);
    startTransition(async () => {
      const meta = await getLinkMetadata(url.href).catch(() => ({ title: url.hostname, description: "" }));
      try {
        await addBookmark({ url: url.href, folderId, ...meta });
      } catch {
        return setError("저장에 실패했어요. 다시 시도해 주세요.");
      }
      router.push(`/?folder=${encodeURIComponent(folderId)}`);
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3.5 rounded-2xl bg-[var(--surface)] p-5 shadow-[var(--shadow)]"
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="url" className={labelStyles}>
          링크 URL
        </label>
        <input
          id="url"
          name="url"
          type="url"
          required
          autoFocus
          placeholder="https://example.com"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "form-error" : undefined}
          className={fieldStyles}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="folderId" className={labelStyles}>
          폴더
        </label>
        <select
          id="folderId"
          name="folderId"
          required
          defaultValue={folders[0]?.id}
          className={`select-field ${fieldStyles}`}
        >
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <p id="form-error" role="alert" className="text-[13px] leading-[1.4] text-[var(--error)]">
          {error}
        </p>
      )}
      <Button type="submit" disabled={pending} className="mt-1 w-full">
        {pending ? "저장 중…" : "저장하기"}
      </Button>
    </form>
  );
}
