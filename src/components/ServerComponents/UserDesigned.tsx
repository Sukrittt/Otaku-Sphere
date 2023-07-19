import Link from "next/link";

import { db } from "@/lib/db";
import { AnimeCard } from "@/components/Cards/AnimeCard";
import { formatUrl } from "@/lib/utils";
import { getAuthSession } from "@/lib/auth";

const UserDesigned = async () => {
  const session = await getAuthSession();

  const userHighestRatedAnime = await db.rating.findFirst({
    where: {
      userId: session?.user?.id,
    },
    take: 1,
    orderBy: {
      rating: "desc",
    },
    include: {
      anime: true,
    },
  });

  if (!userHighestRatedAnime) return;

  const animes = await db.anime.findMany({
    take: 5,
    where: {
      genre: userHighestRatedAnime.anime.genre,
    },
    orderBy: {
      totalRatings: "desc",
    },
  });

  if (animes.length === 0 || !session) return;

  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="text-2xl font-semibold tracking-tight">Made for you</h2>
      <p className="text-sm text-muted-foreground">Based on what you like</p>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-5">
        {animes.map((anime) => {
          // const formattedHref = `/anime/${formatUrl(anime.name)}`;

          return (
            // <a key={anime.id} href={formattedHref}>
            <AnimeCard key={anime.id} anime={anime} />
            // </a>
          );
        })}
      </div>
    </div>
  );
};

export default UserDesigned;
