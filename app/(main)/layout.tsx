import { Suspense } from "react";
import ActiveSidebar from "@/components/ActiveSidebar";
import BookmarksProvider from "@/components/BookmarksProvider";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { getData, getUserEmail } from "@/lib/data";

export default async function MainLayout({ children }: LayoutProps<"/">) {
  const [{ bookmarks, folders }, userEmail] = await Promise.all([getData(), getUserEmail()]);
  const signedIn = Boolean(userEmail);

  return (
    <BookmarksProvider initial={bookmarks} initialFolders={folders}>
      <Header userEmail={userEmail} />
      <div className="flex flex-1">
        <Suspense
          fallback={
            <Sidebar folders={folders} counts={{}} total={bookmarks.length} activeKey={null} signedIn={signedIn} />
          }
        >
          <ActiveSidebar signedIn={signedIn} />
        </Suspense>
        <main className="flex-1 bg-[var(--bg)] px-5 pt-9 pb-16">
          <div className="mx-auto flex max-w-[640px] flex-col gap-7">{children}</div>
        </main>
      </div>
    </BookmarksProvider>
  );
}
