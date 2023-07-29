import { Shell } from "@/components/Shell";
import HeaderSkeleton from "@/components/SkeletonLoaders/HeaderSkeleton";
import PollCardsSkeleton from "@/components/SkeletonLoaders/PollCardsSkeleton";
import { Skeleton } from "@/ui/Skeleton";

const PollLoading = () => {
  return (
    <Shell layout="dashboard">
      <HeaderSkeleton description />
      <Skeleton className="h-8 w-24" />

      <PollCardsSkeleton />
    </Shell>
  );
};

export default PollLoading;
