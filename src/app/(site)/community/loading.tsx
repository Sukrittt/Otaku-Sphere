import Link from "next/link";

import { Shell } from "@/components/Shell";
import { buttonVariants } from "@/ui/Button";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/Skeleton";
import ComPostSkeleton from "@/components/SkeletonLoaders/ComPostSkeleton";

const loading = () => {
  return (
    <Shell layout="dashboard">
      <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
        Otaku Communities
      </h1>
      <Link href="/community/create" className={cn(buttonVariants(), "w-fit")}>
        Create your own community
      </Link>

      <div className="flex flex-col gap-y-4">
        <div className="flex gap-x-2 items-center px-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-16" />
        </div>

        <ComPostSkeleton />
      </div>
    </Shell>
  );
};

export default loading;
