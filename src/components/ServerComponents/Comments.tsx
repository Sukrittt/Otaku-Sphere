import { db } from "@/lib/db";
import { CardFooter } from "@/ui/Card";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import CommentClient from "@/components/ClientWrapper/CommentClient";

interface CommentsProps {
  postId: string;
}

const Comments = async ({ postId }: CommentsProps) => {
  const comments = await db.comment.findMany({
    where: {
      postId,
    },
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: INFINITE_SCROLLING_PAGINATION_RESULTS,
  });

  if (comments.length === 0) return;

  return (
    <CardFooter className="py-3 border-t">
      <CommentClient initialComments={comments} postId={postId} />
    </CardFooter>
  );
};

export default Comments;
