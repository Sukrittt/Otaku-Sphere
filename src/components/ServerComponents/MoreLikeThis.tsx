import { FC } from "react";
import { Anime } from "@prisma/client";

import { db } from "@/lib/db";
import AnimeCard from "@/components/Cards/AnimeCard";

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

  if (sameGenreAnimes.length === 0) {
    return (
      <p className="font-medium text-muted-foreground">
        More anime of this genre are yet to be added.
      </p>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-5">
      {sameGenreAnimes.map((anime) => {
        return <AnimeCard key={anime.id} anime={anime} />;
      })}
    </div>
  );
};

export default MoreLikeThis;
