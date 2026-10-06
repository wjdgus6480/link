import Link from "next/link";
import AddLinkButton from "./AddLinkButton";
import LogoutButton from "./LogoutButton";
import NewFolderButton from "./NewFolderButton";

export default function Header({ userEmail }: { userEmail: string | null }) {
  return (
    <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center justify-between bg-[var(--surface)] px-5 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
      <h1 className="text-xl font-bold">
        <Link href="/" className="logo-link flex items-center gap-1.5">
          <span className="text-[var(--accent)]">링크</span>
          <span className="size-2 rounded-full bg-[var(--point)]" aria-hidden />
        </Link>
      </h1>
      <div className="flex items-center gap-2">
        <NewFolderButton />
        <AddLinkButton />
        {userEmail && (
          <>
            <span className="ml-2 max-w-48 truncate text-sm font-bold text-[var(--text-sub)]" title={userEmail}>
              {userEmail}
            </span>
            <LogoutButton />
          </>
        )}
      </div>
    </header>
  );
}
