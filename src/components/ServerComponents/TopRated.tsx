import { db } from "@/lib/db";
import { AnimeCard } from "@/components/Cards/AnimeCard";

const TopRated = async () => {
  const animes = await db.anime.findMany({
    take: 5,
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

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-5">
        {animes.map((anime) => {
          return (
            <div key={anime.id}>
              <AnimeCard key={anime.id} anime={anime} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopRated;
