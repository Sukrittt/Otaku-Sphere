import { z } from "zod";

import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { DeletePostValidator } from "@/lib/validators/community";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { creatorId, postId } = DeletePostValidator.parse(body);

    const post = await db.post.findFirst({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return new Response("Post not found", { status: 404 });
    }

    const postCreator = await db.user.findFirst({
      where: {
        id: creatorId,
      },
    });

    if (!postCreator) {
      return new Response("User not found", { status: 404 });
    }

    //all checks complete✅
    await db.post.delete({
      where: {
        id: postId,
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
