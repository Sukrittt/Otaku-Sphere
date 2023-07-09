"use client";
import { FC, useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useIntersection } from "@mantine/hooks";
import Link from "next/link";

import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { buttonVariants } from "@/ui/Button";
import CommunityCard from "@/components/Cards/CommunityCard";
import { ExtendedCommunity } from "@/types/db";

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
      const queryUrl = `/api/community?limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}`;

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
      <div className="flex gap-x-2 flex-col md:flex-row">
        <Link href="/community/create" className={buttonVariants()}>
          Create your own community
        </Link>
      </div>
      <div className="flex flex-col gap-y-4">
        {communities.map((community) => (
          <CommunityCard key={community.id} community={community} />
        ))}
      </div>
    </div>
  );
};

export default Communities;
