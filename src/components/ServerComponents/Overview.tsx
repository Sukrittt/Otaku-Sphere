import { db } from "@/lib/db";
import { Icons } from "@/components/Icons";
import { calculateIncreasePercentage } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/Card";

const Overview = async () => {
  const currentDate = new Date();

  const firstDayOfCurrentMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfPreviousMonth = new Date(firstDayOfCurrentMonth);
  lastDayOfPreviousMonth.setDate(0);

  lastDayOfPreviousMonth.setHours(23);
  lastDayOfPreviousMonth.setMinutes(59);
  lastDayOfPreviousMonth.setSeconds(59);

  const promises = [
    db.user.count(),
    db.anime.count(),
    db.community.count(),
    db.user.count({
      where: {
        createdAt: {
          lte: lastDayOfPreviousMonth,
        },
      },
    }),
    db.anime.count({
      where: {
        createdAt: {
          lte: lastDayOfPreviousMonth,
        },
      },
    }),
    db.community.count({
      where: {
        createdAt: {
          lte: lastDayOfPreviousMonth,
        },
      },
    }),
  ];

  const [
    userCount,
    animeCount,
    communityCount,
    previousMonthUserCount,
    previousMonthAnimeCount,
    previousMonthCommunityCount,
  ] = await Promise.all(promises);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 pb-24">
      <p>userCount: {userCount}</p>
      <p>animeCount: {animeCount}</p>
      <p>communityCount: {communityCount}</p>
      <p>previousMonthUserCount: {previousMonthUserCount}</p>
      <p>previousMonthAnimeCount: {previousMonthAnimeCount}</p>
      <p>previousMonthCommunityCount: {previousMonthCommunityCount}</p>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Icons.users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            +{userCount.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            +{calculateIncreasePercentage(userCount, previousMonthUserCount)}%
            from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Animes</CardTitle>
          <Icons.anime className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            +{animeCount.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            +{calculateIncreasePercentage(animeCount, previousMonthAnimeCount)}%
            from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Communities
          </CardTitle>
          <Icons.boxes className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
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
      </Card>
    </div>
  );
};

export default Overview;
