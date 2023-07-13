import { notFound, redirect } from "next/navigation";
import Link from "next/link";

import { db } from "@/lib/db";
import { Shell } from "@/components/Shell";
import { getAuthSession } from "@/lib/auth";
import { buttonVariants } from "@/ui/Button";
import { cn } from "@/lib/utils";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import Posts from "@/components/Posts";

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
      <div className="grid gap-1">
        <a
          href={baseLink}
          className={cn(buttonVariants({ variant: "link" }), "w-fit px-0")}
        >
          Go back
        </a>
        <h1 className="line-clamp-1 text-3xl font-bold tracking-tight py-1 md:text-4xl">
          {community.name}
        </h1>
        <p className="text-muted-foreground text-md">{community.description}</p>
      </div>

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
