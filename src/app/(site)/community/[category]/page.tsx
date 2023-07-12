import { db } from "@/lib/db";
import { Shell } from "@/components/Shell";
import Communities from "@/components/Communities";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface CommunityCategoryPageProps {
  params: {
    category: string;
  };
}

const CommunityCategoryPage = async ({
  params,
}: CommunityCategoryPageProps) => {
  const { category } = params;
  const formattedCategory = category[0].toUpperCase() + category.slice(1);

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
    where: {
      category: formattedCategory,
    },
  });

  return (
    <Shell layout="dashboard">
      <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
        {formattedCategory} Communities
      </h1>
      <Link href="/community/create" className={cn(buttonVariants(), "w-fit")}>
        Create your own community
      </Link>
      <Communities initialCommunites={initialCommunities} category={category} />
    </Shell>
  );
};

export default CommunityCategoryPage;
