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

interface CustomAdminSheetProps {
  children: ReactNode;
}

const AddAdminForm = dynamic(() => import("@/components/Forms/AddAdminForm"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
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
