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

export function formatUrl(name: string, reverse?: boolean) {
  if (reverse) {
    return decodeURIComponent(name.split("-").join(" "));
  }

  return name.split(" ").join("-");
}

export function convertToSingleDecimalPlace(
  number: number,
  decimalPlaces: number
) {
  const roundedNumber = number.toFixed(decimalPlaces);
  const singleDecimalPlace = parseFloat(roundedNumber).toFixed(1);

  return parseFloat(singleDecimalPlace);
}
