import { Metadata } from "next";
import { redirect } from "next/navigation";

import { Header } from "@/components/Header";
import { Shell } from "@/components/Shell";
import { getAuthSession } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/Card";
import AddAnimeForm from "@/components/Forms/AddAnimeForm";

export const metadata: Metadata = {
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
      <Header
        title="New Anime"
        description="New anime for this application"
        size="sm"
        showBack
      />
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Add anime</CardTitle>
          <CardDescription>Add a new anime for the users</CardDescription>
        </CardHeader>
        <CardContent>
          <AddAnimeForm />
        </CardContent>
      </Card>
    </Shell>
  );
};

export default page;
