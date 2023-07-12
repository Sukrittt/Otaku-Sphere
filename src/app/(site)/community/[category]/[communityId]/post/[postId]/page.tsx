import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { db } from "@/lib/db";
import { Shell } from "@/components/Shell";
import { Card, CardContent, CardFooter, CardHeader } from "@/ui/Card";
import LikePost from "@/components/LikePost";
import { getAuthSession } from "@/lib/auth";
import { Icons } from "@/components/Icons";
import CommentCard from "@/components/Cards/CommentCard";
import AddCommentForm from "@/components/Forms/AddCommentForm";
import { Button, buttonVariants } from "@/ui/Button";
import { cn, formatTimeToNow } from "@/lib/utils";
import PostDropdown from "@/components/Dropdown/PostDropdown";

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
      comment: {
        include: {
          author: true,
        },
      },
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
    <Shell>
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
              {post.creator.id === session.user.id && (
                <PostDropdown post={post}>
                  <Button size="icon" variant="ghost">
                    <Icons.options className="h-4 w-4" />
                  </Button>
                </PostDropdown>
              )}
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">
                Posted by {`u/${formattedName}`} ·{" "}
                {formatTimeToNow(new Date(post.createdAt))}
              </span>
              <h1 className="line-clamp-1 text-3xl font-bold tracking-tight py-1 md:text-4xl">
                {post.title}
              </h1>
            </div>
            <p className="text-muted-foreground text-md">{post.message}</p>
          </div>
          <div className="flex items-center gap-x-5">
            <div className="flex items-center gap-x-1">
              <Icons.feedback className="h-3.5 w-3.5" />
              <span className="text-sm text-muted-foreground">
                {post.comment.length}
              </span>
            </div>
            <LikePost
              likes={post.like.length}
              initialLike={initialLike}
              postId={post.id}
            />
          </div>
        </CardHeader>
        <CardContent className="w-full flex flex-col gap-y-4 py-5">
          <AddCommentForm postId={post.id} />
        </CardContent>
        {post.comment.length > 0 && (
          <CardFooter className="border-t py-3">
            <div className="flex flex-col gap-y-6 w-full">
              {post.comment.map((commentItem) => (
                <CommentCard key={commentItem.id} comment={commentItem} />
              ))}
            </div>
          </CardFooter>
        )}
      </Card>
    </Shell>
  );
};

export default IndividualPostPage;
