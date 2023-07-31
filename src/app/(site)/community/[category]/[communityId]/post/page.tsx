import { notFound } from "next/navigation";
import { Metadata } from "next";

import { db } from "@/lib/db";
import { Shell } from "@/components/Shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/Card";
import { env } from "@/env.mjs";
import CreatePostClient from "@/components/ClientWrapper/CreatePostClient";
import { ShowBack } from "@/components/Header";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Create a post",
  description:
    "Share your thoughts and ideas with the community by creating a post. Engage with other users through comments and likes on your posts and discover diverse perspectives.",
};

interface CreatePostPageProps {
  params: {
    communityId: string;
    category: string;
  };
}

const CreatePostPage = async ({ params }: CreatePostPageProps) => {
  const { category, communityId } = params;

  const community = await db.community.findFirst({
    where: {
      id: communityId,
    },
    select: {
      name: true,
    },
  });

  if (!community) {
    notFound();
  }

  const formattedHastag = community.name.toLowerCase().split(" ").join("-");

  const formattedCategory =
    category.charAt(0).toUpperCase() + category.slice(1);

  const formattedHref = `/community/${category}/${communityId}`;

  return (
    <Shell layout="dashboard">
      <Card className="flex h-full flex-col">
        <CardHeader className="flex-1">
          <ShowBack href={formattedHref} />
          <CardTitle>Create a new post</CardTitle>
          <CardDescription className="line-clamp-2">
            This post will be displayed in the{" "}
            <span className="font-semibold">#{formattedHastag}</span> community.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreatePostClient
            category={formattedCategory}
            communityId={communityId}
          />
        </CardContent>
      </Card>
    </Shell>
  );
};

export default CreatePostPage;
