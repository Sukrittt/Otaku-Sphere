"use client";
import { FC, ReactNode } from "react";
import dynamic from "next/dynamic";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/ui/Sheet";
import { Button, buttonVariants } from "@/ui/Button";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/ui/Skeleton";

const AddAnimeWatchlistForm = dynamic(
  () => import("@/components/Forms/AddAnimeWatchlistForm"),
  {
    ssr: false,
    loading: () => <WatchlistFormSkeleton />,
  }
);

interface CustomSheetProps {
  children: ReactNode;
}

const CustomSheet: FC<CustomSheetProps> = ({ children }) => {
  return (
    <Sheet>
      <SheetTrigger className={cn(buttonVariants({ size: "sm" }), "w-fit")}>
        {children}
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between">
        <div>
          <SheetHeader>
            <SheetTitle>Add anime to watchlist</SheetTitle>
            <SheetDescription>
              Add anime to your watchlist according to your choice. Click save
              when you&rsquo;re done.
            </SheetDescription>
          </SheetHeader>
          <AddAnimeWatchlistForm />
          <SheetFooter>
            <SheetClose asChild>
              <Button form="anime-watchlist-form" type="submit" size="sm">
                Save changes
              </Button>
            </SheetClose>
          </SheetFooter>
        </div>
        <div className="mt-auto">
          <SheetDescription className="text-xs">
            Note: If any of the anime selected is already in your watchlist, it
            will be ignored.
          </SheetDescription>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CustomSheet;

const WatchlistFormSkeleton = () => {
  return (
    <div className="grid gap-5 mt-6">
      <div className="space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-2/3 md:w-[200px]" />
      </div>
      <SheetFooter className="flex w-full justify-end">
        <Skeleton className="h-8 w-24" />
      </SheetFooter>
    </div>
  );
};
