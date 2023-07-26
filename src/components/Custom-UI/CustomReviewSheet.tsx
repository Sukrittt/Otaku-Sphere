"use client";
import { FC, ReactNode } from "react";
import dynamic from "next/dynamic";

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

interface CustomReviewSheetProps {
  children: ReactNode;
  animeId: string;
}

const AddAnimeReviewForm = dynamic(
  () => import("@/components/Forms/AddAnimeReviewForm"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const CustomReviewSheet: FC<CustomReviewSheetProps> = ({
  children,
  animeId,
}) => {
  return (
    <Sheet>
      <SheetTrigger
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "w-fit"
        )}
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
