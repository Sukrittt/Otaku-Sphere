import {
  Anime,
  Comment,
  Community,
  CurrentlyWatching,
  FinishedWatching,
  Like,
  NotStartedWatching,
  Post,
  Rating,
  User,
} from "@prisma/client";
import { ZodCategoryType } from "./item-type";

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

// REMOVE THIS!!!

// export type ExtendedNotStartedAnime = NotStartedWatching & {
//   anime: Anime;
//   category: ZodCategoryType;
// };

// export type ExtendedCurrentlyWatchingAnime = CurrentlyWatching & {
//   anime: Anime;
//   category: ZodCategoryType;
// };
// export type ExtendedFinishedWatchingAnime = FinishedWatching & {
//   anime: Anime;
//   category: ZodCategoryType;
// };
