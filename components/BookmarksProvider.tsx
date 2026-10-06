"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Bookmark, Folder } from "@/lib/data";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

type BookmarksContextValue = {
  bookmarks: Bookmark[];
  folders: Folder[];
  addBookmark: (input: Omit<Bookmark, "id">) => Promise<void>;
  addFolder: (name: string) => Promise<Folder>;
  /** Removes the folder and every bookmark in it. */
  deleteFolder: (id: string) => Promise<void>;
  renameFolder: (id: string, name: string) => Promise<void>;
};

const BookmarksContext = createContext<BookmarksContextValue | null>(null);

type BookmarksProviderProps = {
  initial: Bookmark[];
  initialFolders: Folder[];
  children: ReactNode;
};

// Writes go to Supabase first; local state is updated once the write succeeds.
export default function BookmarksProvider({ initial, initialFolders, children }: BookmarksProviderProps) {
  const [bookmarks, setBookmarks] = useState(initial);
  const [folders, setFolders] = useState(initialFolders);

  async function addBookmark({ folderId, ...input }: Omit<Bookmark, "id">) {
    const { data, error } = await supabase
      .from("bookmarks")
      .insert({ ...input, folder_id: Number(folderId) })
      .select("id")
      .single();
    if (error) throw error;
    setBookmarks((prev) => [...prev, { id: String(data.id), folderId, ...input }]);
  }

  async function addFolder(name: string) {
    const { data, error } = await supabase.from("folders").insert({ name }).select("id, name").single();
    if (error) throw error;
    const folder = { id: String(data.id), name: data.name };
    setFolders((prev) => [...prev, folder]);
    return folder;
  }

  async function renameFolder(id: string, name: string) {
    const { error } = await supabase.from("folders").update({ name }).eq("id", Number(id));
    if (error) throw error;
    setFolders((prev) => prev.map((f) => (f.id === id ? { ...f, name } : f)));
  }

  async function deleteFolder(id: string) {
    const ids = bookmarks.filter((b) => b.folderId === id).map((b) => Number(b.id));
    if (ids.length) {
      const { error } = await supabase.from("bookmarks").delete().in("id", ids);
      if (error) throw error;
    }
    const { error } = await supabase.from("folders").delete().eq("id", Number(id));
    if (error) throw error;
    setFolders((prev) => prev.filter((f) => f.id !== id));
    setBookmarks((prev) => prev.filter((b) => b.folderId !== id));
  }

  return (
    <BookmarksContext value={{ bookmarks, folders, addBookmark, addFolder, renameFolder, deleteFolder }}>
      {children}
    </BookmarksContext>
  );
}

export function useBookmarks() {
  const ctx = useContext(BookmarksContext);
  if (!ctx) throw new Error("useBookmarks must be used within BookmarksProvider");
  return ctx;
}
