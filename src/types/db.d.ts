import { Community, Member, Post, User } from "@prisma/client";

export type ExtendedCommunity = Community & {
  creator: User;
  member: Member[];
  post: Post[];
};
