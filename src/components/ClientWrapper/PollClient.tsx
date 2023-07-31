"use client";
import dynamic from "next/dynamic";

import { ExtendedPoll } from "@/types/db";
import PollCardsSkeleton from "@/components/SkeletonLoaders/PollCardsSkeleton";

const Polls = dynamic(() => import("@/components/InfiniteQuery/Polls"), {
  ssr: false,
  loading: () => <PollCardsSkeleton />,
});

interface PollsProps {
  initialPolls: ExtendedPoll[];
  interaction?: boolean;
  sessionId: string;
}

const PollClient = ({ initialPolls, sessionId, interaction }: PollsProps) => {
  return (
    <Polls
      initialPolls={initialPolls}
      sessionId={sessionId}
      interaction={interaction}
    />
  );
};

export default PollClient;
