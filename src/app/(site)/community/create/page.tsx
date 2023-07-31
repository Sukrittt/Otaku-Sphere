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
import CreateCommunityClient from "@/components/ClientWrapper/CreateCommunityClient";
import { ShowBack } from "@/components/Header";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Create a community",
  description:
    "Bring like-minded individuals together by creating a community with specific hashtags. Share and engage with others who share your interests.",
};

const page = () => {
  return (
    <Shell layout="dashboard">
      <Card className="flex h-full flex-col">
        <CardHeader className="flex-1">
          <ShowBack href="/community" />
          <CardTitle>Create a community</CardTitle>
          <CardDescription className="line-clamp-2">
            Create a community for your interests.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateCommunityClient />
        </CardContent>
      </Card>
    </Shell>
  );
};

export default page;
