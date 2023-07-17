import { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";

import { db } from "@/lib/db";
import { Shell } from "@/components/Shell";
import AnimeRating from "@/components/AnimeRating";
import { getAuthSession } from "@/lib/auth";
import { buttonVariants } from "@/ui/Button";
import { Icons } from "@/components/Icons";
import {
  cn,
  convertToSingleDecimalPlace,
  formatTimeToNow,
  formatUrl,
} from "@/lib/utils";
import TopTenAnimeCheck from "@/components/ServerComponents/TopTenAnimeCheck";
import { Card, CardContent, CardFooter, CardTitle } from "@/ui/Card";
import CustomReviewSheet from "@/components/Custom-UI/CustomReviewSheet";
import { Balancer } from "react-wrap-balancer";
import UserAvatar from "@/components/User/UserAvatar";
import LikeReview from "@/components/LikeReview";
import ReviewDropdown from "@/components/Dropdown/ReviewDropdown";
import MoreLikeThis from "@/components/ServerComponents/MoreLikeThis";
import AnimeStatus from "@/components/ServerComponents/AnimeStatus";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

interface AnimePageProps {
  params: {
    name: string;
  };
}

const AnimePage = async ({ params }: AnimePageProps) => {
  const { name: rawName } = params;
  const name = formatUrl(rawName, true);

  const session = await getAuthSession();

  const anime = await db.anime.findUnique({
    where: {
      name,
    },
    include: {
      rating: true,
      reviews: {
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
      },
    },
  });

  if (!anime) {
    notFound();
  }

  const calculatedRating = () => {
    const totalRatings = anime.totalRatings;
    const ratingLength = anime.rating.length * 10;

    if (ratingLength === 0) return 0;

    const rawRating = (totalRatings / ratingLength) * 10;

    return convertToSingleDecimalPlace(rawRating, 2);
  };

  const userRating = anime.rating.find(
    (r) => r.userId === session?.user.id
  )?.rating;

  return (
    <Shell>
      <div className="grid grid-cols-3">
        <div className="flex flex-col gap-y-8">
          <div className="h-96 w-72 relative">
            <Image
              src={anime.coverImage ?? "/images/anime-placeholder.png"}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
              alt={`${anime.name}'s cover image`}
              className="object-cover rounded-sm"
            />
          </div>
          <div className="space-y-4">
            <div className="font-medium text-muted-foreground">
              <span className="text-4xl font-bold text-zinc-800 dark:text-zinc-300">
                {calculatedRating()}
              </span>
              /10 ·{" "}
              <span className="text-xs">
                {anime.rating.length}{" "}
                {anime.rating.length == 1 ? "vote" : "votes"}
              </span>
            </div>
            <div className="text-xs font-semibold text-muted-foreground">
              <AnimeRating
                animeId={anime.id}
                userRating={userRating}
                session={session}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-4 col-span-2 md:mt-8">
          <div className="flex items-end gap-x-3">
            <h1 className="text-4xl font-bold leading-tight tracking-tighter lg:text-5xl lg:leading[1.1]">
              {anime.name}
            </h1>
            <div className="space-x-2 text-xl text-zinc-400 font-medium">
              <span>{anime.releaseYear}</span>
              <Suspense fallback={<p>Loading...</p>}>
                <TopTenAnimeCheck name={name} />
              </Suspense>
            </div>
          </div>
          <div className="flex gap-x-3 items-center text-xs font-bold">
            <span>{anime.director}</span>
            <span>{anime.genre}</span>
            <span>{anime.releaseYear}</span>
          </div>
          <p className="text-muted-foreground">{anime.description}</p>
          <div className="flex gap-x-2 items-center">
            <Link
              href={anime.trailerLink}
              target="_blank"
              className={cn(buttonVariants({ size: "sm" }), "w-fit")}
            >
              <Icons.play className="w-4 h-4 mr-2" />
              Watch Trailer
            </Link>
            {session && (
              <CustomReviewSheet animeId={anime.id}>
                <Icons.plus className="h-4 w-4 mr-2" /> Review
              </CustomReviewSheet>
            )}
          </div>
          {session && (
            <Suspense fallback={<p>Loading...</p>}>
              <AnimeStatus animeId={anime.id} session={session} />
            </Suspense>
          )}
        </div>
      </div>
      <div className="space-y-4">
        <h1 className="text-4xl font-bold leading-tight tracking-tighter lg:text-5xl lg:leading[1.1]">
          Reviews
        </h1>
        {anime.reviews.length === 0 ? (
          <p className="text-muted-foreground text-sm">No reviews yet.</p>
        ) : (
          <div className="flex flex-col gap-y-3">
            {anime.reviews.map((review) => {
              const initialLike = !!review.reviewLikes.find(
                (like) => like.userId === session?.user.id
              );

              return (
                <Card key={review.id} className="md:max-w-[66%]">
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
      </div>
      <Suspense fallback={<p className="text-4xl">Loading....</p>}>
        <MoreLikeThis
          anime={{
            genre: anime.genre,
            name: anime.name,
          }}
        />
      </Suspense>
    </Shell>
  );
};

export default AnimePage;
