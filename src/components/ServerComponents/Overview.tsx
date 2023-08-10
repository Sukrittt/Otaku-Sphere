import { db } from "@/lib/db";
import OverviewClient from "@/components/ClientWrapper/OverviewClient";
import { OverviewType } from "@/types/item-type";

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
    db.poll.count(),
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
    db.poll.count({
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
    pollCount,
    previousMonthUserCount,
    previousMonthAnimeCount,
    previousMonthPollCount,
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
      title: "Total Polls",
      category: "poll",
      count: pollCount,
      previousMonthCount: previousMonthPollCount,
    },
  ];

  return <OverviewClient data={data} />;
};

export default Overview;
