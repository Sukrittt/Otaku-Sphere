import { Comment, Community, Like, Post, User } from "@prisma/client";

export type ExtendedCommunity = Community & {
  creator: User;
  post: Post[];
};

export type ExtendedPost = Post & {
  creator: User;
  comment: Comment[];
  like: Like[];
  community: Community;
};
