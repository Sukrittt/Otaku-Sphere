"use client";
import dynamic from "next/dynamic";

import { ExtendedCommunity } from "@/types/db";
import { Skeleton } from "@/ui/Skeleton";
import ComPostSkeleton from "@/components/SkeletonLoaders/ComPostSkeleton";

const Communities = dynamic(
  () => import("@/components/InfiniteQuery/Communities"),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col gap-y-4">
        <div className="flex gap-x-2 items-center px-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-16" />
        </div>
        <ComPostSkeleton />
      </div>
    ),
  }
);

interface CommunitiesProps {
  initialCommunities: ExtendedCommunity[];
  category?: string;
}

const CommunityClient = ({
  initialCommunities,
  category,
}: CommunitiesProps) => {
  return (
    <Communities initialCommunities={initialCommunities} category={category} />
  );
};

export default CommunityClient;
