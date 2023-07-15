"use client";
import { FC, ReactNode } from "react";

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
import AddAnimeWatchlistForm from "@/components/Forms/AddAnimeWatchlistForm";
import { Button, buttonVariants } from "@/ui/Button";
import { cn } from "@/lib/utils";

interface CustomSheetProps {
  children: ReactNode;
}

const CustomSheet: FC<CustomSheetProps> = ({ children }) => {
  return (
    <Sheet>
      <SheetTrigger className={cn(buttonVariants(), "w-fit")}>
        {children}
      </SheetTrigger>
      <SheetContent>
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
            <Button form="anime-watchlist-form" type="submit">
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CustomSheet;
