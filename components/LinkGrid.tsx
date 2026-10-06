import type { Bookmark, Folder } from "@/lib/data";
import LinkCard from "./LinkCard";

type LinkGridProps = {
  bookmarks: Bookmark[];
  folders: Folder[];
};

export default function LinkGrid({ bookmarks, folders }: LinkGridProps) {
  if (bookmarks.length === 0) {
    return (
      <div className="flex flex-col items-center gap-1 rounded-2xl bg-[var(--surface)] py-16 shadow-[var(--shadow)]">
        <p className="text-base font-bold">아직 저장된 링크가 없어요</p>
        <p className="text-[13px] text-[var(--text-sub)]">오른쪽 위 버튼으로 첫 링크를 추가해 보세요.</p>
      </div>
    );
  }

  const folderNames = Object.fromEntries(folders.map((f) => [f.id, f.name]));

  return (
    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
      {bookmarks.map((bookmark) => (
        <LinkCard key={bookmark.id} bookmark={bookmark} folderName={folderNames[bookmark.folderId]} />
      ))}
    </div>
  );
}
