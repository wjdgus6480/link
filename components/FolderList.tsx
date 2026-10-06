import type { Folder } from "@/lib/data";
import DeleteFolderButton from "./DeleteFolderButton";
import EditFolderButton from "./EditFolderButton";
import SidebarItem from "./SidebarItem";

type FolderListProps = {
  folders: Folder[];
  counts: Record<string, number>;
  activeKey: string | null;
};

export default function FolderList({ folders, counts, activeKey }: FolderListProps) {
  return (
    <ul className="flex flex-col gap-1">
      {folders.map((folder) => (
        <li key={folder.id} className="folder-item relative">
          <SidebarItem
            label={folder.name}
            count={counts[folder.id] ?? 0}
            href={`/?folder=${encodeURIComponent(folder.id)}`}
            active={activeKey === folder.id}
          />
          <div className="folder-actions absolute top-1/2 right-2 flex -translate-y-1/2 gap-0.5 rounded-lg bg-[var(--hover-bg)]">
            <EditFolderButton folder={folder} />
            <DeleteFolderButton folder={folder} active={activeKey === folder.id} />
          </div>
        </li>
      ))}
    </ul>
  );
}
