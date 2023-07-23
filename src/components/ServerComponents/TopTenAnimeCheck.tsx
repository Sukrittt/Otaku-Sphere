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
    <Link href="/statistics" className="hover:underline underline-offset-4">
      Top Rated
    </Link>
  );
};

export default TopTenAnimeCheck;
