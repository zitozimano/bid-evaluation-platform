import React from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export const PageShell = ({
  children,
  menu,
  title
}: {
  children: React.ReactNode;
  menu: { label: string; href: string }[];
  title: string;
}) => (
  <div className="flex">
    <Sidebar items={menu} />
    <div className="flex-1">
      <Topbar title={title} />
      <main className="p-6">{children}</main>
    </div>
  </div>
);
