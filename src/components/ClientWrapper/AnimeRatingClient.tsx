"use client";
import { Session } from "next-auth";
import dynamic from "next/dynamic";

const AnimeRating = dynamic(() => import("@/components/AnimeRating"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

interface AnimeRatingProps {
  animeId: string;
  userRating: number | undefined;
  session: Session | null;
}

const AnimeRatingClient = ({
  animeId,
  session,
  userRating,
}: AnimeRatingProps) => {
  return (
    <AnimeRating animeId={animeId} session={session} userRating={userRating} />
  );
};

export default AnimeRatingClient;
