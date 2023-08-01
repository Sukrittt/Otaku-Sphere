import { db } from "@/lib/db";
import AnimeCardClient from "@/components/ClientWrapper/AnimeCardClient";

const TopRated = async () => {
  const animes = await db.anime.findMany({
    take: 5,
    orderBy: {
      totalRatings: "desc",
    },
  });

  if (animes.length === 0) return;

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-5">
      {animes.map((anime) => {
        return <AnimeCardClient key={anime.id} anime={anime} />;
      })}
    </div>
  );
};

export default TopRated;
