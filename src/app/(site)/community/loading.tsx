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
        <Skeleton className="h-10 w-full" />

        <ComPostSkeleton />
      </div>
    </Shell>
  );
};

export default CommunitiesLoading;
