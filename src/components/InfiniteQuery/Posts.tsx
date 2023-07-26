"use client";
import { FC, useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useIntersection } from "@mantine/hooks";

import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { ExtendedPost } from "@/types/db";
import PostCard from "@/components/Cards/PostCard";
import ComPostSkeleton from "@/components/SkeletonLoaders/ComPostSkeleton";

interface PostsProps {
  initialPosts: ExtendedPost[];
  communityId: string;
}

const Posts: FC<PostsProps> = ({ initialPosts, communityId }) => {
  const lastPostRef = useRef<HTMLElement>(null);
  const [posts, setPosts] = useState<ExtendedPost[]>(initialPosts);
  const [noNewData, setNoNewData] = useState(false);

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<
    ExtendedPost[]
  >(
    [`posts-infinite-query-${communityId}`],
    async ({ pageParam = 1 }) => {
      const queryUrl = `/api/post?limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}&communityId=${communityId}`;

      const { data } = await axios(queryUrl);

      return data;
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: { pages: [initialPosts], pageParams: [1] },
    }
  );

  useEffect(() => {
    if (data?.pages[data?.pages.length - 1].length === 0) {
      setNoNewData(true);
    }

    setPosts(data?.pages.flatMap((page) => page) ?? initialPosts);
  }, [data, initialPosts]);

  useEffect(() => {
    if (entry?.isIntersecting && !noNewData) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage, noNewData]);

  if (posts.length === 0) {
    return (
      <p className="text-muted-foreground text-sm text-center">
        No posts created yet.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-y-4">
      {posts.map((post, index) => {
        if (index === posts.length - 1) {
          return (
            <div key={post.id} ref={ref}>
              <PostCard post={post} />
            </div>
          );
        } else {
          return (
            <div key={post.id}>
              <PostCard post={post} />
            </div>
          );
        }
      })}
      {isFetchingNextPage && <ComPostSkeleton length={3} />}
    </div>
  );
};

export default Posts;
