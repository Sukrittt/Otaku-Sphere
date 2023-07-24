import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/ui/Button";
import { categories } from "@/data/community";

const CommunityCategories = () => {
  return (
    <div className="flex justify-center text-sm mt-8 flex-wrap">
      {categories.map((category) => {
        const href = `/community/${category.value}`;

        return (
          <Link
            key={category.label}
            href={href}
            className={cn(
              buttonVariants({ variant: "link" }),
              "text-muted-foreground "
            )}
          >{`#${category.value}`}</Link>
        );
      })}
    </div>
  );
};

export default CommunityCategories;
