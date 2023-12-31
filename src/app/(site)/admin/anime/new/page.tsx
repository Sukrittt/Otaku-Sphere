import { Metadata } from "next";
import { redirect } from "next/navigation";

import { ShowBack } from "@/components/Header";
import { Shell } from "@/components/Shell";
import { getAuthSession } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/Card";
import { env } from "@/env.mjs";
import CreateAnimeClient from "@/components/ClientWrapper/CreateAnimeClient";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "New Anime",
  description: "Add a new anime",
};

const page = async () => {
  const session = await getAuthSession();

  if (!session) {
    redirect("/sign-in");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <Shell layout="dashboard">
      <Card>
        <CardHeader className="space-y-1">
          <ShowBack href="/admin/anime" />
          <CardTitle className="text-2xl">Add anime</CardTitle>
          <CardDescription>Add a new anime for the users</CardDescription>
        </CardHeader>
        <CardContent>
          <CreateAnimeClient />
        </CardContent>
      </Card>
    </Shell>
  );
};

export default page;
