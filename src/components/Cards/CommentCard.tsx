import { FC } from "react";

import { ExtendedComment } from "@/types/db";

interface CommentCardProps {
  comment: ExtendedComment;
}

const CommentCard: FC<CommentCardProps> = ({ comment }) => {
  return <div>{comment.text}</div>;
};

export default CommentCard;
