import { Balancer } from "react-wrap-balancer";

import { formatTimeToNow } from "@/lib/utils";
import { db } from "@/lib/db";
import { Card, CardContent, CardFooter, CardTitle } from "@/ui/Card";
import UserAvatar from "@/components/User/UserAvatar";
import LikeReview from "@/components/LikeReview";
import ReviewDropdown from "@/components/Dropdown/ReviewDropdown";
import { getAuthSession } from "@/lib/auth";
import { buttonVariants } from "@/ui/Button";
import { Icons } from "@/components/Icons";

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
    take: 3,
    orderBy: {
      reviewLikes: {
        _count: "desc",
      },
    },
  });

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
                    <span>{formatTimeToNow(new Date(review.createdAt))}</span>
                    <span>·</span>
                    <LikeReview
                      initialLike={initialLike}
                      likes={review.reviewLikes.length}
                      reviewId={review.id}
                    />
                  </div>
                  <div>
                    {review.user.id === session?.user.id && (
                      <ReviewDropdown reviewId={review.id}>
                        <div
                          className={buttonVariants({
                            variant: "ghost",
                            size: "icon",
                          })}
                        >
                          <Icons.options className="h-4 w-4" />
                        </div>
                      </ReviewDropdown>
                    )}
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Reviews;
