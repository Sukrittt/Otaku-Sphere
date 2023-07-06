"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { SidebarNavType } from "@/types/item-type";
import { Icons } from "@/components/Icons";
import { cn } from "@/lib/utils";

const sidebarNavItems: SidebarNavType[] = [
  {
    id: 1,
    label: "Users",
    Icon: Icons.user,
    href: "/admin/users",
  },
  {
    id: 2,
    label: "Anime",
    Icon: Icons.anime,
    href: "/admin/anime",
  },
];

const SidebarNav = () => {
  const pathname = usePathname();

  return (
    <div className="flex w-full flex-col gap-2">
      {sidebarNavItems.map((item) => (
        <Link key={item.id} href={item.href}>
          <span
            className={cn(
              "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground",
              pathname === item.href
                ? "bg-muted font-medium text-foreground"
                : "text-muted-foreground"
            )}
          >
            <item.Icon className="mr-2 h-4 w-4" aria-hidden="true" />
            <span>{item.label}</span>
          </span>
        </Link>
      ))}
    </div>
  );
};

export default SidebarNav;
