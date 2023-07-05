import { Metadata } from "next";

export const metadata: Metadata = {
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
