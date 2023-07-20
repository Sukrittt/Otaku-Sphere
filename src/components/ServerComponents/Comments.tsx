import { db } from "@/lib/db";
import { CardFooter } from "@/ui/Card";
import CommentCard from "@/components/Cards/CommentCard";

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
    take: 10,
  });

  if (comments.length === 0) return;

  return (
    <CardFooter className="py-3 border-t">
      <div className="flex flex-col gap-y-6 w-full">
        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    </CardFooter>
  );
};

export default Comments;
