import { notFound } from "next/navigation";
import { Metadata } from "next";

import { db } from "@/lib/db";
import CreatePostForm from "@/components/Forms/CreatePostForm";
import { Shell } from "@/components/Shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/Card";
import { env } from "@/env.mjs";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Create a post",
  description: "Create a post to share with the community.",
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

  return (
    <Shell layout="dashboard">
      <Card className="flex h-full flex-col">
        <CardHeader className="flex-1">
          <CardTitle>Create a new post</CardTitle>
          <CardDescription className="line-clamp-2">
            This post will be displayed in the{" "}
            <span className="font-semibold">#{formattedHastag}</span> community.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreatePostForm
            category={formattedCategory}
            communityId={communityId}
          />
        </CardContent>
      </Card>
    </Shell>
  );
};

export default CreatePostPage;
