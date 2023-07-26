"use client";
import { Session } from "next-auth";
import dynamic from "next/dynamic";

import { Skeleton } from "@/ui/Skeleton";

const AnimeRating = dynamic(() => import("@/components/AnimeRating"), {
  ssr: false,
  loading: () => (
    <div className="space-y-2 w-full">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-full md:w-3/4" />
    </div>
  ),
});

interface AnimeRatingProps {
  animeId: string;
  userRating: number | undefined;
  session: Session | null;
}

const AnimeRatingClient = ({
  animeId,
  session,
  userRating,
}: AnimeRatingProps) => {
  return (
    <AnimeRating animeId={animeId} session={session} userRating={userRating} />
  );
};

export default AnimeRatingClient;
