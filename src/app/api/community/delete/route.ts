import { z } from "zod";

import { getAuthSession } from "@/lib/auth";
import { idAnimeSchema } from "@/lib/validators/anime";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { id: communityId } = idAnimeSchema.parse(body);

    const community = await db.community.findFirst({
      where: {
        id: communityId,
      },
    });

    if (!community) {
      return new Response("Not found", { status: 404 });
    }

    if (community.creatorId !== session.user.id) {
      return new Response("Unauthorized", { status: 403 });
    }

    // all checks complete ✅
    await db.community.delete({
      where: {
        id: communityId,
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
