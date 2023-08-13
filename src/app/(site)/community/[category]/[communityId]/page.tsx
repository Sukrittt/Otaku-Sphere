import { notFound, redirect } from "next/navigation";
import Link from "next/link";

import { db } from "@/lib/db";
import { Shell } from "@/components/Shell";
import { getAuthSession } from "@/lib/auth";
import { buttonVariants } from "@/ui/Button";
import { cn } from "@/lib/utils";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { Header } from "@/components/Header";
import PostClient from "@/components/ClientWrapper/PostClient";

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
          createdAt: "desc",
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
    <Shell layout="dashboard" className="px-1">
      <Header
        title={community.name}
        description={community.description}
        goBackLink={baseLink}
      />

      <div className="flex items-center gap-x-2">
        <Link
          href={`${baseLink}/${community.id}/post`}
          className={cn(buttonVariants({ size: "sm" }), "w-fit")}
        >
          Create a post
        </Link>
        {community.creator.id === session.user.id && (
          <Link
            href={`${baseLink}/${community.id}/edit`}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "w-fit"
            )}
          >
            Edit details
          </Link>
        )}
      </div>
      <PostClient initialPosts={community.post} communityId={communityId} />
    </Shell>
  );
};

export default CommunityCategoryPage;
