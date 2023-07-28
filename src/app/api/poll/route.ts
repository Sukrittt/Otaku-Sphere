import { z } from "zod";

import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { CreatePollValidatorServer } from "@/lib/validators/poll";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const formattedBody = {
      ...body,
      expiresAt: new Date(body.expiresAt),
    };

    const { expiresAt, options, question } =
      CreatePollValidatorServer.parse(formattedBody);

    if (!expiresAt) {
      return new Response("You have to set an expiration date", {
        status: 422,
      });
    }

    const poll = await db.poll.create({
      data: {
        question,
        expiresAt,
        creatorId: session.user.id,
      },
    });

    await Promise.all(
      options.map(async (payload: string) => {
        await db.pollOption.create({
          data: {
            pollId: poll.id,
            option: payload,
          },
        });
      })
    );

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Something went wrong", { status: 500 });
  }
}
