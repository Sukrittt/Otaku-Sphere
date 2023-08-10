import { Card, CardContent, CardHeader, CardTitle } from "@/ui/Card";
import { calculateIncreasePercentage } from "@/lib/utils";
import { OverviewType } from "@/types/item-type";
import { Icons } from "@/components/Icons";

const OverviewDisplay = ({ data }: { data: OverviewType[] }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 pb-24">
      {data.map((item, index) => {
        const Icon =
          item.category === "user"
            ? Icons.users
            : item.category === "anime"
            ? Icons.anime
            : Icons.activity;

        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                +{item.count.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                +
                {calculateIncreasePercentage(
                  item.count,
                  item.previousMonthCount
                )}
                % from last month
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default OverviewDisplay;
