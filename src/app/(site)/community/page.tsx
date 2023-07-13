import Link from "next/link";

import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { Shell } from "@/components/Shell";
import { buttonVariants } from "@/ui/Button";
import Communities from "@/components/Communities";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const CommunityPage = async () => {
  const initialCommunities = await db.community.findMany({
    take: INFINITE_SCROLLING_PAGINATION_RESULTS,
    orderBy: {
      post: {
        _count: "desc",
      },
    },
    include: {
      post: true,
      creator: true,
    },
  });

  return (
    <Shell>
      <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
        Otaku Communities
      </h1>
      <Link href="/community/create" className={cn(buttonVariants(), "w-fit")}>
        Create your own community
      </Link>
      <Communities initialCommunites={initialCommunities} />
    </Shell>
  );
};

export default CommunityPage;
