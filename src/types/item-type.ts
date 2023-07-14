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

export type ComboBoxItemType = {
  value: string;
  label: string;
};

export type AnimeRanking = {
  rank: number;
  anime: string;
  director: string;
  genre: string;
  rating: number;
  votes: string;
};
