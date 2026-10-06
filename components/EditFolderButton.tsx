"use client";

import { useRef, useState, type FormEvent } from "react";
import type { Folder } from "@/lib/data";
import { useBookmarks } from "./BookmarksProvider";
import { buttonStyles, folderActionStyles, secondaryButtonStyles } from "./Button";
import { fieldStyles, labelStyles } from "./fieldStyles";
import { MAX_FOLDER_NAME_LENGTH, validateFolderName } from "./folderName";
import Modal from "./Modal";

export default function EditFolderButton({ folder }: { folder: Folder }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { folders, renameFolder } = useBookmarks();
  const [error, setError] = useState<string | null>(null);
  const titleId = `edit-folder-title-${folder.id}`;
  const inputId = `edit-folder-name-${folder.id}`;
  const errorId = `edit-folder-error-${folder.id}`;

  function open() {
    // Start from the current name each time, with it selected for quick retyping.
    formRef.current?.reset();
    setError(null);
    dialogRef.current?.showModal();
    inputRef.current?.select();
  }

  function close() {
    dialogRef.current?.close();
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = String(new FormData(e.currentTarget).get("name") ?? "").trim();
    if (name === folder.name) return close();

    const nameError = validateFolderName(name, folders, folder.id);
    if (nameError) return setError(nameError);

    renameFolder(folder.id, name).then(close, () => setError("저장에 실패했어요. 다시 시도해 주세요."));
  }

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label={`${folder.name} 폴더 이름 수정`}
        className={`folder-edit ${folderActionStyles}`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
      </button>
      <Modal ref={dialogRef} labelledBy={titleId}>
        <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-3.5">
          <h2 id={titleId} className="text-xl leading-[1.4] font-bold">
            폴더 이름 수정
          </h2>
          <div className="flex flex-col gap-1.5">
            <label htmlFor={inputId} className={labelStyles}>
              폴더 이름
            </label>
            <input
              ref={inputRef}
              id={inputId}
              name="name"
              type="text"
              autoComplete="off"
              defaultValue={folder.name}
              maxLength={MAX_FOLDER_NAME_LENGTH}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? errorId : undefined}
              className={fieldStyles}
            />
            {error && (
              <p id={errorId} role="alert" className="text-[13px] leading-[1.4] text-[var(--error)]">
                {error}
              </p>
            )}
          </div>
          <div className="mt-2 flex gap-2">
            <button type="button" onClick={close} className={`${secondaryButtonStyles} flex-1`}>
              취소
            </button>
            <button type="submit" className={`${buttonStyles} flex-1`}>
              저장
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
