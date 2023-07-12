"use client";
import { FC } from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/DropdownMenu";
import { Icons } from "@/components/Icons";
import { ExtendedPost } from "@/types/db";
import { DeletePostValidatorType } from "@/lib/validators/community";
import { toast } from "@/hooks/use-toast";
import { useAuthToast } from "@/hooks/useAuthToast";

interface PostDropdownProps {
  children: React.ReactNode;
  post: Pick<ExtendedPost, "id" | "creator" | "community">;
}

const PostDropdown: FC<PostDropdownProps> = ({ children, post }) => {
  const router = useRouter();
  const pathname = usePathname();

  const { endErrorToast, loginToast } = useAuthToast();

  const { mutate: deletePost } = useMutation({
    mutationFn: async () => {
      const payload: DeletePostValidatorType = {
        postId: post.id,
        creatorId: post.creator.id,
      };

      const { data } = await axios.post("/api/post/delete", payload);

      return data;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          return loginToast();
        }
        if (statusCode === 404) {
          return toast({
            title: "Post not found",
            description: "The post you are trying to delete does not exist.",
            variant: "destructive",
          });
        }
      }

      endErrorToast();
    },
    onSuccess: () => {
      router.push(`/community/${post.community.category}/${post.community.id}`);
      toast({
        description: "Post deleted successfully.",
      });
    },
    onMutate: () => {
      toast({
        description: "Please wait while we delete your post...",
      });
    },
  });

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(`http://localhost:3000${pathname}`);

      toast({
        description: "Link copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleShare}>
          <div className="flex items-center gap-x-2">
            <Icons.share className="h-4 w-4" />
            Share
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => deletePost()}>
          <div className="flex items-center gap-x-2">
            <Icons.delete className="h-4 w-4" />
            Delete
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostDropdown;
