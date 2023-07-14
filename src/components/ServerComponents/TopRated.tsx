import Link from "next/link";

import { db } from "@/lib/db";
import { AnimeCard } from "@/components/Cards/AnimeCard";
import { formatUrl } from "@/lib/utils";

const TopRated = async () => {
  const animes = await db.anime.findMany({
    take: 4,
    orderBy: {
      totalRatings: "desc",
    },
  });

  if (animes.length === 0) return;

  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="text-2xl font-semibold tracking-tight">Top Rated</h2>
      <p className="text-sm text-muted-foreground">
        Top picks for you. Updated daily.
      </p>

      <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4">
        {animes.map((anime) => {
          const formattedHref = `/anime/${formatUrl(anime.name)}`;

          return (
            <Link key={anime.id} href={formattedHref}>
              <AnimeCard anime={anime} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TopRated;
