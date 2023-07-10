import { Community, Post, User } from "@prisma/client";

export type ExtendedCommunity = Community & {
  creator: User;
  post: Post[];
};
