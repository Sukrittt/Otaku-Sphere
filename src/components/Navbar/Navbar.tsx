import { FC } from "react";
import { Command } from "lucide-react";
import Link from "next/link";

import { getAuthSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/ui/Button";
import Searchbar from "@/components/Navbar/Searchbar";
import UserAccountDropdown from "@/components/User/UserAccountDropdown";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = async () => {
  const session = await getAuthSession();

  type navItemType = {
    id: number;
    label: string;
    href: string;
  };

  const navItems: navItemType[] = [
    {
      id: 1,
      label: "Community",
      href: "/community",
    },
    {
      id: 2,
      label: "Watchlist",
      href: "/watchlist",
    },
    {
      id: 3,
      label: "Statistics",
      href: "/statistics",
    },
  ];

  return (
    <div className="sticky top-0 z-40 w-full bg-background flex space-around items-center py-3 border-b px-16">
      <div className="w-full flex gap-x-8 items-center">
        <div className="relative z-20 flex items-center">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "link" }),
              "text-md tracking-tighter"
            )}
          >
            <Command className="mr-2 h-5 w-5" />
            Otaku Sphere
          </Link>
        </div>
        <div className="flex items-center gap-x-4">
          {navItems.map((item) => (
            <Link
              href={item.href}
              key={item.id}
              className={cn(
                buttonVariants({ variant: "link" }),
                "text-sm font-normal"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex gap-x-4">
        <Searchbar />

        {session ? (
          <UserAccountDropdown session={session} />
        ) : (
          <Link href="/sign-in" className=" tracking-tighter">
            <Button className="mx-2 w-full" size="sm">
              Sign In
              <div className="sr-only">Sign In</div>
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
