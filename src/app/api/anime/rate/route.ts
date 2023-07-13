import { z } from "zod";

import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { rateAnimeSchema } from "@/lib/validators/anime";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { id, rating } = rateAnimeSchema.parse(body);

    const anime = await db.anime.findFirst({
      where: {
        id,
      },
    });

    if (!anime) {
      return new Response("Anime not found", { status: 404 });
    }

    const alreadyRated = await db.rating.findFirst({
      where: {
        userId: session.user.id,
        animeId: id,
      },
    });

    let updatedRating;

    if (alreadyRated) {
      if (alreadyRated.rating === rating) {
        await db.rating.delete({
          where: {
            id: alreadyRated.id,
          },
        });
      } else {
        await db.rating.update({
          where: {
            id: alreadyRated.id,
          },
          data: {
            rating,
          },
        });
      }

      updatedRating = anime.totalRatings - alreadyRated.rating + rating;
    } else {
      await db.rating.create({
        data: {
          userId: session.user.id,
          animeId: id,
          rating,
        },
      });
      updatedRating = anime.totalRatings + rating;
    }

    //add the rating to the existing anime
    await db.anime.update({
      where: {
        id,
      },
      data: {
        totalRatings: updatedRating,
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
