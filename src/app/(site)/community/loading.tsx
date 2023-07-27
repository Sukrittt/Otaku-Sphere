import { Shell } from "@/components/Shell";
import { Skeleton } from "@/components/ui/Skeleton";
import ComPostSkeleton from "@/components/SkeletonLoaders/ComPostSkeleton";
import HeaderSkeleton from "@/components/SkeletonLoaders/HeaderSkeleton";

const CommunitiesLoading = () => {
  return (
    <Shell layout="dashboard">
      <HeaderSkeleton large />

      <Skeleton className="h-8 w-24" />

      <div className="flex flex-col gap-y-4">
        <div className="flex gap-x-2 items-center px-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-20" />
        </div>

        <ComPostSkeleton />
      </div>
    </Shell>
  );
};

export default CommunitiesLoading;
