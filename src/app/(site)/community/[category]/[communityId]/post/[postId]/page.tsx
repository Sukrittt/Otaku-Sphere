import { notFound, redirect } from "next/navigation";

import { db } from "@/lib/db";
import { Header } from "@/components/Header";
import { Shell } from "@/components/Shell";
import { Card, CardContent, CardFooter, CardHeader } from "@/ui/Card";
import LikePost from "@/components/LikePost";
import { getAuthSession } from "@/lib/auth";
import { Icons } from "@/components/Icons";
import CommentCard from "@/components/Cards/CommentCard";
import AddCommentForm from "@/components/Forms/AddCommentForm";

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

  return (
    <Shell>
      <Card>
        <CardHeader>
          <Header
            title={post.title}
            goBackLink={`/community/${category}/${communityId}`}
            description={post.message}
          />
        </CardHeader>
        <CardContent className="border-b">
          <div className="flex items-center gap-x-5">
            <div className="flex items-center gap-x-1">
              <Icons.feedback className="h-4 w-4" />
              <span className="text-sm text-muted-foreground">
                {post.comment.length}
              </span>
            </div>
            <LikePost likes={post.like.length} initialLike={initialLike} />
          </div>
        </CardContent>
        <CardFooter className="mt-2 w-full flex flex-col">
          <AddCommentForm postId={post.id} />
          {post.comment.length > 0 && (
            <div className="w-full border border-red-500">
              <p className="text-sm font-medium text-muted-foreground w-full">
                Comments
              </p>
              <div className="flex flex-col gap-y-2 w-full">
                {post.comment.map((commentItem) => (
                  <CommentCard key={commentItem.id} comment={commentItem} />
                ))}
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
    </Shell>
  );
};

export default IndividualPostPage;
