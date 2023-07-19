import { db } from "@/lib/db";
import { AnimeCard } from "@/components/Cards/AnimeCard";
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
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-5">
      {animes.map((anime) => {
        return <AnimeCard key={anime.id} anime={anime} />;
      })}
    </div>
  );
};

export default UserDesigned;
