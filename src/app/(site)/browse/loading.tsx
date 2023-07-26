import { Shell } from "@/components/Shell";
import AnimeCardSkeleton from "@/components/SkeletonLoaders/AnimeCardSkeleton";
import HeaderSkeleton from "@/components/SkeletonLoaders/HeaderSkeleton";
import { Skeleton } from "@/ui/Skeleton";

const BrowseLoading = () => {
  return (
    <Shell>
      <HeaderSkeleton description />
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-8 w-40" />
      </div>
      <AnimeCardSkeleton length={10} />
    </Shell>
  );
};

export default BrowseLoading;
