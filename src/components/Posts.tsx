"use client";
import { FC, useEffect, useRef, useState } from "react";
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
  const [posts, setPosts] = useState<ExtendedPost[]>(initialPosts);

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<
    ExtendedPost[]
  >(
    ["infinite-query"],
    async ({ pageParam = 1 }) => {
      const queryUrl = `/api/post?limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}&communityId=${initialPosts[0].communityId}`;

      console.log("queryUrl", queryUrl);

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

  // const posts = data?.pages.flatMap((page) => page) ?? initialPosts;

  console.log("initialPosts", initialPosts);
  console.log("posts", posts);
  console.log("data", data);

  useEffect(() => {
    setPosts(data?.pages.flatMap((page) => page) ?? initialPosts);
  }, [data, initialPosts]);

  useEffect(() => {
    if (entry?.isIntersecting) {
      console.log("FETCHING NEXT PAGE");
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

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
