import type { Folder } from "@/lib/data";

export const MAX_FOLDER_NAME_LENGTH = 20;

/** Returns an error message, or null when the (already trimmed) name is usable. */
export function validateFolderName(name: string, folders: Folder[], excludeId?: string): string | null {
  if (!name) return "폴더 이름을 입력해 주세요.";
  if (name.length > MAX_FOLDER_NAME_LENGTH) return `폴더 이름은 ${MAX_FOLDER_NAME_LENGTH}자 이내로 입력해 주세요.`;
  if (folders.some((f) => f.id !== excludeId && f.name === name)) return "같은 이름의 폴더가 이미 있어요.";
  return null;
}
