"use client";
import { FC, useEffect, useRef, useState } from "react";
import { Anime } from "@prisma/client";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import AnimeCard from "@/components/Cards/AnimeCard";
import { INFINITE_SCROLLING_PAGINATION_BROWSE } from "@/config";
import AnimeCardSkeleton from "@/components/SkeletonLoaders/AnimeCardSkeleton";
import { Combobox } from "@/ui/ComboBox";
import { genres } from "@/data/anime";
import { getYearData } from "@/lib/utils";
import { Button } from "@/ui/Button";

interface BrowseAnimeProps {
  initialAnimes: Anime[];
}

const BrowseAnime: FC<BrowseAnimeProps> = ({ initialAnimes }) => {
  const yearData = getYearData();
  const queryClient = useQueryClient();

  const lastPostRef = useRef<HTMLElement>(null);
  const [animes, setAnimes] = useState<Anime[]>(initialAnimes);

  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [noNewData, setNoNewData] = useState(false);
  const [reset, setReset] = useState(false);

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery(
      ["browse-anime-infinite-query", genre, year],
      async ({ pageParam = 1 }) => {
        const queryUrl = `/api/anime?limit=${INFINITE_SCROLLING_PAGINATION_BROWSE}&page=${pageParam}&orderBy=totalRatings&genre=${genre}&year=${year}`;

        const { data } = await axios(queryUrl);

        return data as Anime[];
      },
      {
        getNextPageParam: (_, pages) => {
          return pages.length + 1;
        },
        initialData: { pages: [initialAnimes], pageParams: [1] },
      }
    );

  useEffect(() => {
    if (data?.pages[data?.pages.length - 1].length === 0) {
      setNoNewData(true);
    }

    if (isFetching) return;

    setReset(false);
    setAnimes(data?.pages.flatMap((page) => page) ?? initialAnimes);
  }, [data, initialAnimes, isFetching]);

  useEffect(() => {
    if (entry?.isIntersecting && !noNewData) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage, noNewData]);

  useEffect(() => {
    setNoNewData(false);
    queryClient.resetQueries(["browse-anime-infinite-query"]);
  }, [genre, year, queryClient]);

  const handleResetFilters = () => {
    queryClient.resetQueries(["browse-anime-infinite-query"]);
    setNoNewData(false);
    setReset(true);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-y-4 justify-between sm:items-center">
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <Combobox
            data={genres}
            selectedOption={genre}
            setState={setGenre}
            placeholder="Select genre..."
            reset={reset}
            large
          />
          <Combobox
            data={yearData}
            selectedOption={year}
            placeholder="Select year..."
            setState={setYear}
            reset={reset}
            large
          />
        </div>
        <Button size="sm" onClick={handleResetFilters} className="w-fit">
          Reset filters
        </Button>
      </div>
      {isFetching && !isFetchingNextPage ? (
        <AnimeCardSkeleton length={5} />
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-5">
          {animes.map((anime, index) => {
            if (index === animes.length - 1) {
              return (
                <div key={anime.id} ref={ref}>
                  <AnimeCard anime={anime} />
                </div>
              );
            } else {
              return (
                <div key={anime.id}>
                  <AnimeCard anime={anime} />
                </div>
              );
            }
          })}
        </div>
      )}
      {!isFetching && animes.length === 0 && (
        <p className="text-center text-sm text-muted-foreground">
          No results found.
        </p>
      )}
      {isFetchingNextPage && <AnimeCardSkeleton length={5} />}
    </>
  );
};

export default BrowseAnime;
