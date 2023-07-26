import { notFound } from "next/navigation";

import { db } from "@/lib/db";
import { Shell } from "@/components/Shell";
import { Header } from "@/components/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import UpdateCommunityClient from "@/components/ClientWrapper/UpdateCommunityClient";

interface CommunityEditPageProps {
  params: {
    communityId: string;
  };
}

const CommunityEditPage = async ({ params }: CommunityEditPageProps) => {
  const { communityId } = params;

  const community = await db.community.findFirst({
    where: {
      id: communityId,
    },
  });

  if (!community) {
    notFound();
  }

  return (
    <Shell layout="dashboard">
      <Header
        title={community.name}
        goBackLink={`/community/${community.category.toLowerCase()}/${
          community.id
        }`}
      />
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Update community</CardTitle>
          <CardDescription>
            Update the content of this community.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UpdateCommunityClient community={community} />
        </CardContent>
      </Card>
    </Shell>
  );
};

export default CommunityEditPage;
