import { Suspense } from "react";
import { Balancer } from "react-wrap-balancer";

import { db } from "@/lib/db";
import { Shell } from "@/components/Shell";
import { Icons } from "@/components/Icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/Card";
import { calculateIncreasePercentage } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function Home() {
  const userCount = await db.user.count();
  const animeCount = await db.anime.count();
  const communityCount = await db.community.count();

  const currentDate = new Date(); // Get the current date
  const previousMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1
  );

  const previousMonthUserCount = await db.user.count({
    where: {
      createdAt: {
        lte: previousMonth,
      },
    },
  });

  const previousMonthAnimeCount = await db.user.count({
    where: {
      createdAt: {
        lte: previousMonth,
      },
    },
  });
  const previousMonthCommunityCount = await db.user.count({
    where: {
      createdAt: {
        lte: previousMonth,
      },
    },
  });

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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Icons.users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <Suspense fallback={<p>Loading...</p>}>
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
          <Suspense fallback={<p>Loading...</p>}>
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
          <Suspense fallback={<p>Loading...</p>}>
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
    </Shell>
  );
}
