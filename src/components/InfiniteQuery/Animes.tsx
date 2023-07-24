"use client";
import { FC, useEffect, useRef, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useIntersection } from "@mantine/hooks";
import { Anime } from "@prisma/client";

import { INFINITE_SCROLLING_PAGINATION_ANIME } from "@/config";
import { Icons } from "@/components/Icons";
import { AnimeAdminCard } from "@/components/Cards/AdminAnime";
import { Input } from "@/ui/Input";
import { Button } from "@/ui/Button";

interface AnimesProps {
  initialAnimes: Anime[];
}

const Animes: FC<AnimesProps> = ({ initialAnimes }) => {
  const lastPostRef = useRef<HTMLElement>(null);

  const [animes, setAnimes] = useState(initialAnimes);

  const [query, setQuery] = useState("");

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["anime-infinite-query"],
    async ({ pageParam = 1 }) => {
      const queryUrl = `/api/anime?limit=${INFINITE_SCROLLING_PAGINATION_ANIME}&page=${pageParam}`;

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

  const {
    data: queryResults,
    refetch,
    isFetching,
  } = useQuery({
    queryFn: async () => {
      const queryUrl = `/api/anime?q=${query}`;

      const { data } = await axios(queryUrl);

      return data as Anime[];
    },
    queryKey: ["anime-search-query"],
    enabled: false, //by default it will not fetch
  });

  useEffect(() => {
    if (queryResults) {
      setAnimes(queryResults);
      return;
    }
    setAnimes(data?.pages.flatMap((page) => page) ?? initialAnimes);
  }, [data, queryResults, initialAnimes]);

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  return (
    <>
      <div className="flex gap-x-2 items-center px-2">
        <Input
          placeholder="Type a anime name here."
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && query.length > 0) {
              refetch();
            }
          }}
        />
        <Button
          onClick={() => refetch()}
          disabled={query.length === 0 || isFetching}
        >
          {isFetching ? (
            <Icons.spinner
              className="h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          ) : (
            "Search"
          )}
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {animes.map((anime, index) => {
          if (index === animes.length - 1) {
            return (
              <div key={anime.id} ref={ref}>
                <AnimeAdminCard anime={anime} />
              </div>
            );
          } else {
            return (
              <div key={anime.id}>
                <AnimeAdminCard anime={anime} />
              </div>
            );
          }
        })}
      </div>
      {query.length > 0 && animes.length === 0 && (
        <p className="text-center text-sm text-muted-foreground">
          No results found.
        </p>
      )}
      {isFetchingNextPage && (
        <div className="w-full flex justify-center">
          <Icons.spinner
            className="mr-2 h-4 w-4 animate-spin"
            aria-hidden="true"
          />
        </div>
      )}
    </>
  );
};

export default Animes;
