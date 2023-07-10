import { z } from "zod";

import { getAuthSession } from "@/lib/auth";
import { creatPostServerValidator } from "@/lib/validators/community";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const url = new URL(req.url);
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const extendedBody = {
      ...body,
      communityId: url.searchParams.get("communityId"),
    };

    const { communityId, text } = creatPostServerValidator.parse(extendedBody);

    await db.post.create({
      data: {
        message: text,
        communityId,
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
