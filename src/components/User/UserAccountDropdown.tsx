"use client";
import { FC } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/DropdownMenu";
import UserAvatar from "@/components/User/UserAvatar";
import { Icons } from "@/components/Icons";
import { dropdownItemType } from "@/types/item-type";

interface UserAccountDropdownProps {
  session: Session;
}

const dropdownItem: dropdownItemType[] = [
  {
    id: 1,
    label: "Settings",
    Icon: Icons.settings,
    href: "/settings",
  },
];

const UserAccountDropdown: FC<UserAccountDropdownProps> = ({ session }) => {
  const { user } = session;

  if (
    user.role === "ADMIN" &&
    !dropdownItem.find((item) => item.href === "/admin/users")
  ) {
    dropdownItem.push({
      id: 2,
      label: "Admin Panel",
      Icon: Icons.admin,
      href: "/admin/users",
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <UserAvatar className="h-8 w-8" user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2 text-sm">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />

        {dropdownItem.map((item) => (
          <DropdownMenuItem key={item.id} asChild>
            <Link href={item.href}>
              <div className="flex items-center gap-x-2">
                <item.Icon className="h-4 w-4" />
                {item.label}
              </div>
            </Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
            signOut({
              callbackUrl: `${window.location.origin}/sign-in`,
            });
          }}
          className="cursor-pointer"
        >
          <div className="flex items-center gap-x-2">
            <Icons.logOut className="h-4 w-4" />
            Log out
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountDropdown;
