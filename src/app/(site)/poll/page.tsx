import Link from "next/link";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { Shell } from "@/components/Shell";
import { Header } from "@/components/Header";
import { buttonVariants } from "@/ui/Button";
import { getAuthSession } from "@/lib/auth";
import { INFINITE_SCROLLING_PAGINATION_BROWSE } from "@/config";
import PollClient from "@/components/ClientWrapper/PollClient";

const PollPage = async () => {
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
        gt: new Date(), // only show polls that haven't expired yet
      },
    },
  });

  return (
    <Shell layout="dashboard" className="px-1">
      <Header title="Anime Poll" description="Your voice, Your vote!" />
      <Link
        href="/poll/create"
        className={cn(buttonVariants({ size: "sm" }), "w-fit")}
      >
        Create Poll
      </Link>
      <PollClient
        initialPolls={initialPolls}
        interaction
        sessionId={session.user.id}
      />
    </Shell>
  );
};

export default PollPage;
