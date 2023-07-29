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

    const existingQuestion = await db.poll.findFirst({
      where: {
        question,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (existingQuestion) {
      return new Response("Poll already exists", {
        status: 409,
      });
    }

    const poll = await db.poll.create({
      data: {
        question,
        expiresAt,
        creatorId: session.user.id,
      },
    });

    const pollOptionsData = options.map((payload) => ({
      pollId: poll.id,
      option: payload,
    }));

    await db.pollOption.createMany({
      data: pollOptionsData,
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
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { limit, page, expiresAt } = z
      .object({
        limit: z.string(),
        page: z.string(),
        expiresAt: z.string(),
      })
      .parse({
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
        expiresAt: url.searchParams.get("expiresAt"),
      });

    const polls = await db.poll.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      orderBy: { createdAt: "desc" },
      include: {
        option: {
          include: {
            vote: true,
          },
        },
        creator: true,
      },
      where: {
        expiresAt: {
          [expiresAt]: new Date(),
        },
      },
    });

    return new Response(JSON.stringify(polls));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Something went wrong", { status: 500 });
  }
}
