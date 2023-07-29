"use client";
import { FC, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { ExtendedPoll } from "@/types/db";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/Card";
import UserAvatar from "@/components/User/UserAvatar";
import { cn, formatTimeLeft } from "@/lib/utils";
import { useAuthToast } from "@/hooks/useAuthToast";
import { toast } from "@/hooks/use-toast";
import { VotePollValidatorType } from "@/lib/validators/poll";

interface PollCardProps {
  poll: ExtendedPoll;
  interaction?: boolean;
  sessionId: string;
}

const PollCard: FC<PollCardProps> = ({ poll, sessionId, interaction }) => {
  const queryClient = useQueryClient();
  const pollInfiniteQueryKey = interaction
    ? ["polls-infinite-query"]
    : ["polls-infinite-query-results"];
  const { endErrorToast, loginToast } = useAuthToast();

  const [hasVoted, setHasVoted] = useState(
    !!interaction &&
      poll.option.some((option) =>
        option.vote.some((vote) => vote.userId === sessionId)
      )
  );

  useEffect(() => {
    setHasVoted(
      !!interaction &&
        poll.option.some((option) =>
          option.vote.some((vote) => vote.userId === sessionId)
        )
    );
  }, [poll, interaction, sessionId]);

  const votedOption = poll.option.find((option) =>
    option.vote.some((vote) => vote.userId === sessionId)
  );
  const votedIndex = poll.option.findIndex((option) =>
    option.vote.some((vote) => vote.userId === sessionId)
  );

  console.log("question", poll.question);
  console.log("votedOption", votedOption);
  console.log("hasVoted", hasVoted);
  console.log("-------------");

  const formattedName = poll.creator.name?.split(" ")[0].toLowerCase();
  const totalVotes = poll.option.reduce(
    (sum, option) => sum + option.vote.length,
    0
  );

  const { mutate: votePoll, isLoading: voteLoading } = useMutation({
    mutationFn: async ({ optionId }: VotePollValidatorType) => {
      const payload: VotePollValidatorType = {
        optionId,
      };

      const { data } = await axios.post("/api/poll/vote", payload);
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
            title: "Poll does not exist.",
            description: "Try again later.",
            variant: "destructive",
          });
        }
        if (statusCode === 409) {
          return toast({
            title: "You have already voted.",
            description: "You can undo your vote and vote again.",
            variant: "destructive",
          });
        }
        if (statusCode === 410) {
          return toast({
            title: "Poll has expired",
            description: "Look for another poll.",
            variant: "destructive",
          });
        }
      }

      endErrorToast();
    },
    onMutate: () => {
      toast({
        title: "Please wait",
        description: "We are casting your vote.",
      });
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your vote was cast.",
      });

      console.log("resetting");
      queryClient.resetQueries(pollInfiniteQueryKey);
    },
  });

  const { mutate: undoVotePoll, isLoading: unvoteLoading } = useMutation({
    mutationFn: async ({ optionId }: VotePollValidatorType) => {
      const payload: VotePollValidatorType = {
        optionId,
      };

      const { data } = await axios.post("/api/poll/vote/undo", payload);
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
            title: "Poll does not exist.",
            description: "Try again later.",
            variant: "destructive",
          });
        }
        if (statusCode === 409) {
          return toast({
            title: "Your vote does not exist.",
            description: "You can vote again.",
            variant: "destructive",
          });
        }
        if (statusCode === 410) {
          return toast({
            title: "Poll has expired",
            description: "Look for another poll.",
            variant: "destructive",
          });
        }
      }

      endErrorToast();
    },
    onMutate: () => {
      toast({
        title: "Please wait",
        description: "We are removing your vote.",
      });
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your vote was removed",
      });

      console.log("resetting");
      queryClient.resetQueries(pollInfiniteQueryKey);
      setHasVoted(false);
    },
  });

  const handleVotePollOption = (optionId: string) => {
    if (hasVoted) return;

    if (voteLoading) {
      return toast({
        title: "Please wait",
        description: "We are casting your vote.",
      });
    }

    votePoll({ optionId });
  };

  const handleUndoVotePoll = () => {
    if (!hasVoted || !votedOption) return;

    if (unvoteLoading) {
      return toast({
        title: "Please wait",
        description: "We are casting your vote.",
      });
    }

    undoVotePoll({ optionId: votedOption.id });
  };

  return (
    <Card>
      <CardHeader className="space-y-4 pb-2">
        <div className="flex gap-x-2.5 items-center">
          <UserAvatar user={poll.creator} className="h-7 w-7" />
          <CardTitle>{poll.question}</CardTitle>
        </div>
        <div className="space-y-2">
          {poll.option.map((opt) => {
            const votePercentage = (opt.vote.length / totalVotes) * 100;

            return (
              <Card
                key={opt.id}
                className={cn("relative", {
                  "cursor-pointer": !hasVoted,
                })}
                onClick={() => handleVotePollOption(opt.id)}
              >
                <div
                  className="absolute h-full z-0 bg-primary-foreground rounded-md"
                  style={{
                    width: `${hasVoted ? votePercentage : 0}%`,
                  }}
                />
                <CardHeader className="p-3">
                  <div className="flex justify-between z-10">
                    <CardDescription>{opt.option}</CardDescription>
                    <CardDescription>
                      {hasVoted && `${votePercentage}%`}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </CardHeader>
      <CardFooter className="text-xs text-muted-foreground py-3">
        Created by {`u/${formattedName}`} · {totalVotes.toLocaleString()} votes
        · {formatTimeLeft(new Date(poll.expiresAt))} left{" "}
        {hasVoted && votedOption && (
          <div className="ml-1 space-x-1">
            <span>·</span>
            <span>{`You selected option ${votedIndex + 1}`}</span>
            <span>·</span>
            <span
              className="underline underline-offset-4 text-sky-600 cursor-pointer"
              onClick={handleUndoVotePoll}
            >
              Undo
            </span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default PollCard;
