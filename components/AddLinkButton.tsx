import Link from "next/link";
import { compactButtonStyles } from "./Button";

export default function AddLinkButton() {
  return (
    <Link href="/new" className={compactButtonStyles}>
      + 링크 추가
    </Link>
  );
}
