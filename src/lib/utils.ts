import { type ClassValue, clsx } from "clsx";
import { formatDistanceToNowStrict, intervalToDuration } from "date-fns";
import { twMerge } from "tailwind-merge";
import locale from "date-fns/locale/en-IN";
import { ComboBoxItemType } from "@/types/item-type";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDescription(description: string, trim: number) {
  if (description.length > trim) {
    const trimmedDescription = description.slice(0, trim).trimEnd();
    return trimmedDescription + "...";
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

export function calculateIncreasePercentage(
  current: number,
  previous: number
): number {
  if (previous === 0) {
    return 0;
  }

  return convertToSingleDecimalPlace(
    ((current - previous) / previous) * 100,
    1
  );
}

export function capitalizeFirstCharacter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function getYearData() {
  const currentYear = new Date().getFullYear();
  const years: ComboBoxItemType[] = [];

  for (let i = currentYear; i >= 1980; i--) {
    years.push({
      value: i.toString(),
      label: i.toString(),
    });
  }

  return years;
}

const formatDistanceLocale = {
  lessThanXSeconds: "just now",
  xSeconds: "just now",
  halfAMinute: "just now",
  lessThanXMinutes: "{{count}}m",
  xMinutes: "{{count}}m",
  aboutXHours: "{{count}}h",
  xHours: "{{count}}h",
  xDays: "{{count}}d",
  aboutXWeeks: "{{count}}w",
  xWeeks: "{{count}}w",
  aboutXMonths: "{{count}}m",
  xMonths: "{{count}}m",
  aboutXYears: "{{count}}y",
  xYears: "{{count}}y",
  overXYears: "{{count}}y",
  almostXYears: "{{count}}y",
};

function formatDistance(token: string, count: number, options?: any): string {
  options = options || {};

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace("{{count}}", count.toString());

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return "in " + result;
    } else {
      if (result === "just now") return result;
      return result + " ago";
    }
  }

  return result;
}

export function formatTimeToNow(date: Date): string {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: {
      ...locale,
      formatDistance,
    },
  });
}

export function formatTimeLeft(expiryDate: Date) {
  const currentDate = new Date();

  const duration = intervalToDuration({ start: currentDate, end: expiryDate });

  if (!duration) return "Expired";

  const years = duration?.years ?? 0;
  const months = duration?.months ?? 0;
  const days = duration?.days ?? 0;
  const hours = duration?.hours ?? 0;
  const minutes = duration?.minutes ?? 0;
  const seconds = duration?.seconds ?? 0;

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""}`;
  } else if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""}`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""}`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""}`;
  } else {
    return `${seconds} second${seconds > 1 ? "s" : ""}`;
  }
}
