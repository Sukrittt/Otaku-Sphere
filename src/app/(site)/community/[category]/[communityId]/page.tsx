import { notFound, redirect } from "next/navigation";
import Link from "next/link";

import { db } from "@/lib/db";
import { Shell } from "@/components/Shell";
import { getAuthSession } from "@/lib/auth";
import { Header } from "@/components/Header";
import { buttonVariants } from "@/ui/Button";
import { cn } from "@/lib/utils";
import PostCard from "@/components/Cards/PostCard";

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
    <Shell>
      <Header
        title={community.name}
        description={community.description}
        goBackLink={baseLink}
      />
      <Link
        href={`${baseLink}/${community.id}/post`}
        className={cn(buttonVariants(), "w-fit")}
      >
        Create a post
      </Link>
      {community.post.map((postItem) => (
        <PostCard key={postItem.id} post={postItem} />
      ))}
    </Shell>
  );
};

export default CommunityCategoryPage;
