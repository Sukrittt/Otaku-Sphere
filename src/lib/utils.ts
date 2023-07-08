import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDescription(description: string, trim: number) {
  if (description.length > trim) {
    return description.slice(0, trim) + "...";
  }

  return description;
}
