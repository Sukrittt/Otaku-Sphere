"use client";
import dynamic from "next/dynamic";

const AddAnimeForm = dynamic(() => import("@/components/Forms/AddAnimeForm"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const CreateAnimeClient = () => {
  return <AddAnimeForm />;
};

export default CreateAnimeClient;
