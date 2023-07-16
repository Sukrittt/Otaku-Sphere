import { z } from "zod";

import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import {
  AnimeWatchlistServer,
  AnimeWatchlistUpdate,
} from "@/lib/validators/anime";

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

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { animeId, category, dropTo } = AnimeWatchlistUpdate.parse(body);

    if (category === dropTo) {
      return new Response("Nothing to change here.");
    }

    const anime = await db.anime.findUnique({
      where: {
        id: animeId,
      },
    });

    if (!anime) {
      return new Response("Anime not found", { status: 404 });
    }

    // Delete from previous category
    if (category === "pending") {
      const pendingAnime = await db.notStartedWatching.findFirst({
        where: {
          animeId,
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
          id: pendingAnime.id,
        },
      });
    } else if (category === "watching") {
      const watchingAnime = await db.currentlyWatching.findFirst({
        where: {
          animeId,
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
          id: watchingAnime.id,
        },
      });
    } else if (category === "finished") {
      const finishedAnime = await db.finishedWatching.findFirst({
        where: {
          animeId,
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
          id: finishedAnime.id,
        },
      });
    }

    // Add to new category
    if (dropTo === "pending") {
      await db.notStartedWatching.create({
        data: {
          animeId,
          userId: session.user.id,
        },
      });
    } else if (dropTo === "watching") {
      await db.currentlyWatching.create({
        data: {
          animeId,
          userId: session.user.id,
        },
      });
    } else if (dropTo === "finished") {
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
