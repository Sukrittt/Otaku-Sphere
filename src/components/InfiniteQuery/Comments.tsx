"use client";

import { FC, useEffect, useRef, useState } from "react";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

import { ExtendedComment } from "@/types/db";
import CommentCard from "@/components/Cards/CommentCard";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import CommentSkeleton from "@/components/SkeletonLoaders/CommentSkeleton";

interface CommentsProps {
  initialComments: ExtendedComment[];
  postId: string;
}

const InfiniteComments: FC<CommentsProps> = ({ initialComments, postId }) => {
  const lastPostRef = useRef<HTMLElement>(null);
  const [comments, setComments] = useState<ExtendedComment[]>(initialComments);
  const [noNewData, setNoNewData] = useState(false);

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<
    ExtendedComment[]
  >(
    [`posts-infinite-query-${postId}`],
    async ({ pageParam = 1 }) => {
      const queryUrl = `/api/post/comment?limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}&postId=${postId}`;

      const { data } = await axios(queryUrl);

      setNoNewData(false);

      return data;
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: { pages: [initialComments], pageParams: [1] },
    }
  );

  useEffect(() => {
    if (data?.pages[data?.pages.length - 1].length === 0) {
      setNoNewData(true);
    }

    setComments(data?.pages.flatMap((page) => page) ?? initialComments);
  }, [data, initialComments]);

  useEffect(() => {
    if (entry?.isIntersecting && !noNewData) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage, noNewData]);

  if (comments.length === 0) return;

  return (
    <div className="flex flex-col gap-y-6 w-full">
      {comments.map((comment, index) => {
        if (index === comments.length - 1) {
          return (
            <div key={comment.id} ref={ref}>
              <CommentCard comment={comment} />
            </div>
          );
        } else {
          return (
            <div key={comment.id}>
              <CommentCard comment={comment} />
            </div>
          );
        }
      })}
      {isFetchingNextPage && <CommentSkeleton length={5} noBorder />}
    </div>
  );
};

export default InfiniteComments;
