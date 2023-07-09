"use client";
import { FC, useEffect, useRef, useState } from "react";
import { Community } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useIntersection } from "@mantine/hooks";
import Link from "next/link";

import { Input } from "@/ui/Input";
import { useDebounce } from "@/hooks/use-debounce";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { buttonVariants } from "@/ui/Button";

interface SearchCommunityProps {
  initialCommunites: Community[];
}

const SearchCommunity: FC<SearchCommunityProps> = ({ initialCommunites }) => {
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 300);
  const lastPostRef = useRef<HTMLElement>(null);

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["infinite-query"],
    async ({ pageParam = 1 }) => {
      const queryUrl = `/api/posts?q=${query}&limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}`;

      const { data } = await axios(queryUrl);

      return data as Community[];
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
    <div className="flex gap-x-2 flex-col md:flex-row">
      <Input placeholder="Search communities here..." className="md:w-1/2" />
      <Link href="/community/create" className={buttonVariants()}>
        Create your own community
      </Link>
      {/* TODO: DISPLAY COMMUNITIES */}
    </div>
  );
};

export default SearchCommunity;
