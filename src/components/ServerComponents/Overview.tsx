"use server";
import { db } from "@/lib/db";
import { Icons } from "@/components/Icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/Card";
import { calculateIncreasePercentage } from "@/lib/utils";

const Overview = async () => {
  const currentDate = new Date();

  const firstDayOfCurrentMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfPreviousMonth = new Date(firstDayOfCurrentMonth);
  lastDayOfPreviousMonth.setDate(0);

  lastDayOfPreviousMonth.setUTCHours(23);
  lastDayOfPreviousMonth.setUTCMinutes(59);
  lastDayOfPreviousMonth.setUTCSeconds(59);

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

  const data = [
    {
      title: "Total Users",
      icon: Icons.users,
      count: userCount,
      previousMonthCount: previousMonthUserCount,
    },
    {
      title: "Total Animes",
      icon: Icons.anime,
      count: animeCount,
      previousMonthCount: previousMonthAnimeCount,
    },
    {
      title: "Total Communities",
      icon: Icons.boxes,
      count: communityCount,
      previousMonthCount: previousMonthCommunityCount,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 pb-24">
      {data.map((item, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <item.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              +{item.count.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +
              {calculateIncreasePercentage(item.count, item.previousMonthCount)}
              % from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Overview;
