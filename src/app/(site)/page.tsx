import { Suspense } from "react";
import { Balancer } from "react-wrap-balancer";
import Link from "next/link";

import { Shell } from "@/components/Shell";
import { cn } from "@/lib/utils";
import TopRated from "@/components/ServerComponents/TopRated";
import RecentlyAdded from "@/components/ServerComponents/RecentlyAdded";
import { categories } from "@/data/community";
import { buttonVariants } from "@/ui/Button";
import UserDesigned from "@/components/ServerComponents/UserDesigned";
import AnimeCardSkeleton from "@/components/SkeletonLoaders/AnimeCardSkeleton";
import Overview from "@/components/ServerComponents/Overview";
import OverviewSkeleton from "@/components/SkeletonLoaders/OverviewSkeleton";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function Home() {
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
      <Suspense fallback={<OverviewSkeleton />}>
        <Overview />
      </Suspense>
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

      <Suspense fallback={<CustomUserDesignedAnimeSkeleton />}>
        <UserDesigned />
      </Suspense>

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

const CustomUserDesignedAnimeSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="text-2xl font-semibold tracking-tight">Made for you</h2>
      <p className="text-sm text-muted-foreground">Based on what you like.</p>

      <AnimeCardSkeleton />
    </div>
  );
};
