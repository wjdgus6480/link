import Link from "next/link";
import type { Folder } from "@/lib/data";
import { compactButtonStyles, compactSecondaryButtonStyles } from "./Button";
import FolderList from "./FolderList";
import SidebarItem from "./SidebarItem";

export type SidebarProps = {
  folders: Folder[];
  counts: Record<string, number>;
  total: number;
  /** "all", a folder id, or null when no item is active (e.g. on /new). */
  activeKey: string | null;
  signedIn: boolean;
};

export default function Sidebar({ folders, counts, total, activeKey, signedIn }: SidebarProps) {
  return (
    <aside className="flex w-60 shrink-0 flex-col bg-[var(--surface)] px-3 py-6 shadow-[1px_0_0_rgba(0,0,0,0.06)]">
      <nav className="flex flex-col gap-6">
        <SidebarItem label="전체" count={total} href="/" active={activeKey === "all"} />
        <div>
          <h2 className="mb-2 px-3 text-[13px] font-bold text-[var(--text-sub)]">폴더</h2>
          <FolderList folders={folders} counts={counts} activeKey={activeKey} />
        </div>
      </nav>
      {!signedIn && (
        <div className="mt-auto flex flex-col gap-2 pt-6">
          <Link href="/login" className={compactButtonStyles}>
            로그인
          </Link>
          <Link href="/signup" className={compactSecondaryButtonStyles}>
            회원가입
          </Link>
        </div>
      )}
    </aside>
  );
}
