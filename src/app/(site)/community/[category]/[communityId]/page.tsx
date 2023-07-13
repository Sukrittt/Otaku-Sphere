import { notFound, redirect } from "next/navigation";
import Link from "next/link";

import { db } from "@/lib/db";
import { Shell } from "@/components/Shell";
import { getAuthSession } from "@/lib/auth";
import { Header } from "@/components/Header";
import { buttonVariants } from "@/ui/Button";
import { cn } from "@/lib/utils";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import Posts from "@/components/Posts";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

interface CommunityCategoryPageProps {
  params: {
    communityId: string;
  };
}

const CommunityCategoryPage = async ({
  params,
}: CommunityCategoryPageProps) => {
  const { communityId } = params;
  const session = await getAuthSession();

  const community = await db.community.findUnique({
    where: { id: communityId },
    include: {
      creator: true,
      post: {
        orderBy: {
          comment: {
            _count: "desc",
          },
        },
        take: INFINITE_SCROLLING_PAGINATION_RESULTS,
        include: {
          comment: true,
          creator: true,
          like: true,
          community: true,
        },
      },
    },
  });

  if (!community) {
    notFound();
  }

  if (!session) {
    redirect("/sign-in");
  }

  const baseLink = `/community/${community.category.toLowerCase()}`;

  return (
    <Shell layout="dashboard">
      <Header
        title={community.name}
        description={community.description}
        goBackLink={baseLink}
      />
      <div className="flex items-center gap-x-2">
        <Link
          href={`${baseLink}/${community.id}/post`}
          className={cn(buttonVariants(), "w-fit")}
        >
          Create a post
        </Link>
        {community.creator.id === session.user.id && (
          <Link
            href={`${baseLink}/${community.id}/edit`}
            className={cn(buttonVariants({ variant: "outline" }), "w-fit")}
          >
            Edit details
          </Link>
        )}
      </div>
      <Posts initialPosts={community.post} />
    </Shell>
  );
};

export default CommunityCategoryPage;
