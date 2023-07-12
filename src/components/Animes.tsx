"use client";
import { FC, useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useIntersection } from "@mantine/hooks";

import { INFINITE_SCROLLING_PAGINATION_ANIME } from "@/config";
import { Icons } from "@/components/Icons";
import { Anime } from "@prisma/client";
import { AnimeAdminCard } from "./Cards/Anime";

interface AnimesProps {
  initialAnimes: Anime[];
}

const Animes: FC<AnimesProps> = ({ initialAnimes }) => {
  const lastPostRef = useRef<HTMLElement>(null);

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["infinite-query"],
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

  const animes = data?.pages.flatMap((page) => page) ?? initialAnimes;

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  return (
    <>
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
