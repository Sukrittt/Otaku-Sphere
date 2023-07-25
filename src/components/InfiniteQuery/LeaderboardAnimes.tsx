"use client";
import { FC, useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

import { ExtendedAnime } from "@/types/db";
import { AnimeRanking } from "@/types/item-type";
import { capitalizeFirstCharacter, formatUrl } from "@/lib/utils";
import { DataTable } from "@/components/Rankings/DataTable";
import { columns } from "@/components/Rankings/TableColumn";
import { INFINITE_SCROLLING_PAGINATION_LEADERBOARD } from "@/config";
import { Button } from "@/ui/Button";
import { Icons } from "@/components/Icons";
import { ScrollArea } from "@/ui/ScrollArea";

interface LeaderboardAnimesProps {
  initialLeaderBoardAnimes: ExtendedAnime[];
}

const LeaderboardAnimes: FC<LeaderboardAnimesProps> = ({
  initialLeaderBoardAnimes,
}) => {
  const [leaderboardAnimes, setLeaderboardAnimes] = useState(
    initialLeaderBoardAnimes
  );

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    [`leaderboard-infinite-query`],
    async ({ pageParam = 1 }) => {
      const queryUrl = `/api/leaderboard?limit=${INFINITE_SCROLLING_PAGINATION_LEADERBOARD}&page=${pageParam}`;
      const { data } = await axios(queryUrl);

      return data as ExtendedAnime[];
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: { pages: [initialLeaderBoardAnimes], pageParams: [1] },
    }
  );

  const structuredRankingData: AnimeRanking[] = [];

  leaderboardAnimes.forEach((anime, index, array) => {
    if (index === 0) {
      structuredRankingData.push({
        anime: anime.name,
        director: anime.director,
        genre: capitalizeFirstCharacter(anime.genre),
        stars: anime.totalRatings,
        rank: "1",
        votes: anime.rating.length.toLocaleString(),
      });
    } else {
      const previousAnime = array[index - 1];
      const currentRating = anime.totalRatings;
      const previousRating = previousAnime.totalRatings;

      if (currentRating === previousRating) {
        structuredRankingData.push({
          anime: anime.name,
          director: anime.director,
          genre: capitalizeFirstCharacter(anime.genre),
          stars: currentRating,
          rank: structuredRankingData[index - 1].rank,
          votes: anime.rating.length.toLocaleString(),
        });
      } else {
        structuredRankingData.push({
          anime: anime.name,
          director: anime.director,
          genre: capitalizeFirstCharacter(anime.genre),
          stars: currentRating,
          rank: `${index + 1}`,
          votes: anime.rating.length.toLocaleString(),
        });
      }
    }
  });

  let updatedEqualsRankingData: AnimeRanking[] = [];

  structuredRankingData.forEach((anime, index) => {
    if (index === structuredRankingData.length - 1) return;

    if (anime.rank === structuredRankingData[index + 1].rank) {
      if (!updatedEqualsRankingData[index]?.rank.endsWith("=")) {
        updatedEqualsRankingData.push({
          ...anime,
          rank: `${anime.rank} =`,
        });
      }

      updatedEqualsRankingData.push({
        ...structuredRankingData[index + 1],
        rank: `${structuredRankingData[index].rank} =`,
      });
    } else if (updatedEqualsRankingData[index]?.rank.endsWith("=")) return;
    else {
      updatedEqualsRankingData.push(anime);
    }
  });

  const animeHrefs: string[] = leaderboardAnimes.flatMap(
    (anime) => `/anime/${formatUrl(anime.name)}`
  );

  useEffect(() => {
    setLeaderboardAnimes(
      data?.pages.flatMap((page) => page) ?? initialLeaderBoardAnimes
    );
  }, [data, initialLeaderBoardAnimes]);

  return (
    <>
      <ScrollArea className="w-full" orientation="horizontal">
        <div className="w-full">
          <DataTable
            columns={columns}
            data={updatedEqualsRankingData}
            animeHrefs={animeHrefs}
          />
        </div>
      </ScrollArea>
      <div className="w-full flex justify-end -mt-2">
        <Button
          onClick={() => fetchNextPage()}
          size="sm"
          variant="outline"
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage && (
            <Icons.spinner className="h-4 w-4 mr-2 animate-spin" />
          )}
          Show more
        </Button>
      </div>
    </>
  );
};

export default LeaderboardAnimes;
