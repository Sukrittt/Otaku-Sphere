import { z } from "zod";

import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { DeletePollValidator } from "@/lib/validators/poll";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { pollId } = DeletePollValidator.parse(body);

    const poll = await db.poll.findFirst({
      where: {
        id: pollId,
        creatorId: session.user.id,
      },
    });

    if (!poll) {
      return new Response("Poll not found", { status: 404 });
    }

    await db.poll.delete({
      where: {
        id: pollId,
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
