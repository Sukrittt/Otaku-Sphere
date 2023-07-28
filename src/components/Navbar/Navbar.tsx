import Link from "next/link";
import dynamic from "next/dynamic";

import { getAuthSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/ui/Button";
import Searchbar from "@/components/Navbar/Searchbar";
import UserAccountDropdown from "@/components/User/UserAccountDropdown";
import { Icons } from "@/components/Icons";
import { navItemType } from "@/types/item-type";

const MobileNav = dynamic(() => import("./MobileNav"));

const Navbar = async () => {
  const session = await getAuthSession();

  const navItems: navItemType[] = [
    {
      id: 1,
      label: "Browse",
      href: "/browse",
    },
    {
      id: 2,
      label: "Community",
      href: "/community",
    },
    {
      id: 3,
      label: "Watchlist",
      href: "/watchlist",
    },
    {
      id: 4,
      label: "Leaderboard",
      href: "/leaderboard",
    },
    {
      id: 5,
      label: "Poll",
      href: "/poll",
    },
  ];

  return (
    <div className="sticky top-0 z-40 w-full bg-background flex justify-between lg:space-around items-center py-3 border-b px-8 lg:px-16">
      <MobileNav mainNavItems={navItems} session={session} />
      <div className="w-full lg:flex hidden gap-x-8 items-center">
        <div className="relative z-20 flex items-center">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "link" }),
              "text-md tracking-tighter"
            )}
          >
            <Icons.logo className="mr-2 h-6 w-6" />
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
                "text-sm font-medium"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex gap-x-4 items-center">
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
