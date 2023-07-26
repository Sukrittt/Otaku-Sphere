"use client";
import dynamic from "next/dynamic";

const CreateCommunityForm = dynamic(
  () => import("@/components/Forms/CreateCommunityForm"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const CreateCommunityClient = () => {
  return <CreateCommunityForm />;
};

export default CreateCommunityClient;
