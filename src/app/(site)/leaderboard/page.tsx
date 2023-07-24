import { Metadata } from "next";

import { db } from "@/lib/db";
import { Shell } from "@/components/Shell";
import { env } from "@/env.mjs";
import { INFINITE_SCROLLING_PAGINATION_LEADERBOARD } from "@/config";
import LeaderboardAnimes from "@/components/InfiniteQuery/LeaderboardAnimes";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Leaderboard",
  description: "Displaying ranking of anime based on its ratings.",
};

const LeaderboardPage = async () => {
  const initialLeaderBoardAnimes = await db.anime.findMany({
    take: INFINITE_SCROLLING_PAGINATION_LEADERBOARD,
    orderBy: {
      totalRatings: "desc",
    },
    include: {
      rating: true,
    },
  });

  return (
    <Shell className="w-full">
      <h1 className="text-4xl text-center font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl lg:leading-[1.1]">
        Leaderboard
      </h1>
      <LeaderboardAnimes initialLeaderBoardAnimes={initialLeaderBoardAnimes} />
    </Shell>
  );
};

export default LeaderboardPage;
