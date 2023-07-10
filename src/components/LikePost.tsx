"use client";
import { FC, useState } from "react";
import { usePrevious } from "@mantine/hooks";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/Icons";

interface LikePostProps {
  initialLike: boolean;
  likes: number;
}

const LikePost: FC<LikePostProps> = ({ initialLike, likes }) => {
  const [isLiked, setIsLiked] = useState(initialLike);
  const previousRating = usePrevious(isLiked);

  const [numberOfLikes, setNumberOfLikes] = useState(likes);
  const previousNumberOfLikes = usePrevious(numberOfLikes);

  return (
    <div className="flex items-center gap-x-1.5">
      <Icons.like
        className={cn("h-4 w-4", {
          "text-red-600": isLiked,
        })}
      />
      <span className="text-sm text-muted-foreground">{numberOfLikes}</span>
    </div>
  );
};

export default LikePost;
