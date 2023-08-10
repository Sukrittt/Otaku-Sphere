import { z } from "zod";

import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (session.user.role !== "ADMIN") {
      return new Response("Unauthorized", { status: 403 });
    }

    const { query, limit, page } = z
      .object({
        query: z.string().nullish().optional(),
        limit: z.string().nullish().optional(),
        page: z.string().nullish().optional(),
      })
      .parse({
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
        query: url.searchParams.get("q"),
      });

    let whereClause = {};
    let takeClause = undefined;
    let skipClause = undefined;

    if (query) {
      whereClause = {
        name: {
          contains: query,
        },
      };
    } else if (limit && page) {
      takeClause = parseInt(limit);
      skipClause = (parseInt(page) - 1) * parseInt(limit);
    }

    const users = await db.user.findMany({
      take: takeClause,
      skip: skipClause,
      where: whereClause,
      include: {
        anime: true,
        pollVote: true,
        post: true,
        rating: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return new Response(JSON.stringify(users));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Something went wrong", { status: 500 });
  }
}
