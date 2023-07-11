import { FC } from "react";

import { ExtendedComment } from "@/types/db";
import UserAvatar from "@/components/User/UserAvatar";
import { formatTimeToNow } from "@/lib/utils";

interface CommentCardProps {
  comment: ExtendedComment;
}

const CommentCard: FC<CommentCardProps> = ({ comment }) => {
  const formattedName = comment.author.name?.split(" ")[0].toLowerCase();

  return (
    <div className="flex gap-x-2">
      <UserAvatar user={comment.author} className="h-6 w-6" />
      <div className="flex flex-col gap-y-1">
        <div className="flex gap-x-1 items-center text-sm text-muted-foreground font font-medium">
          <span>{`u/${formattedName}`}</span>
          <span>·</span>
          <span className="text-xs">
            {formatTimeToNow(new Date(comment.createdAt))}
          </span>
        </div>
        <p className="text-zinc-800 dark:text-zinc-300 text-md">
          {comment.text}
        </p>
      </div>
    </div>
  );
};

export default CommentCard;
