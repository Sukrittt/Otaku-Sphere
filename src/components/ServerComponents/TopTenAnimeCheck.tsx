import Link from "next/link";

import { db } from "@/lib/db";

const TopTenAnimeCheck = async ({ name }: { name: string }) => {
  const topTenAnimes = await db.anime.findMany({
    orderBy: {
      totalRatings: "desc",
    },
    take: 10,
  });

  const inTopTen = topTenAnimes.findIndex((anime) => anime.name === name);

  if (inTopTen < 0) return null;

  return (
    <Link href="/statistics" className="hover:underline">{`Rank ${
      inTopTen + 1
    }`}</Link>
  );
};

export default TopTenAnimeCheck;
