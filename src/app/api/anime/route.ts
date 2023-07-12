import { z } from "zod";

import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { animeSchema } from "@/lib/validators/anime";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const isAdmin = await db.user.findFirst({
      where: {
        id: session.user.id,
      },
    });

    if (!isAdmin) {
      return new Response("User not found", { status: 404 });
    }

    if (isAdmin.role !== "ADMIN") {
      return new Response("Forbidden", { status: 403 });
    }

    const body = await req.json();

    const {
      description,
      director,
      genre,
      name,
      releaseYear,
      coverImage,
      trailerLink,
    } = animeSchema.parse(body);

    const existingAnime = await db.anime.findFirst({
      where: {
        name,
      },
    });

    if (existingAnime) {
      return new Response("Anime already exists", { status: 409 });
    }

    if (genre.length === 0) {
      return new Response("Please enter a genre", { status: 422 });
    }

    //all checks complete ✅
    await db.anime.create({
      data: {
        description,
        director,
        genre,
        name,
        releaseYear,
        coverImage: coverImage!,
        trailerLink,
        creatorId: session.user.id,
      },
    });

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

    const isAdmin = await db.user.findFirst({
      where: {
        id: session.user.id,
      },
    });

    if (!isAdmin) {
      return new Response("User not found", { status: 404 });
    }

    if (isAdmin.role !== "ADMIN") {
      return new Response("Forbidden", { status: 403 });
    }

    const body = await req.json();

    const {
      id,
      description,
      director,
      genre,
      name,
      releaseYear,
      coverImage,
      trailerLink,
    } = animeSchema.parse(body);

    const existingAnime = await db.anime.findFirst({
      where: {
        name,
      },
    });

    if (existingAnime && existingAnime.id !== id) {
      return new Response("Anime already exists", { status: 409 });
    }

    if (genre.length === 0) {
      return new Response("Please enter a genre", { status: 422 });
    }

    //all checks complete ✅
    await db.anime.update({
      where: {
        id,
      },
      data: {
        description,
        director,
        genre,
        name,
        releaseYear,
        coverImage: coverImage!,
        trailerLink,
        creatorId: session.user.id,
      },
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Something went wrong", { status: 500 });
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);

  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { limit, page, query } = z
      .object({
        limit: z.string().nullish().optional(),
        page: z.string().nullish().optional(),
        query: z.string().nullish().optional(),
      })
      .parse({
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
        query: url.searchParams.get("q"),
      });

    let whereClause = {};
    let takeClause = undefined;
    let skipClause = undefined;

    if (limit && page) {
      takeClause = parseInt(limit);
      skipClause = (parseInt(page) - 1) * parseInt(limit);
    } else if (query && query.length > 0) {
      whereClause = {
        name: {
          startsWith: query,
        },
      };
    }

    const animes = await db.anime.findMany({
      take: takeClause,
      skip: skipClause,
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
    });

    return new Response(JSON.stringify(animes));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Something went wrong", { status: 500 });
  }
}
