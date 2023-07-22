import { type MetadataRoute } from "next";
import { siteConfig } from "@/config";
import { db } from "@/lib/db";
import { formatUrl } from "@/lib/utils";
import { communitySidebarNavItems } from "@/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const animeLists = await db.anime.findMany({
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
  });

  const animes = animeLists.map((anime) => ({
    url: `${siteConfig.url}/anime/${formatUrl(anime.name)}`,
    lastModified: new Date().toISOString(),
  }));

  const communities = communitySidebarNavItems.map((page) => ({
    url: `${siteConfig.url}${page.href}`,
    lastModified: new Date().toISOString(),
  }));

  const routes = [
    "",
    "/community",
    "/community/general",
    "/community/anime",
    "/community/manga",
    "/community/question",
    "/community/feedback",
    "/watchlist",
    "/leaderboard",
    "/anime",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...animes, ...communities];
}
