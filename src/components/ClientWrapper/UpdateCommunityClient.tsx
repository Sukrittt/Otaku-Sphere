"use client";
import dynamic from "next/dynamic";
import { Community } from "@prisma/client";

const UpdateCommunityForm = dynamic(
  () => import("@/components/Forms/UpdateCommunityForm"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const UpdateCommunityClient = ({ community }: { community: Community }) => {
  return <UpdateCommunityForm community={community} />;
};

export default UpdateCommunityClient;
