"use client";
import { FC, useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useIntersection } from "@mantine/hooks";

import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { ExtendedPost } from "@/types/db";
import { Icons } from "@/components/Icons";
import PostCard from "@/components/Cards/PostCard";

interface PostsProps {
  initialPosts: ExtendedPost[];
}

const Posts: FC<PostsProps> = ({ initialPosts }) => {
  const lastPostRef = useRef<HTMLElement>(null);

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["infinite-query"],
    async ({ pageParam = 1 }) => {
      const queryUrl = `/api/post?limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}&communityId=${initialPosts[0].communityId}`;

      const { data } = await axios(queryUrl);

      return data as ExtendedPost[];
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: { pages: [initialPosts], pageParams: [1] },
    }
  );

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts;

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  return (
    <div className="flex flex-col gap-y-4">
      {posts.map((post, index) => {
        if (index === posts.length - 1) {
          return (
            <div key={post.id} ref={ref}>
              <PostCard key={post.id} post={post} />
            </div>
          );
        } else {
          return (
            <div key={post.id}>
              <PostCard key={post.id} post={post} />
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

export default Posts;
