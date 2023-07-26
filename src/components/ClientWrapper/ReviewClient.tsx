"use client";
import { Session } from "next-auth";
import dynamic from "next/dynamic";
import { ReviewLike, Reviews, User } from "@prisma/client";
import ReviewSkeleton from "@/components/SkeletonLoaders/ReviewSkeleton";

const ReviewInfiniteFetching = dynamic(() => import("@/components/Reviews"), {
  ssr: false,
  loading: () => <ReviewSkeleton />,
});

type ExtendedReview = Reviews & {
  user: User;
  reviewLikes: ReviewLike[];
};

interface ReviewsProps {
  initialReviews: ExtendedReview[];
  animeId: string;
  session: Session | null;
}

const ReviewClient = ({ animeId, initialReviews, session }: ReviewsProps) => {
  return (
    <ReviewInfiniteFetching
      animeId={animeId}
      initialReviews={initialReviews}
      session={session}
    />
  );
};

export default ReviewClient;
