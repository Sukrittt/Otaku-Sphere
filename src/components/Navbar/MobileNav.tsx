"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";

import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/Accordion";
import { Button } from "@/ui/Button";
import { ScrollArea } from "@/ui/ScrollArea";
import { Sheet, SheetContent, SheetTrigger } from "@/ui/Sheet";
import { Icons } from "@/components/Icons";
import { navItemType } from "@/types/item-type";
import {
  adminSidebarNavItems,
  communitySidebarNavItems,
  pollSidebarNavItems,
} from "@/data";

interface MobileNavProps {
  mainNavItems: navItemType[];
  session: Session | null;
}

export default function MobileNav({ mainNavItems, session }: MobileNavProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          <Icons.menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pl-1 pr-0">
        <div className="px-7">
          <Link
            aria-label="Home"
            href="/"
            className="flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <Icons.logo
              className="mr-2 h-5 w-5 hidden dark:block"
              aria-hidden="true"
            />
            <span className="font-bold">Otaku Sphere</span>
          </Link>
        </div>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="pl-1 pr-7">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="Quick Links">
                <AccordionTrigger className="text-sm capitalize">
                  Quick Links
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-2">
                    {mainNavItems.map((item) =>
                      item.href ? (
                        <MobileLink
                          key={item.id}
                          href={String(item.href)}
                          pathname={pathname}
                          setIsOpen={setIsOpen}
                        >
                          {item.label}
                        </MobileLink>
                      ) : (
                        <div
                          key={item.id}
                          className="text-foreground/70 transition-colors"
                        >
                          {item.label}
                        </div>
                      )
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="community">
                <AccordionTrigger className="text-sm">
                  Community
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-2">
                    {communitySidebarNavItems?.map((item) =>
                      item.href ? (
                        <MobileLink
                          key={item.id}
                          href={String(item.href)}
                          pathname={pathname}
                          setIsOpen={setIsOpen}
                        >
                          <div className="flex gap-x-2 items-center">
                            <item.Icon className="h-4 w-4" />
                            {item.label}
                          </div>
                        </MobileLink>
                      ) : (
                        <div
                          key={item.id}
                          className="text-foreground/70 transition-colors"
                        >
                          {item.label}
                        </div>
                      )
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="poll">
                <AccordionTrigger className="text-sm">Poll</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-2">
                    {pollSidebarNavItems?.map((item) =>
                      item.href ? (
                        <MobileLink
                          key={item.id}
                          href={String(item.href)}
                          pathname={pathname}
                          setIsOpen={setIsOpen}
                        >
                          <div className="flex gap-x-2 items-center">
                            <item.Icon className="h-4 w-4" />
                            {item.label}
                          </div>
                        </MobileLink>
                      ) : (
                        <div
                          key={item.id}
                          className="text-foreground/70 transition-colors"
                        >
                          {item.label}
                        </div>
                      )
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {session && session.user.role === "ADMIN" && (
                <AccordionItem value="Admin Panel">
                  <AccordionTrigger className="text-sm">
                    Admin Panel
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col space-y-2">
                      {adminSidebarNavItems?.map((item) =>
                        item.href ? (
                          <MobileLink
                            key={item.id}
                            href={String(item.href)}
                            pathname={pathname}
                            setIsOpen={setIsOpen}
                          >
                            <div className="flex gap-x-2 items-center">
                              <item.Icon className="h-4 w-4" />
                              {item.label}
                            </div>
                          </MobileLink>
                        ) : (
                          <div
                            key={item.id}
                            className="text-foreground/70 transition-colors"
                          >
                            {item.label}
                          </div>
                        )
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps {
  children?: React.ReactNode;
  href: string;
  disabled?: boolean;
  pathname: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MobileLink({
  children,
  href,
  disabled,
  pathname,
  setIsOpen,
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-foreground/70 transition-colors hover:text-foreground",
        pathname === href && "text-foreground",
        disabled && "pointer-events-none opacity-60"
      )}
      onClick={() => setIsOpen(false)}
    >
      {children}
    </Link>
  );
}
