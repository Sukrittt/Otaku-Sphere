"use client";
import { FC, useEffect, useRef, useState } from "react";
import { Anime } from "@prisma/client";
import { useIntersection } from "@mantine/hooks";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";

import { AnimeCard } from "@/components/Cards/AnimeCard";
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
  const [queryResultData, setQueryResultData] = useState<Anime[]>([]);

  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [noNewData, setNoNewData] = useState(false);
  const [emptyData, setEmptyData] = useState(false);
  const [reset, setReset] = useState(false);

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  console.log("%c outside genre", "color:yellow;", genre);
  console.log("%c outside year", "color:yellow;", year);

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["browse-anime-infinite-query"],
    async ({ pageParam = 1 }) => {
      console.log("%c refetching", "color:green");
      console.log("%c pageParam", "color:green", pageParam);

      console.log("%c api entry genre", "color:red;", genre, genre.length);
      console.log("%c api entry year", "color:red;", year, year.length);

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

  // const {
  //   data: queryResults,
  //   refetch,
  //   isFetching,
  // } = useQuery({
  //   queryFn: async () => {
  //     const queryUrl = `/api/anime?genre=${genre}&year=${year}&orderBy=totalRatings`;

  //     const { data } = await axios(queryUrl);

  //     return data as Anime[];
  //   },
  //   queryKey: ["browsing-anime-filter-query"],
  //   enabled: false, //by default it will not fetch
  // });

  // useEffect(() => {
  //   if (!queryResults) return;

  //   if (queryResults.length > 0) {
  //     setEmptyData(false);
  //     queryClient.resetQueries(["browse-anime-infinite-query"]);
  //     setQueryResultData(queryResults);
  //   } else if (genre || year) {
  //     // setEmptyData(true);
  //   }
  // }, [queryResults, genre, year, queryClient]);

  useEffect(() => {
    // if (queryResultData.length > 0) {
    //   setEmptyData(false);
    //   return setAnimes(queryResultData);
    // }

    if (data?.pages[data?.pages.length - 1].length === 0) {
      setNoNewData(true);
    }

    setAnimes(data?.pages.flatMap((page) => page) ?? initialAnimes);
  }, [data, initialAnimes]);

  useEffect(() => {
    // setReset(false);
    if (entry?.isIntersecting && !noNewData) {
      console.log("%c fetching next page", "color:green;");
      fetchNextPage();

      // if (!isFetching) {
      //   queryClient.resetQueries(["browse-anime-infinite-query"]);
      // }
    }
  }, [entry, fetchNextPage, noNewData]);

  // useEffect(() => {
  //   if (genre || year) {
  //     setNoNewData(true);
  //     refetch();
  //   } else {
  //     setNoNewData(false);
  //     setQueryResultData([]);
  //     queryClient.resetQueries(["browse-anime-infinite-query"]);
  //     setEmptyData(false);
  //   }
  // }, [genre, year, refetch, queryClient]);
  useEffect(() => {
    if (genre || year) {
      console.log("%c genre length", "color:blue;", genre.length, genre);
      console.log("%c year length", "color:blue;", year.length, year);

      console.log("resetting");
      queryClient.resetQueries(["browse-anime-infinite-query"]);
    }
  }, [genre, year, queryClient]);

  const handleResetFilters = () => {
    queryClient.resetQueries(["browse-anime-infinite-query"]);
    setQueryResultData([]);
    setNoNewData(false);
    setEmptyData(false);
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
      {!emptyData && (
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
      {emptyData && (
        <p className="text-center text-sm text-muted-foreground">
          No results found.
        </p>
      )}
      {isFetchingNextPage && <AnimeCardSkeleton length={5} />}
    </>
  );
};

export default BrowseAnime;
