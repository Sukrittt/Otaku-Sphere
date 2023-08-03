import { z } from "zod";

import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
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

    if (name.includes("-")) {
      return new Response("Anime name cannot contain '-'", { status: 405 });
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

    const { limit, page, query, orderBy, genre, year } = z
      .object({
        limit: z.string(),
        page: z.string(),
        query: z.string().nullish().optional(),
        genre: z.string().nullish().optional(),
        year: z.string().nullish().optional(),
        orderBy: z.string().nullish().optional(),
      })
      .parse({
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
        query: url.searchParams.get("q"),
        genre: url.searchParams.get("genre"),
        year: url.searchParams.get("year"),
        orderBy: url.searchParams.get("orderBy"),
      });

    let whereClause = {};
    let orderByClause = {};

    if (genre && year) {
      whereClause = {
        genre,
        releaseYear: year,
      };
    } else if (genre) {
      whereClause = {
        genre,
      };
    } else if (year) {
      whereClause = {
        releaseYear: year,
      };
    } else if (query) {
      whereClause = {
        name: {
          contains: query,
        },
      };
    }

    if (orderBy) {
      orderByClause = [
        {
          [orderBy]: "desc",
        },
        {
          createdAt: "desc",
        },
      ];
    } else {
      orderByClause = {
        createdAt: "desc",
      };
    }

    const animes = await db.anime.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      where: whereClause,
      orderBy: orderByClause,
    });

    return new Response(JSON.stringify(animes));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Something went wrong", { status: 500 });
  }
}
