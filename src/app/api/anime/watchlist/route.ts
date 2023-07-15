import { z } from "zod";

import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { AnimeWatchlistServer } from "@/lib/validators/anime";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { animeId, category } = AnimeWatchlistServer.parse(body);

    const anime = await db.anime.findUnique({
      where: {
        id: animeId,
      },
    });

    if (!anime) {
      return new Response("Anime not found", { status: 404 });
    }

    const promises = [
      db.notStartedWatching.findFirst({
        where: {
          animeId,
          userId: session.user.id,
        },
      }),
      db.currentlyWatching.findFirst({
        where: {
          animeId,
          userId: session.user.id,
        },
      }),
      db.finishedWatching.findFirst({
        where: {
          animeId,
          userId: session.user.id,
        },
      }),
    ];

    const [pendingAnimes, watchingAnimes, finishedAnimes] = await Promise.all(
      promises
    );

    if (pendingAnimes || watchingAnimes || finishedAnimes) {
      return new Response("Anime already in watchlist", { status: 409 });
    }

    if (category === "pending") {
      await db.notStartedWatching.create({
        data: {
          animeId,
          userId: session.user.id,
        },
      });
    } else if (category === "watching") {
      await db.currentlyWatching.create({
        data: {
          animeId,
          userId: session.user.id,
        },
      });
    } else if (category === "finished") {
      await db.finishedWatching.create({
        data: {
          animeId,
          userId: session.user.id,
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
