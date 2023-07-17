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
import AddAdminForm from "@/components/Forms/AddAdminForm";

interface CustomAdminSheetProps {
  children: ReactNode;
}

const CustomAdminSheet: FC<CustomAdminSheetProps> = ({ children }) => {
  return (
    <Sheet>
      <SheetTrigger className={cn(buttonVariants(), "w-fit")}>
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
