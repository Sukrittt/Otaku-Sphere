import { Shell } from "@/components/Shell";
import { ScrollArea } from "@/ui/ScrollArea";
import TableSkeleton from "@/components/SkeletonLoaders/TableSkeleton";

const TableColumns = ["Rank", "Anime", "Director", "Genre", "Rating", "Votes"];

const StatisticsLoading = () => {
  return (
    <Shell>
      <h1 className="text-4xl text-center font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl lg:leading-[1.1]">
        Leaderboard
      </h1>
      <ScrollArea className="w-full" orientation="horizontal">
        <TableSkeleton columns={TableColumns} />
      </ScrollArea>
    </Shell>
  );
};

export default StatisticsLoading;
