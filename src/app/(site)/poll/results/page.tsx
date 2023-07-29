import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { Header } from "@/components/Header";
import { Shell } from "@/components/Shell";
import Polls from "@/components/InfiniteQuery/Polls";
import { INFINITE_SCROLLING_PAGINATION_BROWSE } from "@/config";
import { getAuthSession } from "@/lib/auth";

const PollResultsPage = async () => {
  const session = await getAuthSession();

  if (!session) {
    redirect("/sign-in");
  }

  const initialPolls = await db.poll.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      option: {
        include: {
          vote: true,
        },
      },
      creator: true,
    },
    take: INFINITE_SCROLLING_PAGINATION_BROWSE,
    where: {
      expiresAt: {
        lte: new Date(), // only show polls that have expired
      },
    },
  });

  return (
    <Shell layout="dashboard">
      <Header title="Poll Results" description="The Verdict Is In!" />
      <Polls initialPolls={initialPolls} sessionId={session.user.id} />
    </Shell>
  );
};

export default PollResultsPage;
