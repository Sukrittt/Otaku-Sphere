"use client";
import { FC, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Poll } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/DropdownMenu";
import { Icons } from "@/components/Icons";
import { siteConfig } from "@/config";
import { toast } from "@/hooks/use-toast";
import { DeletePollValidatorType } from "@/lib/validators/poll";
import { useAuthToast } from "@/hooks/useAuthToast";

interface PollDropdownProps {
  children: ReactNode;
  sessionId: string;
  poll: Pick<Poll, "id" | "creatorId">;
  pollInfiniteQueryKey: string[];
}

const PollDropdown: FC<PollDropdownProps> = ({
  children,
  poll,
  sessionId,
  pollInfiniteQueryKey,
}) => {
  const pathname = usePathname();
  const { loginToast, endErrorToast } = useAuthToast();

  const queryClient = useQueryClient();

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(`${siteConfig.url}${pathname}`);

      toast({
        title: "Success!",
        description: "Link copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Error!",
        description: "Could not copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  const { mutate: deletePoll } = useMutation({
    mutationFn: async () => {
      const payload: DeletePollValidatorType = {
        pollId: poll.id,
      };

      const { data } = await axios.post("/api/poll/delete", payload);

      return data;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Poll deleted successfully.",
      });

      queryClient.invalidateQueries(pollInfiniteQueryKey);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          return loginToast();
        }
        if (statusCode === 404) {
          return toast({
            title: "Poll does not exist.",
            description: "Try again later.",
            variant: "destructive",
          });
        }
      }

      endErrorToast();
    },
    onMutate: () => {
      toast({
        title: "Please wait",
        description: "We are deleting your poll.",
      });
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleShare} className="cursor-pointer">
          <div className="flex items-center gap-x-2">
            <Icons.share className="h-4 w-4" />
            Share
          </div>
        </DropdownMenuItem>
        {poll.creatorId === sessionId && (
          <DropdownMenuItem
            onClick={() => deletePoll()}
            className="cursor-pointer"
          >
            <div className="flex items-center gap-x-2">
              <Icons.delete className="h-4 w-4" />
              Delete
            </div>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PollDropdown;
