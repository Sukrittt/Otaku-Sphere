import type { Icon } from "lucide-react";

export type dropdownItemType = {
  id: number;
  label: string;
  Icon: Icon;
  href: string;
};

export type SidebarNavType = {
  id: number;
  href: string;
  label: string;
  Icon: Icon;
};

export type navItemType = {
  id: number;
  label: string;
  href: string;
};

export type ComboBoxItemType = {
  value: string;
  label: string;
};

export type AnimeRanking = {
  rank: string;
  anime: string;
  director: string;
  genre: string;
  stars: number;
  votes: string;
};

export type AdminDisplay = {
  name: string | null;
  email: string | null;
  createdAt: string;
  animeAdded: number;
};

export type UserDisplay = {
  name: string | null;
  email: string | null;
  createdAt: string;
  rating: number;
  pollsVoted: number;
  postsCreated: number;
};

export type ZodCategoryType = "pending" | "watching" | "finished";

export type DragItemType = {
  id: string;
  name: string;
  animeId: string;
  category: ZodCategoryType;
};

export type AddWatchlistAnimeType = {
  id: string;
  name: string;
};

export type OverviewType = {
  title: string;
  category: OverviewCategory;
  count: number;
  previousMonthCount: number;
};

type OverviewCategory = "anime" | "user" | "poll";
