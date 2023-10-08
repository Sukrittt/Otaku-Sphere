import { siteConfig } from "@/config";
import { type MetadataRoute } from "next";
import { communitySidebarNavItems } from "@/data";

export default function sitemap(): MetadataRoute.Sitemap {
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
    "/community/create",
    "/watchlist",
    "/leaderboard",
    "/browse",
    "/poll",
    "/poll/create",
    "/poll/results",
    "/anime",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...communities];
}
