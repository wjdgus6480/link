import Link from "next/link";

type SidebarItemProps = {
  label: string;
  count: number;
  href: string;
  active: boolean;
};

export default function SidebarItem({ label, count, href, active }: SidebarItemProps) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-[15px] font-bold ${
        active ? "bg-[var(--hover-bg)] text-[var(--accent)]" : "nav-item text-[var(--text)]"
      }`}
    >
      <span className="truncate">{label}</span>
      <span
        className={`folder-count min-w-6 shrink-0 rounded-lg px-2 py-0.5 text-center text-[13px] leading-[1.4] ${
          active ? "bg-[var(--accent)] text-white" : "bg-[var(--bg)] text-[var(--text-sub)]"
        }`}
      >
        {count}
      </span>
    </Link>
  );
}
