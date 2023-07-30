"use client";
import { FC, useEffect, useRef, useState } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useIntersection } from "@mantine/hooks";

import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import CommunityCard from "@/components/Cards/CommunityCard";
import { ExtendedCommunity } from "@/types/db";
import { Input } from "@/ui/Input";
import ComPostSkeleton from "@/components/SkeletonLoaders/ComPostSkeleton";
import { useDebounce } from "@/hooks/use-debounce";

interface CommunitiesProps {
  initialCommunities: ExtendedCommunity[];
  category?: string;
}

const Communities: FC<CommunitiesProps> = ({
  initialCommunities,
  category,
}) => {
  const lastPostRef = useRef<HTMLElement>(null);
  const [communities, setCommunities] = useState(initialCommunities);
  const [enableSearch, setEnableSearch] = useState(false);
  const [noNewData, setNoNewData] = useState(false);

  const queryClient = useQueryClient();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const infiniteQueryKey = category
    ? ["community-infinite", category, query]
    : ["community-infinite", query];

  const { data, fetchNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery(
      infiniteQueryKey,
      async ({ pageParam = 1 }) => {
        const queryUrl =
          `/api/community?limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}` +
          (!!category ? `&category=${category}` : "") +
          (!!query ? `&q=${query}` : "");

        const { data } = await axios(queryUrl);

        return data as ExtendedCommunity[];
      },
      {
        getNextPageParam: (_, pages) => {
          return pages.length + 1;
        },
        initialData: { pages: [initialCommunities], pageParams: [1] },
        enabled: enableSearch,
      }
    );

  useEffect(() => {
    if (data?.pages[data?.pages.length - 1].length === 0) {
      setNoNewData(true);
    }

    if (isFetching) return;

    setCommunities(data?.pages.flatMap((page) => page) ?? initialCommunities);
  }, [data, initialCommunities, isFetching]);

  useEffect(() => {
    setEnableSearch(false);

    if (debouncedQuery) {
      setEnableSearch(true);

      const infiniteQueryKey = category
        ? ["community-infinite", category, query]
        : ["community-infinite", query];
      queryClient.resetQueries(infiniteQueryKey);
    }
  }, [query, debouncedQuery, queryClient, category]);

  useEffect(() => {
    if (entry?.isIntersecting && !noNewData) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage, noNewData]);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex gap-x-2 items-center px-1">
        <Input
          placeholder="Type a community name here."
          onChange={(e) => setQuery(e.target.value)}
          disabled={isFetching}
        />
      </div>

      {communities.map((community, index) => {
        if (index === communities.length - 1) {
          return (
            <div key={community.id} ref={ref}>
              <CommunityCard community={community} />
            </div>
          );
        } else {
          return (
            <div key={community.id}>
              <CommunityCard community={community} />
            </div>
          );
        }
      })}
      {communities.length === 0 && (
        <p className="text-muted-foreground text-sm text-center">
          No communities found.
        </p>
      )}
      {isFetchingNextPage && <ComPostSkeleton length={3} />}
    </div>
  );
};

export default Communities;
