import { Metadata } from "next";

import CreateCommunityForm from "@/components/Forms/CreateCommunityForm";
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
  title: "Create a community",
  description: "Create a community for your interests.",
};

const page = () => {
  return (
    <Shell layout="dashboard">
      <Card className="flex h-full flex-col">
        <CardHeader className="flex-1">
          <CardTitle>Create a community</CardTitle>
          <CardDescription className="line-clamp-2">
            Create a community for your interests.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateCommunityForm />
        </CardContent>
      </Card>
    </Shell>
  );
};

export default page;
