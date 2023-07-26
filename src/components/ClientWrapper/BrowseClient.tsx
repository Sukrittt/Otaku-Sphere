"use client";
import dynamic from "next/dynamic";
import { Anime } from "@prisma/client";

import { Skeleton } from "@/ui/Skeleton";
import AnimeCardSkeleton from "@/components/SkeletonLoaders/AnimeCardSkeleton";

const BrowseAnime = dynamic(
  () => import("@/components/InfiniteQuery/BrowseAnime"),
  {
    ssr: false,
    loading: () => <BrowseAnimeSkeleton />,
  }
);

const BrowseClient = ({ initialAnimes }: { initialAnimes: Anime[] }) => {
  return <BrowseAnime initialAnimes={initialAnimes} />;
};

export default BrowseClient;

const BrowseAnimeSkeleton = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
        <Skeleton className="h-10 w-[180px]" />
        <Skeleton className="h-10 w-[180px]" />
      </div>
      <AnimeCardSkeleton length={10} />
    </>
  );
};
