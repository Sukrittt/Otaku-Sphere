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
import { Skeleton } from "@/ui/Skeleton";

interface CustomReviewSheetProps {
  children: ReactNode;
  animeId: string;
}

const AddAnimeReviewForm = dynamic(
  () => import("@/components/Forms/AddAnimeReviewForm"),
  {
    ssr: false,
    loading: () => <PostReviewSkeleton />,
  }
);

const PostReviewSkeleton = () => {
  return (
    <div className="grid gap-5 mt-6">
      <div className="space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-[200px] w-full" />
      </div>
      <div className="flex justify-end">
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  );
};

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
      <SheetContent className="overflow-y-auto">
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
