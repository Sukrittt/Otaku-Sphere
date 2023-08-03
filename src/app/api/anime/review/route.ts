import { z } from "zod";

import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { AnimeReviewServerSchema } from "@/lib/validators/anime";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { animeId, review, title } = AnimeReviewServerSchema.parse(body);

    const anime = await db.anime.findUnique({
      where: {
        id: animeId,
      },
    });

    if (!anime) {
      return new Response("Anime not found", { status: 404 });
    }

    await db.reviews.create({
      data: {
        text: review,
        animeId,
        userId: session.user.id,
        title,
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
    const { limit, page, animeId } = z
      .object({
        limit: z.string(),
        page: z.string(),
        animeId: z.string(),
      })
      .parse({
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
        animeId: url.searchParams.get("animeId"),
      });

    const reviews = await db.reviews.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      where: {
        animeId,
      },
      include: {
        user: true,
        reviewLikes: true,
      },
      orderBy: {
        reviewLikes: {
          _count: "desc",
        },
      },
    });

    return new Response(JSON.stringify(reviews));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Something went wrong", { status: 500 });
  }
}
