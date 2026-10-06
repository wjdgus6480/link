import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export type Folder = {
  id: string;
  name: string;
};

export type Bookmark = {
  id: string;
  title: string;
  url: string;
  description: string;
  folderId: string;
};

export async function getData(): Promise<{ folders: Folder[]; bookmarks: Bookmark[] }> {
  const supabase = createClient(await cookies());
  const [foldersRes, bookmarksRes] = await Promise.all([
    supabase.from("folders").select("id, name").order("id"),
    supabase.from("bookmarks").select("id, url, title, description, folder_id").order("id"),
  ]);
  if (foldersRes.error) throw foldersRes.error;
  if (bookmarksRes.error) throw bookmarksRes.error;

  return {
    folders: foldersRes.data.map((f) => ({ id: String(f.id), name: f.name })),
    bookmarks: bookmarksRes.data.map((b) => ({
      id: String(b.id),
      url: b.url,
      title: b.title ?? b.url,
      description: b.description ?? "",
      folderId: b.folder_id == null ? "" : String(b.folder_id),
    })),
  };
}

export async function getUserEmail(): Promise<string | null> {
  const supabase = createClient(await cookies());
  const { data } = await supabase.auth.getClaims();
  return (data?.claims.email as string | undefined) ?? null;
}
