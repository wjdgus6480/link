import { ImageResponse } from "next/og";

export const alt = "링크 — 폴더별로 정리하는 북마크 서비스";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TEXT = "링크 자주 찾는 링크를 폴더별로 모아 두세요";

// The default font has no Hangul glyphs, so load a Noto Sans KR subset for just this text.
async function loadFont() {
  const css = await (
    await fetch(`https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&text=${encodeURIComponent(TEXT)}`)
  ).text();
  const url = css.match(/src: url\((.+?)\) format/)?.[1];
  if (!url) throw new Error("Failed to load Noto Sans KR");
  return (await fetch(url)).arrayBuffer();
}

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          background: "#f5f5f5",
          fontFamily: "Noto Sans KR",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span style={{ fontSize: 160, fontWeight: 700, color: "#0e9c97" }}>링크</span>
          <span style={{ width: 36, height: 36, borderRadius: 18, background: "#ffd600" }} />
        </div>
        <span style={{ fontSize: 44, fontWeight: 700, color: "#555" }}>자주 찾는 링크를 폴더별로 모아 두세요</span>
      </div>
    ),
    { ...size, fonts: [{ name: "Noto Sans KR", data: await loadFont(), weight: 700, style: "normal" }] },
  );
}
