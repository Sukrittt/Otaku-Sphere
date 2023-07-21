import { Metadata } from "next";

import { db } from "@/lib/db";
import { Shell } from "@/components/Shell";
import { ExtendedAnime } from "@/types/db";
import { AnimeRanking } from "@/types/item-type";
import { convertToSingleDecimalPlace, formatUrl } from "@/lib/utils";
import { DataTable } from "@/components/Rankings/DataTable";
import { columns } from "@/components/Rankings/TableColumn";
import { ScrollArea } from "@/ui/ScrollArea";
import { env } from "@/env.mjs";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Anime Statistics",
  description: "Displaying the top 10 anime based on the number of ratings.",
};

const StatisticsPage = async () => {
  const animes = await db.anime.findMany({
    take: 10,
    orderBy: {
      totalRatings: "desc",
    },
    include: {
      rating: true,
    },
  });

  const calculatedRating = (anime: ExtendedAnime) => {
    const totalRatings = anime.totalRatings;
    const ratingLength = anime.rating.length * 10;

    if (ratingLength === 0) return 0;

    const rawRating = (totalRatings / ratingLength) * 10;

    return convertToSingleDecimalPlace(rawRating, 2);
  };

  const structuredRankingData: AnimeRanking[] = animes.flatMap(
    (anime, index) => ({
      anime: anime.name,
      director: anime.director,
      genre: anime.genre,
      rating: calculatedRating(anime),
      rank: index + 1,
      votes: anime.rating.length.toLocaleString(),
    })
  );

  const animeHrefs: string[] = animes.flatMap(
    (anime) => `/anime/${formatUrl(anime.name)}`
  );

  return (
    <Shell>
      <h1 className="text-4xl text-center font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl lg:leading-[1.1]">
        Leaderboard
      </h1>
      <ScrollArea className="w-full" orientation="horizontal">
        <DataTable
          columns={columns}
          data={structuredRankingData}
          animeHrefs={animeHrefs}
        />
      </ScrollArea>
    </Shell>
  );
};

export default StatisticsPage;
