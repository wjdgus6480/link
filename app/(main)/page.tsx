import type { Metadata } from "next";
import FolderLinkGrid from "@/components/FolderLinkGrid";

export const metadata: Metadata = {
  title: "내 링크",
  description: "폴더별로 정리한 내 북마크를 한눈에 확인하세요.",
};

export default async function Home({ searchParams }: PageProps<"/">) {
  const { folder } = await searchParams;
  const selectedId = typeof folder === "string" ? folder : null;

  return <FolderLinkGrid selectedId={selectedId} />;
}
