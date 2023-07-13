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

    const { communityId, text, title } =
      creatPostServerValidator.parse(extendedBody);

    await db.post.create({
      data: {
        title,
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

export async function GET(req: Request) {
  const url = new URL(req.url);

  console.log("---------------------------------");
  console.log("---------------------------------");
  console.log("---------------------------------");
  console.log("---------------------------------");

  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { limit, page, communityId } = z
      .object({
        limit: z.string(),
        page: z.string(),
        communityId: z.string(),
      })
      .parse({
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
        communityId: url.searchParams.get("communityId"),
      });

    const posts = await db.post.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      where: {
        communityId,
      },
      orderBy: {
        comment: {
          _count: "desc",
        },
      },
      include: {
        comment: true,
        creator: true,
        like: true,
        community: true,
      },
    });

    console.log("SERVER POSTS?????", posts);

    return new Response(JSON.stringify(posts));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Something went wrong", { status: 500 });
  }
}
