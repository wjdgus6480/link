"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import type { Folder } from "@/lib/data";
import { useBookmarks } from "./BookmarksProvider";
import { dangerButtonStyles, folderActionStyles, secondaryButtonStyles } from "./Button";
import Modal from "./Modal";

type DeleteFolderButtonProps = {
  folder: Folder;
  /** True while this folder is the one being viewed, so we can leave its page after deleting. */
  active: boolean;
};

export default function DeleteFolderButton({ folder, active }: DeleteFolderButtonProps) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { bookmarks, deleteFolder } = useBookmarks();
  const linkCount = bookmarks.filter((b) => b.folderId === folder.id).length;
  const titleId = `delete-folder-title-${folder.id}`;

  function handleDelete() {
    dialogRef.current?.close();
    deleteFolder(folder.id).then(() => {
      if (active) router.replace("/");
    }, console.error);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        aria-label={`${folder.name} 폴더 삭제`}
        className={`folder-delete ${folderActionStyles}`}
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
          <path d="M3 6h18" />
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
        </svg>
      </button>
      <Modal ref={dialogRef} labelledBy={titleId}>
        <h2 id={titleId} className="text-xl leading-[1.4] font-bold">
          &lsquo;{folder.name}&rsquo; 폴더를 삭제할까요?
        </h2>
        <p className="text-[15px] leading-[1.6] text-[var(--text-sub)]">
          {linkCount > 0 ? (
            <>
              폴더 안의 링크 <strong className="font-bold text-[var(--error)]">{linkCount}개</strong>도 함께
              삭제돼요.
            </>
          ) : (
            "비어 있는 폴더예요."
          )}{" "}
          삭제한 폴더는 되돌릴 수 없어요.
        </p>
        <div className="mt-2 flex gap-2">
          <button
            type="button"
            autoFocus
            onClick={() => dialogRef.current?.close()}
            className={`${secondaryButtonStyles} flex-1`}
          >
            취소
          </button>
          <button type="button" onClick={handleDelete} className={`${dangerButtonStyles} flex-1`}>
            삭제
          </button>
        </div>
      </Modal>
    </>
  );
}
