"use client";

import { useBookmarks } from "./BookmarksProvider";
import LinkGrid from "./LinkGrid";

type FolderLinkGridProps = {
  selectedId: string | null;
};

// Client-side so folders created in this session resolve to a title too.
export default function FolderLinkGrid({ selectedId }: FolderLinkGridProps) {
  const { bookmarks, folders } = useBookmarks();
  const visible = selectedId ? bookmarks.filter((b) => b.folderId === selectedId) : bookmarks;
  const title = selectedId ? (folders.find((f) => f.id === selectedId)?.name ?? "알 수 없는 폴더") : "전체 링크";

  return (
    <>
      <h2 className="text-[26px] leading-[1.3] font-bold">{title}</h2>
      <LinkGrid bookmarks={visible} folders={folders} />
    </>
  );
}
