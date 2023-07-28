import { z } from "zod";

import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { VotePollValidator } from "@/lib/validators/poll";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { optionId } = VotePollValidator.parse(body);

    const pollOption = await db.pollOption.findUnique({
      where: {
        id: optionId,
      },
    });

    if (!pollOption) {
      return new Response("Poll option does not exist", { status: 404 });
    }

    const poll = await db.poll.findUnique({
      where: {
        id: pollOption.pollId,
      },
    });

    if (!poll) {
      return new Response("Poll does not exist", { status: 404 });
    }

    if (poll.expiresAt < new Date()) {
      return new Response("Poll has expired", { status: 410 });
    }

    const alreadyVoted = await db.pollVote.findFirst({
      where: {
        pollOptionId: optionId,
        userId: session.user.id,
      },
    });

    if (!alreadyVoted) {
      return new Response("Your vote was not found.", { status: 409 });
    }

    //all checks cleared ✅
    await db.pollVote.delete({
      where: {
        id: alreadyVoted.id,
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
