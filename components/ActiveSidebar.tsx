"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useBookmarks } from "./BookmarksProvider";
import Sidebar from "./Sidebar";

// Derives the active item from the URL so the same sidebar works on every page.
export default function ActiveSidebar({ signedIn }: { signedIn: boolean }) {
  const pathname = usePathname();
  const folder = useSearchParams().get("folder");
  const activeKey = pathname === "/" ? (folder ?? "all") : null;

  const { bookmarks, folders } = useBookmarks();
  const counts: Record<string, number> = {};
  for (const b of bookmarks) counts[b.folderId] = (counts[b.folderId] ?? 0) + 1;

  return <Sidebar folders={folders} counts={counts} total={bookmarks.length} activeKey={activeKey} signedIn={signedIn} />;
}
