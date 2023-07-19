import { Balancer } from "react-wrap-balancer";

import { Shell } from "@/components/Shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/Card";
import { Icons } from "@/components/Icons";
import { Skeleton } from "@/ui/Skeleton";

const HomeLoading = () => {
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
          <CardContent className="space-y-1.5 mt-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Animes</CardTitle>
            <Icons.anime className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-1.5 mt-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Communities
            </CardTitle>
            <Icons.boxes className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-1.5 mt-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      </div>
    </Shell>
  );
};

export default HomeLoading;
