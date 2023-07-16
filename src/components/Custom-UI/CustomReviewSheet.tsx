"use client";
import { FC, ReactNode } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/ui/Sheet";
import { buttonVariants } from "@/ui/Button";
import { cn } from "@/lib/utils";
import AddAnimeReviewForm from "@/components/Forms/AddAnimeReviewForm";

interface CustomReviewSheetProps {
  children: ReactNode;
  animeId: string;
}

const CustomReviewSheet: FC<CustomReviewSheetProps> = ({
  children,
  animeId,
}) => {
  return (
    <Sheet>
      <SheetTrigger
        className={cn(buttonVariants({ variant: "outline" }), "w-fit")}
      >
        {children}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add your review</SheetTitle>
          <SheetDescription>
            Add your review which will help others. Click save when you&rsquo;re
            done.
          </SheetDescription>
        </SheetHeader>
        <AddAnimeReviewForm animeId={animeId} />
      </SheetContent>
    </Sheet>
  );
};

export default CustomReviewSheet;
