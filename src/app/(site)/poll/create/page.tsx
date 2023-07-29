import { Metadata } from "next";

import { Shell } from "@/components/Shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/Card";
import { env } from "@/env.mjs";
import CreatePollForm from "@/components/Forms/CreatePollForm";
import { ShowBack } from "@/components/Header";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Create Poll",
  description: "Your voice, Your vote!",
};

const CreatePollPage = () => {
  return (
    <Shell layout="dashboard">
      <Card className="flex h-full flex-col">
        <CardHeader className="flex-1">
          <ShowBack href="/poll" />
          <CardTitle>Create poll</CardTitle>
          <CardDescription className="line-clamp-2">
            Create a poll and share it with your friends.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreatePollForm />
        </CardContent>
      </Card>
    </Shell>
  );
};

export default CreatePollPage;
