"use client";

import Link from "next/link";
import clsx from "clsx";

interface Props {
  href: string;
  label: string;
  active?: boolean;
}

export default function SidebarItem({ href, label, active }: Props) {
  return (
    <Link
      href={href}
      className={clsx(
        "block px-3 py-2 rounded-md text-sm",
        active
          ? "bg-slate-900 text-white"
          : "text-slate-700 hover:bg-slate-100"
      )}
    >
      {label}
    </Link>
  );
}
