import { db } from "@/lib/db";
import OverviewClient from "@/components/ClientWrapper/OverviewClient";
import { OverviewType } from "@/types/item-type";
// import { Card, CardContent, CardHeader, CardTitle } from "@/ui/Card";
// import { calculateIncreasePercentage } from "@/lib/utils";

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

  const data: OverviewType[] = [
    {
      title: "Total Users",
      category: "user",
      count: userCount,
      previousMonthCount: previousMonthUserCount,
    },
    {
      title: "Total Animes",
      category: "anime",
      count: animeCount,
      previousMonthCount: previousMonthAnimeCount,
    },
    {
      title: "Total Communities",
      category: "community",
      count: communityCount,
      previousMonthCount: previousMonthCommunityCount,
    },
  ];

  return <OverviewClient data={data} />;
};

export default Overview;
