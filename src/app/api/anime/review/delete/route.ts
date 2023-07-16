import { z } from "zod";

import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { AnimeReviewDeleteSchema } from "@/lib/validators/anime";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { reviewId } = AnimeReviewDeleteSchema.parse(body);

    const review = await db.reviews.findFirst({
      where: {
        id: reviewId,
      },
    });

    if (!review) {
      return new Response("Review not found", { status: 404 });
    }

    if (review.userId !== session.user.id) {
      return new Response("Forbidden", { status: 403 });
    }

    //all checks complete✅
    await db.reviews.delete({
      where: {
        id: reviewId,
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
