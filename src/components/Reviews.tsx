"use client";
import { FC, useEffect, useState } from "react";
import { Balancer } from "react-wrap-balancer";
import { ReviewLike, Reviews, User } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Session } from "next-auth";
import axios from "axios";

import { formatTimeToNow } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardTitle } from "@/ui/Card";
import UserAvatar from "@/components/User/UserAvatar";
import LikeReview from "@/components/LikeReview";
import { Button } from "@/ui/Button";
import { Icons } from "@/components/Icons";
import { INFINITE_SCROLLING_PAGINATION_ANIME } from "@/config";
import ReviewDropdownClient from "@/components/ClientWrapper/ReviewDropdownClient";

type ExtendedReview = Reviews & {
  user: User;
  reviewLikes: ReviewLike[];
};

interface ReviewsProps {
  initialReviews: ExtendedReview[];
  animeId: string;
  session: Session | null;
}

const ReviewInfiniteFetching: FC<ReviewsProps> = ({
  initialReviews,
  animeId,
  session,
}) => {
  const [reviews, setReviews] = useState(initialReviews);

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    [`anime-review-infinite-query-${animeId}`],
    async ({ pageParam = 1 }) => {
      const queryUrl = `/api/anime/review?limit=${INFINITE_SCROLLING_PAGINATION_ANIME}&page=${pageParam}&animeId=${animeId}`;
      const { data } = await axios(queryUrl);

      return data as ExtendedReview[];
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: { pages: [initialReviews], pageParams: [1] },
    }
  );

  useEffect(() => {
    setReviews(data?.pages.flatMap((page) => page) ?? initialReviews);
  }, [data, initialReviews]);

  return (
    <>
      {reviews.length === 0 ? (
        <p className="text-muted-foreground text-sm">No reviews yet.</p>
      ) : (
        <div className="flex flex-col gap-y-3">
          {reviews.map((review) => {
            const initialLike = !!review.reviewLikes.find(
              (like) => like.userId === session?.user.id
            );

            return (
              <Card key={review.id} className="lg:max-w-[66%]">
                <CardContent className="p-6 space-y-4">
                  <CardTitle>{review.title}</CardTitle>
                  <Balancer className="text-muted-foreground">
                    {review.text}
                  </Balancer>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex gap-x-1.5 items-center text-muted-foreground text-sm">
                    <UserAvatar user={review.user} className="h-7 w-7" />
                    <span>·</span>
                    <span>{`u/${review.user.name
                      ?.split(" ")[0]
                      .toLowerCase()}`}</span>
                    <span>·</span>
                    <span>{formatTimeToNow(new Date(review.createdAt)}</span>
                    <span>·</span>
                    <LikeReview
                      initialLike={initialLike}
                      likes={review.reviewLikes.length}
                      reviewId={review.id}
                    />
                  </div>
                  <div>
                    {review.user.id === session?.user.id && (
                      <ReviewDropdownClient
                        reviewId={review.id}
                        animeId={animeId}
                      >
                        <Button variant="ghost" size="icon">
                          <Icons.options className="h-4 w-4" />
                        </Button>
                      </ReviewDropdownClient>
                    )}
                  </div>
                </CardFooter>
              </Card>
            );
          })}
          <div className="lg:max-w-[66%] flex justify-end">
            <Button
              size="sm"
              variant="outline"
              disabled={isFetchingNextPage}
              className=""
              onClick={() => fetchNextPage()}
            >
              {isFetchingNextPage && (
                <Icons.spinner className="h-4 w-4 mr-2 animate-spin" />
              )}
              Read more
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewInfiniteFetching;
