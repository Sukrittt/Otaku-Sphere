import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

import { db } from "@/lib/db";
import { Shell } from "@/components/Shell";
import { Card, CardContent, CardHeader } from "@/ui/Card";
import { getAuthSession } from "@/lib/auth";
import { Icons } from "@/components/Icons";
import { buttonVariants } from "@/ui/Button";
import { cn, formatTimeToNow } from "@/lib/utils";

import Comments from "@/components/ServerComponents/Comments";
import CommentSkeleton from "@/components/SkeletonLoaders/CommentSkeleton";
import AddCommentClient from "@/components/ClientWrapper/AddCommentClient";
import LikePostClient from "@/components/ClientWrapper/LikePostClient";
import PostDropdownClient from "@/components/ClientWrapper/PostDropdownClient";

interface IndividualPostPageProps {
  params: {
    postId: string;
    communityId: string;
    category: string;
  };
}

const IndividualPostPage = async ({ params }: IndividualPostPageProps) => {
  const { postId, category, communityId } = params;
  const session = await getAuthSession();

  if (!session) {
    redirect("/sign-in");
  }

  const post = await db.post.findFirst({
    where: {
      id: postId,
    },
    include: {
      like: true,
      creator: true,
      community: true,
    },
  });

  const commentCount = await db.comment.count({
    where: {
      postId,
    },
  });

  if (!post) {
    notFound();
  }

  const initialLike = !!post.like.find(
    (eachObj) => eachObj.userId === session.user.id
  );

  const formattedName = post.creator.name?.split(" ")[0].toLowerCase();

  return (
    <Shell layout="dashboard">
      <Card>
        <CardHeader className="border-b flex flex-col gap-y-2">
          <div className="grid gap-1">
            <div className="w-full flex justify-between items-center">
              <Link
                href={`/community/${category}/${communityId}`}
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "w-fit px-0"
                )}
              >
                Go back
              </Link>
              <PostDropdownClient post={post} sessionId={session.user.id}>
                <div
                  className={buttonVariants({
                    variant: "ghost",
                    size: "icon",
                  })}
                >
                  <Icons.options className="h-4 w-4" />
                </div>
              </PostDropdownClient>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">
                Posted by {`u/${formattedName}`} ·{" "}
                {formatTimeToNow(new Date(post.createdAt))}
              </span>
              <h1 className="text-3xl font-bold tracking-tight py-1 md:text-4xl">
                {post.title}
              </h1>
            </div>
            <p className="text-muted-foreground text-md">{post.message}</p>
          </div>
          <div className="flex items-center gap-x-5">
            <div className="flex items-center gap-x-1">
              <Icons.feedback className="h-3.5 w-3.5" />
              <span className="text-sm text-muted-foreground">
                {commentCount.toLocaleString()}
              </span>
            </div>
            <LikePostClient
              likes={post.like.length}
              initialLike={initialLike}
              postId={post.id}
            />
          </div>
        </CardHeader>
        <CardContent className="w-full flex flex-col gap-y-4 py-5">
          <AddCommentClient postId={post.id} />
        </CardContent>
        <Suspense fallback={<CommentSkeleton />}>
          <Comments postId={post.id} />
        </Suspense>
      </Card>
    </Shell>
  );
};

export default IndividualPostPage;
