import type { Bookmark } from "@/lib/data";

type LinkCardProps = {
  bookmark: Bookmark;
  folderName?: string;
};

export default function LinkCard({ bookmark, folderName }: LinkCardProps) {
  const hostname = new URL(bookmark.url).hostname;

  return (
    <a
      href={bookmark.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-hover flex flex-col gap-2 rounded-2xl bg-[var(--surface)] p-5 shadow-[var(--shadow)]"
    >
      <h3 className="truncate text-base font-bold">{bookmark.title}</h3>
      <p className="line-clamp-2 text-[13px] leading-[1.4] text-[var(--text-sub)]">{bookmark.description}</p>
      <div className="mt-auto flex items-center justify-between gap-2 pt-2 text-[13px] leading-[1.4] text-[var(--text-sub)]">
        <span className="truncate">{hostname}</span>
        {folderName && (
          <span className="shrink-0 rounded-lg bg-[var(--hover-bg)] px-2.5 py-1 font-bold text-[var(--accent)]">
            {folderName}
          </span>
        )}
      </div>
    </a>
  );
}
