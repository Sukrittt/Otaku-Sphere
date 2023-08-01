import { Suspense } from "react";

import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import AnimeCardSkeleton from "@/components/SkeletonLoaders/AnimeCardSkeleton";
import AnimeCardClient from "@/components/ClientWrapper/AnimeCardClient";

const UserDesigned = async () => {
  const session = await getAuthSession();

  if (!session) return;

  const userHighestRatedAnime = await db.rating.findFirst({
    where: {
      userId: session?.user.id,
    },
    take: 1,
    orderBy: {
      rating: "desc",
    },
    include: {
      anime: true,
    },
  });

  const animes = await db.anime.findMany({
    take: 5,
    where: {
      genre: userHighestRatedAnime?.anime.genre,
    },
    orderBy: {
      totalRatings: "desc",
    },
  });

  if (animes.length === 0) return;

  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="text-2xl font-semibold tracking-tight">Made for you</h2>
      <p className="text-sm text-muted-foreground">Based on what you like.</p>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-5">
        <Suspense fallback={<AnimeCardSkeleton />}>
          {animes.map((anime) => {
            return <AnimeCardClient key={anime.id} anime={anime} />;
          })}
        </Suspense>
      </div>
    </div>
  );
};

export default UserDesigned;
