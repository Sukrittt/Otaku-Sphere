"use client";
import dynamic from "next/dynamic";
import { Anime } from "@prisma/client";

import { Skeleton } from "@/ui/Skeleton";
import { AnimeAdminSkeletonCard } from "@/components/SkeletonLoaders/AdminAnimeSkeleton";

const Animes = dynamic(() => import("@/components/InfiniteQuery/Animes"), {
  ssr: false,
  loading: () => <AnimeSkeleton />,
});

const AnimeClient = ({ initialAnimes }: { initialAnimes: Anime[] }) => {
  return <Animes initialAnimes={initialAnimes} />;
};

export default AnimeClient;

const AnimeSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex gap-x-2 items-center px-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-16" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index}>
            <AnimeAdminSkeletonCard />
          </div>
        ))}
      </div>
    </div>
  );
};
