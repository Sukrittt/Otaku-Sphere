import { env } from "@/env.mjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Sign In - Otaku Sphere",
  description:
    "An open source all-in-one Anime Platform build with everything in Next.js 13.",
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Server Actions",
    "next-auth",
    "Anime",
    "Watchlist",
    "Anime List",
    "Anime rating",
    "Statistics",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
