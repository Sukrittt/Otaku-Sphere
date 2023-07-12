"use client";
import { FC, useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useIntersection } from "@mantine/hooks";

import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import CommunityCard from "@/components/Cards/CommunityCard";
import { ExtendedCommunity } from "@/types/db";
import { Icons } from "@/components/Icons";

interface CommunitiesProps {
  initialCommunites: ExtendedCommunity[];
  category?: string;
}

const Communities: FC<CommunitiesProps> = ({ initialCommunites, category }) => {
  const lastPostRef = useRef<HTMLElement>(null);

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["infinite-query"],
    async ({ pageParam = 1 }) => {
      const queryUrl =
        `/api/community?limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}` +
        (!!category ? `&category=${category}` : "");

      const { data } = await axios(queryUrl);

      return data as ExtendedCommunity[];
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: { pages: [initialCommunites], pageParams: [1] },
    }
  );

  const communities = data?.pages.flatMap((page) => page) ?? initialCommunites;

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  return (
    <div className="flex flex-col gap-y-4">
      {communities.map((community, index) => {
        if (index === communities.length - 1) {
          return (
            <div key={community.id} ref={ref}>
              <CommunityCard community={community} />
            </div>
          );
        } else {
          return (
            <div key={community.id} ref={ref}>
              <CommunityCard community={community} />
            </div>
          );
        }
      })}
      {isFetchingNextPage && (
        <div className="w-full flex justify-center">
          <Icons.spinner
            className="mr-2 h-4 w-4 animate-spin"
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
};

export default Communities;
