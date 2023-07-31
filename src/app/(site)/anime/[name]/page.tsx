import { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

import { db } from "@/lib/db";
import { Shell } from "@/components/Shell";
import { getAuthSession } from "@/lib/auth";
import { buttonVariants } from "@/ui/Button";
import { Icons } from "@/components/Icons";
import {
  capitalizeFirstCharacter,
  cn,
  convertToSingleDecimalPlace,
  formatUrl,
} from "@/lib/utils";
import TopTenAnimeCheck from "@/components/ServerComponents/TopTenAnimeCheck";
import CustomReviewSheet from "@/components/Custom-UI/CustomReviewSheet";
import MoreLikeThis from "@/components/ServerComponents/MoreLikeThis";
import AnimeStatus from "@/components/ServerComponents/AnimeStatus";
import Reviews from "@/components/ServerComponents/Reviews";
import ReviewSkeleton from "@/components/SkeletonLoaders/ReviewSkeleton";
import AnimeCardSkeleton from "@/components/SkeletonLoaders/AnimeCardSkeleton";
import AnimeWatchers from "@/components/AnimeWatchers";
import { Skeleton } from "@/ui/Skeleton";
import AnimeRatingClient from "@/components/ClientWrapper/AnimeRatingClient";
import { env } from "@/env.mjs";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Anime Reviews",
  description:
    "Discover detailed reviews and ratings of your favorite animes. Rate an anime, write your own review, add it to your watchlist, and explore reviews from other users.",
};

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
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="flex flex-col sm:flex-row lg:flex-col gap-8">
          <div className="flex w-full sm:w-auto">
            <div className="h-96 w-72 relative">
              <Image
                src={anime.coverImage ?? "/images/anime-placeholder.png"}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                alt={`${anime.name}'s cover image`}
                className="object-cover rounded-sm"
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-4 justify-end">
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
              <AnimeRatingClient
                animeId={anime.id}
                userRating={userRating}
                session={session}
              />
            </div>
            <Suspense fallback={<Skeleton className="h-4 w-1/2" />}>
              <AnimeWatchers animeId={anime.id} />
            </Suspense>
          </div>
        </div>
        <div className="flex flex-col gap-y-4 col-span-2 mt-8">
          <div className="flex flex-col">
            <div className="text-md text-muted-foreground font-semibold">
              <Suspense>
                <TopTenAnimeCheck name={name} />
              </Suspense>
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tighter lg:text-5xl lg:leading[1.1]">
              {anime.name}
            </h1>
          </div>
          <div className="flex gap-x-3 items-center text-xs font-bold">
            <span>{anime.director}</span>
            <span>{capitalizeFirstCharacter(anime.genre)}</span>
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
            <Suspense>
              <AnimeStatus animeId={anime.id} session={session} />
            </Suspense>
          )}
        </div>
      </div>
      <div className="space-y-4">
        <h1 className="text-4xl font-bold leading-tight tracking-tighter lg:text-5xl lg:leading[1.1]">
          Reviews
        </h1>
        <Suspense fallback={<ReviewSkeleton />}>
          <Reviews animeId={anime.id} />
        </Suspense>
      </div>
      <div className="flex flex-col gap-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          More like this
        </h2>
        <p className="text-sm text-muted-foreground">
          {`Explore more ${anime.genre.toLowerCase()} animes`}
        </p>
        <Suspense fallback={<AnimeCardSkeleton />}>
          <MoreLikeThis
            anime={{
              genre: anime.genre,
              name: anime.name,
            }}
          />
        </Suspense>
      </div>
    </Shell>
  );
};

export default AnimePage;
