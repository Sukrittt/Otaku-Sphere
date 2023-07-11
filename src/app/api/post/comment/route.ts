import { z } from "zod";

import { getAuthSession } from "@/lib/auth";
import { CreateServerCommentValidator } from "@/lib/validators/community";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { postId, text } = CreateServerCommentValidator.parse(body);

    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return new Response("Post not found", { status: 404 });
    }

    await db.comment.create({
      data: {
        text,
        postId,
        authorId: session.user.id,
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
