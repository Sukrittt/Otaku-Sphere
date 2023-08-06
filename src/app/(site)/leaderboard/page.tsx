import { Metadata } from "next";

import { db } from "@/lib/db";
import { Shell } from "@/components/Shell";
import { env } from "@/env.mjs";
import { INFINITE_SCROLLING_PAGINATION_LEADERBOARD } from "@/config";
import LeaderboardClient from "@/components/ClientWrapper/LeaderboardClient";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Leaderboard",
  description:
    "Explore the top-ranked anime based on user ratings in our leaderboard. Find the best and most popular shows according to our community's votes.",
};

const LeaderboardPage = async () => {
  const initialLeaderBoardAnimes = await db.anime.findMany({
    take: INFINITE_SCROLLING_PAGINATION_LEADERBOARD,
    orderBy: [
      {
        totalRatings: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
    include: {
      rating: true,
    },
  });

  return (
    <Shell className="w-full">
      <h1 className="text-4xl text-center font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl lg:leading-[1.1]">
        Leaderboard
      </h1>
      <LeaderboardClient initialLeaderBoardAnimes={initialLeaderBoardAnimes} />
    </Shell>
  );
};

export default LeaderboardPage;
