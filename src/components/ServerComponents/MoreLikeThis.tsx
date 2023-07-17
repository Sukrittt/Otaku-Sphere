import { FC } from "react";
import Link from "next/link";
import { Anime } from "@prisma/client";

import { db } from "@/lib/db";
import { formatUrl } from "@/lib/utils";
import { AnimeCard } from "@/components/Cards/AnimeCard";

interface MoreLikeThisProps {
  anime: Pick<Anime, "genre" | "name">;
}

const MoreLikeThis: FC<MoreLikeThisProps> = async ({ anime }) => {
  const sameGenreAnimes = await db.anime.findMany({
    where: {
      genre: anime.genre,
      NOT: {
        name: anime.name,
      },
    },
    orderBy: {
      totalRatings: "desc",
    },
    take: 5,
  });

  if (sameGenreAnimes.length === 0) return;

  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="text-2xl font-semibold tracking-tight">More like this</h2>
      <p className="text-sm text-muted-foreground">
        {`Explore more ${anime.genre.toLowerCase()} animes`}
      </p>

      <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-5">
        {sameGenreAnimes.map((anime) => {
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

export default MoreLikeThis;