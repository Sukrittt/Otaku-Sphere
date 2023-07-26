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

interface CustomAdminSheetProps {
  children: ReactNode;
}

const AddAdminForm = dynamic(() => import("@/components/Forms/AddAdminForm"), {
  ssr: false,
  loading: () => <AddAdminFormSkeleton />,
});

const CustomAdminSheet: FC<CustomAdminSheetProps> = ({ children }) => {
  return (
    <Sheet>
      <SheetTrigger className={cn(buttonVariants({ size: "sm" }), "w-fit")}>
        {children}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Manage admin</SheetTitle>
          <SheetDescription>
            Making other users admin will give them access to the admin panel.
          </SheetDescription>
        </SheetHeader>
        <AddAdminForm />
      </SheetContent>
    </Sheet>
  );
};

export default CustomAdminSheet;

const AddAdminFormSkeleton = () => {
  return (
    <div className="grid gap-5 mt-6">
      <div className="space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="flex items-center justify-end gap-x-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-14" />
      </div>
    </div>
  );
};
