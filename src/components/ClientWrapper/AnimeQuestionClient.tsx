"use client";
import dynamic from "next/dynamic";

const AnimeStatusQuestion = dynamic(
  () => import("@/components/AnimeStatusQuestion"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const AnimeQuestionClient = ({ animeId }: { animeId: string }) => {
  return <AnimeStatusQuestion animeId={animeId} />;
};

export default AnimeQuestionClient;
