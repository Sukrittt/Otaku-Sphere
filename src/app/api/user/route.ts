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

    const { query } = z
      .object({
        query: z.string(),
      })
      .parse({
        query: url.searchParams.get("q"),
      });

    const users = await db.user.findMany({
      take: 10,
      where: {
        name: {
          startsWith: query,
        },
      },
      include: {
        anime: true,
        community: true,
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
