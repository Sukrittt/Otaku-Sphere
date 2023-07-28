import {
  Anime,
  Comment,
  Community,
  Like,
  Poll,
  PollOption,
  PollVote,
  Post,
  Rating,
  User,
} from "@prisma/client";

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

export type ExtendedComment = Comment & {
  author: User;
};

export type ExtendedAnime = Anime & {
  rating: Rating[];
};

export type ExtendedUser = User & {
  anime: Anime[];
  community: Community[];
  post: Post[];
  rating: Rating[];
};

export type ExtendedPoll = Poll & {
  creator: User;
  option: Array<PollOption & { vote: PollVote[] }>;
};
