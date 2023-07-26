"use client";
import { ExtendedAnime } from "@/types/db";
import dynamic from "next/dynamic";
import { ScrollArea } from "@/ui/ScrollArea";
import TableSkeleton from "@/components/SkeletonLoaders/TableSkeleton";

const TableColumns = ["Rank", "Anime", "Director", "Genre", "Rating", "Votes"];

const LeaderboardAnimes = dynamic(
  () => import("@/components/InfiniteQuery/LeaderboardAnimes"),
  {
    ssr: false,
    loading: () => <LeaderboardSkeleton />,
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

const LeaderboardSkeleton = () => {
  return (
    <ScrollArea className="w-full" orientation="horizontal">
      <TableSkeleton columns={TableColumns} />
    </ScrollArea>
  );
};
