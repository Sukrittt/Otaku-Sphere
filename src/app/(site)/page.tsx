import { Suspense } from "react";
import { Balancer } from "react-wrap-balancer";
import Link from "next/link";

import { db } from "@/lib/db";
import { Shell } from "@/components/Shell";
import { Icons } from "@/components/Icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/Card";
import { calculateIncreasePercentage, cn } from "@/lib/utils";
import TopRated from "@/components/ServerComponents/TopRated";
import RecentlyAdded from "@/components/ServerComponents/RecentlyAdded";
import { categories } from "@/data/community";
import { buttonVariants } from "@/ui/Button";
import UserDesigned from "@/components/ServerComponents/UserDesigned";
import AnimeCardSkeleton from "@/components/SkeletonLoaders/AnimeCardSkeleton";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function Home() {
  const currentDate = new Date();
  const previousMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1
  );

  const promises = [
    db.user.count(),
    db.anime.count(),
    db.community.count(),
    db.user.count({
      where: {
        createdAt: {
          lte: previousMonth,
        },
      },
    }),
    db.anime.count({
      where: {
        createdAt: {
          lte: previousMonth,
        },
      },
    }),
    db.community.count({
      where: {
        createdAt: {
          lte: previousMonth,
        },
      },
    }),
  ];

  const [
    userCount,
    animeCount,
    communityCount,
    previousMonthUserCount,
    previousMonthAnimeCount,
    previousMonthCommunityCount,
  ] = await Promise.all(promises);

  return (
    <Shell>
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="mx-auto flex w-full max-w-[64rem] flex-col items-center justify-center gap-4 pb-8 pt-6 text-center md:pb-12 md:pt-10 lg:pt-24 lg:pb-10"
      >
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
          Discover, Connect, and Explore the Fascinating World of Anime
        </h1>
        <Balancer className="max-w-[46rem] text-lg text-muted-foreground sm:text-xl">
          Unleash your Otaku Spirit and Dive into a Captivating Universe of
          Animated Wonders, Where Imagination Knows No Bounds
        </Balancer>
      </section>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 pb-24">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Icons.users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <Suspense fallback={<p className="text-4xl">Loading....</p>}>
            <CardContent>
              <div className="text-2xl font-bold">
                +{userCount.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                +
                {calculateIncreasePercentage(userCount, previousMonthUserCount)}
                % from last month
              </p>
            </CardContent>
          </Suspense>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Animes</CardTitle>
            <Icons.anime className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <Suspense fallback={<p className="text-4xl">Loading....</p>}>
            <CardContent>
              <div className="text-2xl font-bold">
                +{animeCount.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                +
                {calculateIncreasePercentage(
                  animeCount,
                  previousMonthAnimeCount
                )}
                % from last month
              </p>
            </CardContent>
          </Suspense>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Communities
            </CardTitle>
            <Icons.boxes className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <Suspense fallback={<p className="text-4xl">Loading....</p>}>
            <CardContent>
              <div className="text-2xl font-bold">
                +{communityCount.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                +
                {calculateIncreasePercentage(
                  communityCount,
                  previousMonthCommunityCount
                )}
                % from last month
              </p>
            </CardContent>
          </Suspense>
        </Card>
      </div>
      <div className="flex flex-col gap-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Top Rated</h2>
        <p className="text-sm text-muted-foreground">
          Top picks for you. Updated daily.
        </p>
        <Suspense fallback={<AnimeCardSkeleton />}>
          <TopRated />
        </Suspense>
      </div>
      <div className="flex flex-col gap-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Recently Added
        </h2>
        <p className="text-sm text-muted-foreground">
          Stay tuned with the latest anime.
        </p>

        <Suspense fallback={<AnimeCardSkeleton />}>
          <RecentlyAdded />
        </Suspense>
      </div>

      <div className="flex flex-col gap-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Made for you</h2>
        <p className="text-sm text-muted-foreground">Based on what you like</p>

        <Suspense fallback={<AnimeCardSkeleton />}>
          <UserDesigned />
        </Suspense>
      </div>

      <div className="flex justify-center text-sm mt-8 flex-wrap">
        {categories.map((category) => {
          const href = `/community/${category.value}`;

          return (
            <Link
              key={category.label}
              href={href}
              className={cn(
                buttonVariants({ variant: "link" }),
                "text-muted-foreground "
              )}
            >{`#${category.value}`}</Link>
          );
        })}
      </div>
    </Shell>
  );
}
