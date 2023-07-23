import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import ReviewInfiniteFetching from "@/components/Reviews";
import { INFINITE_SCROLLING_PAGINATION_ANIME } from "@/config";

interface ReviewsProps {
  animeId: string;
}

const Reviews = async ({ animeId }: ReviewsProps) => {
  const session = await getAuthSession();

  const reviews = await db.reviews.findMany({
    where: {
      animeId,
    },
    include: {
      user: true,
      reviewLikes: true,
    },
    orderBy: {
      reviewLikes: {
        _count: "desc",
      },
    },
    take: INFINITE_SCROLLING_PAGINATION_ANIME,
  });

  return (
    <ReviewInfiniteFetching
      animeId={animeId}
      session={session}
      initialReviews={reviews}
    />
  );
};

export default Reviews;
