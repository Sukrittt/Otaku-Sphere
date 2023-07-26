"use client";
import { ExtendedAnime } from "@/types/db";
import dynamic from "next/dynamic";

const LeaderboardAnimes = dynamic(
  () => import("@/components/InfiniteQuery/LeaderboardAnimes"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const LeaderboardClient = ({
  initialLeaderBoardAnimes,
}: {
  initialLeaderBoardAnimes: ExtendedAnime[];
}) => {
  return (
    <LeaderboardAnimes initialLeaderBoardAnimes={initialLeaderBoardAnimes} />
  );
};

export default LeaderboardClient;
