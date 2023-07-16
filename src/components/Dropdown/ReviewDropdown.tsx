"use client";
import { FC } from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/DropdownMenu";
import { Icons } from "@/components/Icons";
import { toast } from "@/hooks/use-toast";
import { useAuthToast } from "@/hooks/useAuthToast";
import { AnimeReviewDeleteSchemaType } from "@/lib/validators/anime";

interface ReviewDropdownProps {
  children: React.ReactNode;
  reviewId: string;
}

const ReviewDropdown: FC<ReviewDropdownProps> = ({ children, reviewId }) => {
  const router = useRouter();

  const { endErrorToast, loginToast } = useAuthToast();

  const { mutate: deleteReview } = useMutation({
    mutationFn: async () => {
      const payload: AnimeReviewDeleteSchemaType = {
        reviewId,
      };

      const { data } = await axios.post("/api/anime/review/delete", payload);

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
            description: "The review you are trying to delete does not exist.",
            variant: "destructive",
          });
        }
        if (statusCode === 403) {
          return toast({
            title: "Forbidden",
            description: "You are not authorized to delete this review.",
            variant: "destructive",
          });
        }
      }

      endErrorToast();
    },
    onSuccess: () => {
      router.refresh();
      toast({
        description: "Review deleted successfully.",
      });
    },
    onMutate: () => {
      toast({
        description: "Please wait while we are deleting your review.",
      });
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => deleteReview()}>
          <div className="flex items-center gap-x-2 pl-2 text-sm">
            <Icons.delete className="h-3.5 w-3.5" />
            Delete
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ReviewDropdown;
