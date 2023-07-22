import { notFound, redirect } from "next/navigation";

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
import { getAuthSession } from "@/lib/auth";
import UpdateAnimeForm from "@/components/Forms/UpdateAnimeForm";

interface AnimeUpdatePageProps {
  params: {
    anime: string;
  };
}

const AnimeUpdatePage = async ({ params }: AnimeUpdatePageProps) => {
  const { anime: animeId } = params;
  const session = await getAuthSession();

  if (!session) {
    redirect("/");
  }

  const anime = await db.anime.findFirst({
    where: {
      id: animeId,
    },
  });

  if (!anime) {
    notFound();
  }

  return (
    <Shell layout="dashboard">
      <Header title={anime.name} size="sm" goBackLink="/admin/anime" />
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Update anime</CardTitle>
          <CardDescription>
            Update the content of this anime or delete it.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UpdateAnimeForm anime={anime} />
        </CardContent>
      </Card>
    </Shell>
  );
};

export default AnimeUpdatePage;
