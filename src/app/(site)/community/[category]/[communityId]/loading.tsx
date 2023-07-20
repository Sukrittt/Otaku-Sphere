import { Skeleton } from "@/ui/Skeleton";
import { Shell } from "@/components/Shell";
import ComPostSkeleton from "@/components/SkeletonLoaders/ComPostSkeleton";
import HeaderSkeleton from "@/components/SkeletonLoaders/HeaderSkeleton";

const PostsLoading = () => {
  return (
    <Shell layout="dashboard">
      <HeaderSkeleton showBack description />
      <Skeleton className="h-8 w-24" />

      <div className="flex flex-col gap-y-4">
        <ComPostSkeleton />
      </div>
    </Shell>
  );
};

export default PostsLoading;
