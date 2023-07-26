"use client";
import { Anime } from "@prisma/client";
import dynamic from "next/dynamic";

const UpdateAnimeForm = dynamic(
  () => import("@/components/Forms/UpdateAnimeForm"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const UpdateAnimeClient = ({ anime }: { anime: Anime }) => {
  return <UpdateAnimeForm anime={anime} />;
};

export default UpdateAnimeClient;
