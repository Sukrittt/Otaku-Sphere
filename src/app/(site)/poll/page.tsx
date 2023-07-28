import Link from "next/link";

import { Header } from "@/components/Header";
import { Shell } from "@/components/Shell";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";

const PollPage = () => {
  return (
    <Shell layout="dashboard">
      <Header title="Anime Poll" description="Your voice, Your vote!" />
      <Link
        href="/poll/create"
        className={cn(buttonVariants({ size: "sm" }), "w-fit")}
      >
        Create Poll
      </Link>
    </Shell>
  );
};

export default PollPage;
