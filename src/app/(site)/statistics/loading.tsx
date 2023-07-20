import { Skeleton } from "@/ui/Skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/Table";
import { Shell } from "@/components/Shell";
import { ScrollArea } from "@/ui/ScrollArea";

const TableColumns = ["Rank", "Anime", "Director", "Genre", "Rating", "Votes"];

const StatisticsLoading = () => {
  return (
    <Shell>
      <h1 className="text-4xl text-center font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl lg:leading-[1.1]">
        Leaderboard
      </h1>
      <ScrollArea className="w-full" orientation="horizontal">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {TableColumns.map((column, index) => (
                  <TableHead key={index}>{column}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index}>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <TableCell key={index}>
                      <Skeleton className="h-4 w-20" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </Shell>
  );
};

export default StatisticsLoading;
