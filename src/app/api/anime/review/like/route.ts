import { z } from "zod";

import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { ReviewLikeValidator } from "@/lib/validators/like";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { reviewId } = ReviewLikeValidator.parse(body);

    const review = await db.reviews.findUnique({
      where: {
        id: reviewId,
      },
    });

    if (!review) {
      return new Response("Review not found", { status: 404 });
    }

    const alreadyLiked = await db.reviewLike.findFirst({
      where: {
        reviewId,
        userId: session.user.id,
      },
    });

    if (alreadyLiked) {
      await db.reviewLike.delete({
        where: {
          userId_reviewId: {
            reviewId,
            userId: session.user.id,
          },
        },
      });
    } else {
      await db.reviewLike.create({
        data: {
          reviewId,
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
