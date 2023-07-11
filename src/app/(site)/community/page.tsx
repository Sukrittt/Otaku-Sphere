import { db } from "@/lib/db";
import { Shell } from "@/components/Shell";
import Communities from "@/components/Communities";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";

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
      <Communities initialCommunites={initialCommunities} />
    </Shell>
  );
};

export default CommunityPage;
