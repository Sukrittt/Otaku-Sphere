import { ComboBoxItemType, ZodCategoryType } from "@/types/item-type";

export const genres: ComboBoxItemType[] = [
  {
    value: "shōnen",
    label: "Shōnen",
  },
  {
    value: "fiction",
    label: "Fiction",
  },
  {
    value: "comedy",
    label: "Comedy",
  },
  {
    value: "isekai",
    label: "Isekai",
  },
  {
    value: "sports",
    label: "Sports",
  },
  {
    value: "horror",
    label: "Horror",
  },
  {
    value: "mystery",
    label: "Mystery",
  },
  {
    value: "shoujo",
    label: "Shoujo",
  },
  {
    value: "adventure",
    label: "Adventure",
  },
  {
    value: "fantasy",
    label: "Fantasy",
  },
  {
    value: "romance",
    label: "Romance",
  },
  {
    value: "seinen",
    label: "Seinen",
  },
  {
    value: "mecha",
    label: "Mecha",
  },
  {
    value: "thriller",
    label: "Thriller",
  },
];

export const watchlists: { value: ZodCategoryType; label: string }[] = [
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "watching",
    label: "Watching",
  },
  {
    value: "finished",
    label: "Finished",
  },
];
