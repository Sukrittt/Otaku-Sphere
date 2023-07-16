import { z } from "zod";

import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { AnimeWatchlistDelete } from "@/lib/validators/anime";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { category, watchlistId } = AnimeWatchlistDelete.parse(body);

    if (category === "pending") {
      const pendingAnime = await db.notStartedWatching.findFirst({
        where: {
          id: watchlistId,
          userId: session.user.id,
        },
      });

      if (!pendingAnime) {
        return new Response("Anime not found in pending watchlist.", {
          status: 404,
        });
      }

      await db.notStartedWatching.delete({
        where: {
          id: watchlistId,
        },
      });
    } else if (category === "watching") {
      const watchingAnime = await db.currentlyWatching.findFirst({
        where: {
          id: watchlistId,
          userId: session.user.id,
        },
      });

      if (!watchingAnime) {
        return new Response("Anime not found in watching watchlist.", {
          status: 404,
        });
      }

      await db.currentlyWatching.delete({
        where: {
          id: watchlistId,
        },
      });
    } else if (category === "finished") {
      const finishedAnime = await db.finishedWatching.findFirst({
        where: {
          id: watchlistId,
          userId: session.user.id,
        },
      });

      if (!finishedAnime) {
        return new Response("Anime not found in finished watchlist.", {
          status: 404,
        });
      }

      await db.finishedWatching.delete({
        where: {
          id: watchlistId,
        },
      });
    }

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Something went wrong", { status: 500 });
  }
}
