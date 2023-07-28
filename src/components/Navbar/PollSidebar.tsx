"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { pollSidebarNavItems } from "@/data";

const PollSidebar = () => {
  const pathname = usePathname();
  const data = pollSidebarNavItems;

  return (
    <div className="flex w-full flex-col gap-2">
      {data.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className="focus:outline-none group"
        >
          <span
            className={cn(
              "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground group-focus:bg-muted group-focus:text-foreground group-focus:font-medium transition-all",
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

export default PollSidebar;
