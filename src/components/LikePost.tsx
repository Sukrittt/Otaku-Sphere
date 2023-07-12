"use client";
import { FC, useState } from "react";
import { usePrevious } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/Icons";
import { toast } from "@/hooks/use-toast";
import { useAuthToast } from "@/hooks/useAuthToast";
import { LikeValidatorType } from "@/lib/validators/like";

interface LikePostProps {
  initialLike: boolean;
  likes: number;
  postId: string;
}

const LikePost: FC<LikePostProps> = ({ initialLike, likes, postId }) => {
  const [isLiked, setIsLiked] = useState(initialLike);
  const previousRating = usePrevious(isLiked);

  const { endErrorToast, loginToast } = useAuthToast();

  const [numberOfLikes, setNumberOfLikes] = useState(likes);
  const previousNumberOfLikes = usePrevious(numberOfLikes);

  const { mutate: likePost } = useMutation({
    mutationFn: async () => {
      const payload: LikeValidatorType = { postId };

      const { data } = await axios.post("/api/post/like", payload);
      return data;
    },
    onError: (error) => {
      setNumberOfLikes(previousNumberOfLikes ?? 0);
      setIsLiked(previousRating ?? false);

      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          return loginToast();
        }
        if (statusCode === 404) {
          return toast({
            description: "The post you are trying to like does not exist.",
            variant: "destructive",
          });
        }
      }

      endErrorToast();
    },
    onMutate: () => {
      if (isLiked) {
        setNumberOfLikes((prev) => prev - 1);
        setIsLiked(false);
      } else {
        setNumberOfLikes((prev) => prev + 1);
        setIsLiked(true);
      }
    },
  });

  return (
    <div className="flex items-center gap-x-1.5">
      <Icons.like
        className={cn("h-3.5 w-3.5 cursor-pointer", {
          "text-red-600": isLiked,
        })}
        onClick={() => likePost()}
      />
      <span className="text-sm text-muted-foreground">{numberOfLikes}</span>
    </div>
  );
};

export default LikePost;
