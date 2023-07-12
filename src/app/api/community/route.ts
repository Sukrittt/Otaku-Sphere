import { z } from "zod";

import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import {
  EditCommunityValidator,
  createCommunityValidator,
} from "@/lib/validators/community";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name, category, description } =
      createCommunityValidator.parse(body);

    await db.community.create({
      data: {
        name,
        description,
        category: category!,
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

  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { limit, page, category, query } = z
      .object({
        limit: z.string().nullish().optional(),
        page: z.string().nullish().optional(),
        category: z.string().nullish().optional(),
        query: z.string().nullish().optional(),
      })
      .parse({
        query: url.searchParams.get("q"),
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
        category: url.searchParams.get("category"),
      });

    let whereClause = {};
    let takeClause = undefined;
    let skipClause = undefined;

    if (category) {
      whereClause = {
        category: category,
      };
    }

    if (!limit && !page && query) {
      whereClause = {
        name: {
          startsWith: query,
        },
      };
    } else if (limit && page) {
      takeClause = parseInt(limit);
      skipClause = (parseInt(page) - 1) * parseInt(limit);
    }

    const communities = await db.community.findMany({
      take: takeClause,
      skip: skipClause,
      orderBy: {
        post: {
          _count: "desc",
        },
      },
      where: whereClause,
      include: {
        creator: true,
        post: true,
      },
    });

    return new Response(JSON.stringify(communities));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Something went wrong", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { communityId, description, name, category } =
      EditCommunityValidator.parse(body);

    if (!category) {
      return new Response("Category is required", { status: 422 });
    }

    const existingCommunity = await db.community.findUnique({
      where: {
        id: communityId,
      },
    });

    if (!existingCommunity) {
      return new Response("Not found", { status: 404 });
    }

    if (existingCommunity.creatorId !== session.user.id) {
      return new Response("Unauthorized", { status: 403 });
    }

    const community = await db.community.findFirst({
      where: {
        name,
      },
    });

    if (community && community.id !== communityId) {
      return new Response("Community name already exists", { status: 409 });
    }

    // all checks complete ✅
    await db.community.update({
      where: {
        id: communityId,
      },
      data: {
        description,
        name,
        category,
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
