import { db } from "@/lib/db";
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

  return <CommentClient initialComments={comments} postId={postId} />;
};

export default Comments;
